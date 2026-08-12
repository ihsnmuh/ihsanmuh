export type THobbyCategory = 'running' | 'reading' | 'photography';

export interface IStravaActivity {
  id: number;
  name: string;
  distance: number; // in kilometers
  movingTime: number; // in seconds
  formattedTime: string; // e.g. "45m 20s" or "1h 12m"
  elapsedTime: number; // in seconds
  totalElevationGain: number; // in meters
  type: string;
  sportType: string;
  startDate: string;
  startDateLocal: string;
  averageSpeed: number; // in m/s
  maxSpeed: number; // in m/s
  averageHeartrate?: number | null;
  maxHeartrate?: number | null;
  pace: string; // e.g. "5:20 /km"
  summaryPolyline?: string | null;
  stravaUrl: string;
}

export interface IStravaStats {
  totalRuns: number;
  totalDistanceKm: number;
  ytdDistanceKm: number;
  totalElevationGain: number;
  avgPace: string;
  longestRunKm?: number;
  recentRunCount?: number;
  allTimeRuns?: number;
  allTimeDistanceKm?: number;
  allTimeElevationGain?: number;
  allTimeAvgPace?: string;
}

export interface IStravaResponse {
  stats: IStravaStats;
  activities: IStravaActivity[];
  isFallback?: boolean;
}

export interface IHeatmapDay {
  date: string; // YYYY-MM-DD
  count: number;
  distanceKm: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export type TBookStatus = 'reading' | 'completed' | 'wishlist';

export interface IBookItem {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  status: TBookStatus;
  rating: number; // 1 to 5
  genre: string[];
  review?: string;
  quote?: string;
  link?: string;
  yearRead?: string;
}

export interface IPhotoItem {
  id: string;
  title: string;
  image: string;
  location: string;
  date: string;
  camera?: string;
  lens?: string;
  settings?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  caption?: string;
  tags?: string[];
}
