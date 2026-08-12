import {
  IStravaActivity,
  IStravaResponse,
  IStravaStats,
} from '@/types/interfaces/hobbies';

const STRAVA_OAUTH_URL = 'https://www.strava.com/oauth/token';
const STRAVA_API_URL = 'https://www.strava.com/api/v3';

// Cache TTL: 15 minutes (in milliseconds)
export const STRAVA_CACHE_TTL_MS = 15 * 60 * 1000;

interface ICachedToken {
  accessToken: string;
  expiresAt: number; // epoch in ms
}

interface ICachedData {
  data: IStravaResponse;
  timestamp: number; // epoch in ms
}

// In-memory cache across server requests
let cachedToken: ICachedToken | null = null;
let cachedStravaResponse: ICachedData | null = null;

/**
 * Converts speed in meters per second to running pace in minutes:seconds per km
 * e.g. 3.33 m/s -> "5:00 /km"
 */
export const formatPace = (speedMetersPerSecond?: number | null): string => {
  if (!speedMetersPerSecond || speedMetersPerSecond <= 0) return '0:00 /km';
  const paceMinutesDecimal = 1000 / speedMetersPerSecond / 60;
  const minutes = Math.floor(paceMinutesDecimal);
  const seconds = Math.round((paceMinutesDecimal - minutes) * 60);

  if (seconds === 60) {
    return `${minutes + 1}:00 /km`;
  }
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} /km`;
};

/**
 * Converts speed in meters per second to km/h for cycling/riding
 */
export const formatSpeedKmh = (
  speedMetersPerSecond?: number | null,
): string => {
  if (!speedMetersPerSecond || speedMetersPerSecond <= 0) return '0 km/h';
  const kmh = speedMetersPerSecond * 3.6;
  return `${kmh.toFixed(1)} km/h`;
};

/**
 * Formats distance in meters to kilometers with 2 decimal places
 */
export const formatDistance = (meters?: number | null): number => {
  if (!meters || meters <= 0) return 0;
  return Number((meters / 1000).toFixed(2));
};

/**
 * Formats duration in seconds to human readable string (e.g., "42m 15s" or "1h 15m")
 */
export const formatDuration = (seconds?: number | null): string => {
  if (!seconds || seconds <= 0) return '0s';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
};

/**
 * Refresh Strava OAuth access token using refresh_token with token-level in-memory cache
 */
export const getStravaAccessToken = async (): Promise<string | null> => {
  const now = Date.now();

  // If token is cached and not expiring in the next 2 minutes, return cached token
  if (cachedToken && cachedToken.expiresAt - now > 2 * 60 * 1000) {
    return cachedToken.accessToken;
  }

  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  try {
    const response = await fetch(STRAVA_OAUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      console.error(
        `Failed to refresh Strava token. Status: ${response.status}`,
      );
      return null;
    }

    const data = await response.json();
    const token = data.access_token as string;
    const expiresAt = data.expires_at
      ? data.expires_at * 1000
      : now + 5 * 60 * 60 * 1000;

    cachedToken = {
      accessToken: token,
      expiresAt,
    };

    return token;
  } catch (error) {
    console.error('Error refreshing Strava access token:', error);
    return null;
  }
};

/**
 * Empty fallback Strava response when live API is unavailable and no cache exists
 */
export const EMPTY_STRAVA_RESPONSE: IStravaResponse = {
  stats: {
    totalRuns: 0,
    totalDistanceKm: 0,
    ytdDistanceKm: 0,
    totalElevationGain: 0,
    avgPace: '0:00 /km',
    recentRunCount: 0,
  },
  activities: [],
  isFallback: true,
};

/**
 * Fetches activities from Strava API for the past 365 days using timestamp filtering (after parameter).
 * Fast, lightweight single/double page fetch to populate 365-day Heatmap Grid & Recent Activities.
 */
export const fetchRecentStravaActivities = async (
  token: string,
): Promise<any[]> => {
  const oneYearAgoSeconds = Math.floor(
    (Date.now() - 365 * 24 * 60 * 60 * 1000) / 1000,
  );

  let page = 1;
  const perPage = 200;
  let allActivities: any[] = [];
  let hasMore = true;

  // Max 2 pages (up to 400 activities in 365 days)
  while (hasMore && page <= 2) {
    const res = await fetch(
      `${STRAVA_API_URL}/athlete/activities?after=${oneYearAgoSeconds}&page=${page}&per_page=${perPage}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!res.ok) {
      console.warn(
        `Failed to fetch Strava activities page ${page} (status: ${res.status})`,
      );
      break;
    }

    const data: any[] = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      hasMore = false;
    } else {
      allActivities = allActivities.concat(data);
      if (data.length < perPage) {
        hasMore = false;
      } else {
        page++;
      }
    }
  }

  return allActivities;
};

/**
 * Fetch Strava activities and athlete statistics with in-memory server cache
 */
export const getStravaData = async (): Promise<IStravaResponse> => {
  const now = Date.now();

  // 1. Check in-memory cache
  if (
    cachedStravaResponse &&
    now - cachedStravaResponse.timestamp < STRAVA_CACHE_TTL_MS
  ) {
    return cachedStravaResponse.data;
  }

  const token = await getStravaAccessToken();

  if (!token) {
    // If we had a previous cache before token failure, return it
    if (cachedStravaResponse) {
      return cachedStravaResponse.data;
    }
    return EMPTY_STRAVA_RESPONSE;
  }

  try {
    // 1. Fetch Athlete Profile (to get athlete ID)
    const athleteRes = await fetch(`${STRAVA_API_URL}/athlete`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!athleteRes.ok) {
      console.warn(
        `Failed to fetch Strava athlete profile (status: ${athleteRes.status}), using cache/fallback`,
      );
      if (cachedStravaResponse) return cachedStravaResponse.data;
      return EMPTY_STRAVA_RESPONSE;
    }

    const athleteData = await athleteRes.json();
    const athleteId = athleteData.id;

    // 2. Fetch Athlete Stats (All-Time & YTD) and past 365 days Activities concurrently
    const [rawStats, rawActivities] = await Promise.all([
      fetch(`${STRAVA_API_URL}/athletes/${athleteId}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => (res.ok ? res.json() : null)),
      fetchRecentStravaActivities(token),
    ]);

    // Format all activities (Runs, Rides, Walks, Hikes, etc.) and sort newest first
    const activities: IStravaActivity[] = rawActivities
      .map((act) => {
        const isRide = act.type === 'Ride' || act.sport_type === 'Ride';
        const paceOrSpeed = isRide
          ? formatSpeedKmh(act.average_speed)
          : formatPace(act.average_speed);

        return {
          id: act.id,
          name: act.name,
          distance: formatDistance(act.distance),
          movingTime: act.moving_time,
          formattedTime: formatDuration(act.moving_time),
          elapsedTime: act.elapsed_time,
          totalElevationGain: Math.round(act.total_elevation_gain || 0),
          type: act.type,
          sportType: act.sport_type || act.type,
          startDate: act.start_date,
          startDateLocal: act.start_date_local,
          averageSpeed: act.average_speed || 0,
          maxSpeed: act.max_speed || 0,
          averageHeartrate: act.average_heartrate
            ? Math.round(act.average_heartrate)
            : null,
          maxHeartrate: act.max_heartrate
            ? Math.round(act.max_heartrate)
            : null,
          pace: paceOrSpeed,
          summaryPolyline: act.map?.summary_polyline || null,
          stravaUrl: `https://www.strava.com/activities/${act.id}`,
        };
      })
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      );

    // 1. Format All-Time totals from Strava native stats API
    const allTotals = rawStats?.all_run_totals || {};
    const allDistanceMeters = allTotals.distance || 0;
    const allMovingTime = allTotals.moving_time || 0;
    const allAvgSpeed =
      allMovingTime > 0 ? allDistanceMeters / allMovingTime : 0;

    // 2. Format YTD totals for current year from Strava native stats API
    const ytdTotals = rawStats?.ytd_run_totals || {};
    const ytdDistanceMeters = ytdTotals.distance || 0;
    const ytdMovingTime = ytdTotals.moving_time || 0;
    const ytdAvgSpeed =
      ytdMovingTime > 0 ? ytdDistanceMeters / ytdMovingTime : 0;

    const stats: IStravaStats = {
      totalRuns:
        allTotals.count ||
        ytdTotals.count ||
        activities.filter((a) => a.type === 'Run').length,
      totalDistanceKm: formatDistance(allDistanceMeters || ytdDistanceMeters),
      ytdDistanceKm: formatDistance(ytdDistanceMeters),
      totalElevationGain: Math.round(
        allTotals.elevation_gain || ytdTotals.elevation_gain || 0,
      ),
      avgPace: formatPace(allAvgSpeed || ytdAvgSpeed),
      recentRunCount: activities.length,
      allTimeRuns: allTotals.count || 0,
      allTimeDistanceKm: formatDistance(allDistanceMeters),
      allTimeElevationGain: Math.round(allTotals.elevation_gain || 0),
      allTimeAvgPace: formatPace(allAvgSpeed),
    };

    const responseData: IStravaResponse = {
      stats,
      activities,
      isFallback: false,
    };

    // Save to in-memory cache
    cachedStravaResponse = {
      data: responseData,
      timestamp: Date.now(),
    };

    return responseData;
  } catch (error) {
    console.error('Error fetching live Strava data:', error);
    if (cachedStravaResponse) {
      return cachedStravaResponse.data;
    }
    return EMPTY_STRAVA_RESPONSE;
  }
};
