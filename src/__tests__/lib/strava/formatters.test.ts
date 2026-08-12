import { describe, expect, it } from 'vitest';

import {
  EMPTY_STRAVA_RESPONSE,
  formatDistance,
  formatDuration,
  formatPace,
} from '@/lib/strava';

describe('Strava formatters and helpers', () => {
  describe('formatPace', () => {
    it('formats meters per second to pace string correctly', () => {
      // 3.333 m/s = ~5:00 /km
      expect(formatPace(3.33333)).toBe('5:00 /km');
      // 3.14 m/s = ~5:18 /km
      expect(formatPace(3.14)).toBe('5:18 /km');
      // 4.0 m/s = ~4:10 /km
      expect(formatPace(4.0)).toBe('4:10 /km');
    });

    it('handles zero or null/undefined gracefully', () => {
      expect(formatPace(0)).toBe('0:00 /km');
      expect(formatPace(undefined)).toBe('0:00 /km');
      expect(formatPace(null)).toBe('0:00 /km');
      expect(formatPace(-5)).toBe('0:00 /km');
    });
  });

  describe('formatDistance', () => {
    it('converts meters to kilometers rounded to 2 decimal places', () => {
      expect(formatDistance(10000)).toBe(10);
      expect(formatDistance(7250)).toBe(7.25);
      expect(formatDistance(21097.5)).toBe(21.1);
      expect(formatDistance(42195)).toBe(42.2);
    });

    it('handles invalid or zero distances', () => {
      expect(formatDistance(0)).toBe(0);
      expect(formatDistance(null)).toBe(0);
      expect(formatDistance(undefined)).toBe(0);
    });
  });

  describe('formatDuration', () => {
    it('formats seconds to human-readable strings', () => {
      expect(formatDuration(45)).toBe('45s');
      expect(formatDuration(1830)).toBe('30m 30s');
      expect(formatDuration(4785)).toBe('1h 19m');
    });

    it('handles zero or negative duration', () => {
      expect(formatDuration(0)).toBe('0s');
      expect(formatDuration(null)).toBe('0s');
      expect(formatDuration(undefined)).toBe('0s');
    });
  });

  describe('EMPTY_STRAVA_RESPONSE', () => {
    it('returns valid empty fallback activities and stats structure', () => {
      expect(EMPTY_STRAVA_RESPONSE.isFallback).toBe(true);
      expect(EMPTY_STRAVA_RESPONSE.activities).toHaveLength(0);
      expect(EMPTY_STRAVA_RESPONSE.stats.totalRuns).toBe(0);
      expect(EMPTY_STRAVA_RESPONSE.stats.totalDistanceKm).toBe(0);
    });
  });
});
