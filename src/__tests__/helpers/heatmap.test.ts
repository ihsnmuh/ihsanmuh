import { describe, expect, it } from 'vitest';

import {
  calculateStatsFromActivities,
  generateYearlyHeatmapData,
  getHeatmapLevel,
} from '@/helpers/heatmap';

import { IStravaActivity } from '@/types/interfaces/hobbies';

describe('getHeatmapLevel', () => {
  it('should return level 0 for 0 km or negative distance', () => {
    expect(getHeatmapLevel(0)).toBe(0);
    expect(getHeatmapLevel(-5)).toBe(0);
  });

  it('should return level 1 for distance between 0.1 and 5 km', () => {
    expect(getHeatmapLevel(2.5)).toBe(1);
    expect(getHeatmapLevel(5)).toBe(1);
  });

  it('should return level 2 for distance between 5.1 and 10 km', () => {
    expect(getHeatmapLevel(7.5)).toBe(2);
    expect(getHeatmapLevel(10)).toBe(2);
  });

  it('should return level 3 for distance between 10.1 and 15 km', () => {
    expect(getHeatmapLevel(12.5)).toBe(3);
    expect(getHeatmapLevel(15)).toBe(3);
  });

  it('should return level 4 for distance above 15 km', () => {
    expect(getHeatmapLevel(16)).toBe(4);
    expect(getHeatmapLevel(21.1)).toBe(4);
  });
});

describe('generateYearlyHeatmapData', () => {
  const referenceDate = new Date('2026-08-12');

  const mockActivities: IStravaActivity[] = [
    {
      id: 1,
      name: 'Run 1',
      distance: 5.0,
      movingTime: 1800,
      formattedTime: '30m 00s',
      elapsedTime: 1800,
      totalElevationGain: 20,
      type: 'Run',
      sportType: 'Run',
      startDate: '2026-08-10T08:00:00Z',
      startDateLocal: '2026-08-10T15:00:00Z',
      averageSpeed: 2.77,
      maxSpeed: 3.5,
      pace: '6:00 /km',
      stravaUrl: 'https://strava.com/activities/1',
    },
    {
      id: 2,
      name: 'Run 2',
      distance: 12.0,
      movingTime: 3600,
      formattedTime: '1h 00m',
      elapsedTime: 3600,
      totalElevationGain: 50,
      type: 'Run',
      sportType: 'Run',
      startDate: '2026-08-10T18:00:00Z',
      startDateLocal: '2026-08-10T20:00:00Z',
      averageSpeed: 3.33,
      maxSpeed: 4.2,
      pace: '5:00 /km',
      stravaUrl: 'https://strava.com/activities/2',
    },
  ];

  it('should generate 52 weeks of day objects', () => {
    const result = generateYearlyHeatmapData(mockActivities, referenceDate);
    expect(result.weeks.length).toBe(52);
    expect(result.days.length).toBe(52 * 7);
  });

  it('should sum count and distance for activities on the same date', () => {
    const result = generateYearlyHeatmapData(mockActivities, referenceDate);
    const dayAug10 = result.days.find((d) => d.date === '2026-08-10');

    expect(dayAug10).toBeDefined();
    expect(dayAug10?.count).toBe(2);
    expect(dayAug10?.distanceKm).toBe(17.0);
    expect(dayAug10?.level).toBe(4);
  });

  it('should generate month headers across columns', () => {
    const result = generateYearlyHeatmapData(mockActivities, referenceDate);
    expect(result.monthHeaders.length).toBeGreaterThan(0);
    expect(result.monthHeaders[0]).toHaveProperty('label');
    expect(result.monthHeaders[0]).toHaveProperty('colIndex');
  });

  it('should handle empty activities gracefully', () => {
    const result = generateYearlyHeatmapData([], referenceDate);
    expect(result.days.length).toBe(364);
    expect(result.totalActivities).toBe(0);
    expect(result.totalDistanceKm).toBe(0);
  });
});

describe('calculateStatsFromActivities', () => {
  const mockActivities: IStravaActivity[] = [
    {
      id: 1,
      name: 'Morning Run',
      distance: 10.0,
      movingTime: 3600, // 1 hr = 10km/h => 6:00 /km
      formattedTime: '1h 0m',
      elapsedTime: 3600,
      totalElevationGain: 100,
      type: 'Run',
      sportType: 'Run',
      startDate: '2026-08-01T06:00:00Z',
      startDateLocal: '2026-08-01T06:00:00Z',
      averageSpeed: 2.77778,
      maxSpeed: 3.5,
      pace: '6:00 /km',
      stravaUrl: 'https://strava.com/activities/1',
    },
    {
      id: 2,
      name: 'Evening Ride',
      distance: 25.0,
      movingTime: 3600,
      formattedTime: '1h 0m',
      elapsedTime: 3600,
      totalElevationGain: 300,
      type: 'Ride',
      sportType: 'Ride',
      startDate: '2026-08-02T17:00:00Z',
      startDateLocal: '2026-08-02T17:00:00Z',
      averageSpeed: 6.94,
      maxSpeed: 10.0,
      pace: '25 km/h',
      stravaUrl: 'https://strava.com/activities/2',
    },
  ];

  it('calculates stats correctly filtering for Run type activities', () => {
    const stats = calculateStatsFromActivities(mockActivities);
    expect(stats.totalRuns).toBe(1);
    expect(stats.totalDistanceKm).toBe(10);
    expect(stats.totalElevationGain).toBe(100);
    expect(stats.avgPace).toBe('6:00 /km');
    expect(stats.recentRunCount).toBe(2);
  });

  it('returns default zeroed stats when activities array is empty', () => {
    const stats = calculateStatsFromActivities([]);
    expect(stats.totalRuns).toBe(0);
    expect(stats.totalDistanceKm).toBe(0);
    expect(stats.totalElevationGain).toBe(0);
    expect(stats.avgPace).toBe('0:00 /km');
  });
});
