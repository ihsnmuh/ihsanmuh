import {
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
  subWeeks,
} from 'date-fns';

import { formatPace } from '@/lib/strava';

import {
  IHeatmapDay,
  IStravaActivity,
  IStravaStats,
} from '@/types/interfaces/hobbies';

export interface IMonthHeader {
  label: string;
  colIndex: number;
}

export interface IHeatmapResult {
  days: IHeatmapDay[];
  weeks: IHeatmapDay[][];
  monthHeaders: IMonthHeader[];
  totalActivities: number;
  totalDistanceKm: number;
}

/**
 * Checks if a date object is valid (not Invalid Date)
 */
export const isValidDate = (d: Date): boolean => {
  return d instanceof Date && !isNaN(d.getTime());
};

/**
 * Calculates aggregate stats (distance, runs, elevation gain, avg pace) from a list of Strava activities
 */
export const calculateStatsFromActivities = (
  activities: IStravaActivity[] = [],
): IStravaStats => {
  if (!Array.isArray(activities) || activities.length === 0) {
    return {
      totalRuns: 0,
      totalDistanceKm: 0,
      ytdDistanceKm: 0,
      totalElevationGain: 0,
      avgPace: '0:00 /km',
      recentRunCount: 0,
    };
  }

  // Filter for Run type activities for stats calculation
  const runs = activities.filter((a) => {
    if (!a) return false;
    const type = (a.type || a.sportType || '').toLowerCase();
    return type.includes('run');
  });

  const totalRuns = runs.length;
  const rawDistanceSum = runs.reduce((sum, a) => sum + (a.distance || 0), 0);
  const totalDistanceKm = Number.isFinite(rawDistanceSum)
    ? Number(rawDistanceSum.toFixed(2))
    : 0;

  const rawElevationSum = runs.reduce(
    (sum, a) => sum + (a.totalElevationGain || 0),
    0,
  );
  const totalElevationGain = Number.isFinite(rawElevationSum)
    ? Math.round(rawElevationSum)
    : 0;

  const totalMovingTime = runs.reduce((sum, a) => sum + (a.movingTime || 0), 0);

  const avgSpeedMetersPerSecond =
    Number.isFinite(totalMovingTime) && totalMovingTime > 0
      ? (totalDistanceKm * 1000) / totalMovingTime
      : 0;

  return {
    totalRuns,
    totalDistanceKm,
    ytdDistanceKm: totalDistanceKm,
    totalElevationGain,
    avgPace: formatPace(avgSpeedMetersPerSecond),
    recentRunCount: activities.length,
  };
};

/**
 * Determines color intensity level (0 to 4) based on activity distance in KM
 */
export const getHeatmapLevel = (distanceKm: number): 0 | 1 | 2 | 3 | 4 => {
  if (distanceKm <= 0) return 0;
  if (distanceKm <= 5) return 1;
  if (distanceKm <= 10) return 2;
  if (distanceKm <= 15) return 3;
  return 4;
};

/**
 * Generates 52 weeks (~364 days) of daily activity metrics grouped by week columns
 */
export const generateYearlyHeatmapData = (
  activities: IStravaActivity[] = [],
  referenceDate: Date = new Date(),
): IHeatmapResult => {
  // 1. Map activities by date string "YYYY-MM-DD"
  const activityMap = new Map<string, { count: number; distanceKm: number }>();

  let totalActivities = 0;
  let totalDistanceKm = 0;

  activities.forEach((act) => {
    if (!act.startDate) return;
    const dateStr = act.startDate.split('T')[0];
    if (!dateStr) return;

    const current = activityMap.get(dateStr) || { count: 0, distanceKm: 0 };
    const newCount = current.count + 1;
    const newDistance = current.distanceKm + (act.distance || 0);

    activityMap.set(dateStr, {
      count: newCount,
      distanceKm: newDistance,
    });
  });

  // 2. Define start and end date interval (52 weeks aligned to Monday - Sunday)
  const endDate = endOfWeek(referenceDate, { weekStartsOn: 1 });
  const startDate = startOfWeek(subWeeks(endDate, 51), { weekStartsOn: 1 });

  const dateInterval = eachDayOfInterval({ start: startDate, end: endDate });

  // 3. Build day items
  const days: IHeatmapDay[] = dateInterval.map((dateObj) => {
    const dateStr = format(dateObj, 'yyyy-MM-dd');
    const act = activityMap.get(dateStr);

    const count = act?.count || 0;
    const distanceKm = act ? Number(act.distanceKm.toFixed(2)) : 0;
    const level = getHeatmapLevel(distanceKm);

    if (count > 0) {
      totalActivities += count;
      totalDistanceKm += distanceKm;
    }

    return {
      date: dateStr,
      count,
      distanceKm,
      level,
    };
  });

  // 4. Group days into 52 weeks (7 days per week column)
  const weeks: IHeatmapDay[][] = [];
  let currentWeek: IHeatmapDay[] = [];

  days.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // 5. Generate month header positions
  const monthHeaders: IMonthHeader[] = [];
  let lastMonthLabel = '';

  weeks.forEach((week, colIndex) => {
    const firstDayOfWeek = week[0];
    if (!firstDayOfWeek) return;

    const monthLabel = format(new Date(firstDayOfWeek.date), 'MMM');

    // Add month header if it's the first column or month changed
    if (monthLabel !== lastMonthLabel) {
      monthHeaders.push({
        label: monthLabel,
        colIndex,
      });
      lastMonthLabel = monthLabel;
    }
  });

  return {
    days,
    weeks,
    monthHeaders,
    totalActivities,
    totalDistanceKm: Number(totalDistanceKm.toFixed(1)),
  };
};
