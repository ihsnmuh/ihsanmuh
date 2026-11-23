import { describe, expect, it, vi } from 'vitest';

import { formatDate, getYearNow } from '@/helpers/formatDate';

describe('formatDate', () => {
  it('should format date string to Indonesian locale format', () => {
    const result = formatDate('2024-01-15');
    expect(result).toBe('15 January 2024');
  });

  it('should handle ISO 8601 date strings', () => {
    const result = formatDate('2024-12-25T10:30:00Z');
    expect(result).toBe('25 December 2024');
  });

  it('should format dates with single-digit days', () => {
    const result = formatDate('2024-03-05');
    expect(result).toBe('5 March 2024');
  });

  it('should handle different months correctly', () => {
    expect(formatDate('2024-01-01')).toBe('1 January 2024');
    expect(formatDate('2024-06-15')).toBe('15 June 2024');
    expect(formatDate('2024-12-31')).toBe('31 December 2024');
  });

  it('should handle leap year dates', () => {
    const result = formatDate('2024-02-29');
    expect(result).toBe('29 February 2024');
  });

  it('should format past dates correctly', () => {
    const result = formatDate('2020-05-10');
    expect(result).toBe('10 May 2020');
  });

  it('should format future dates correctly', () => {
    const result = formatDate('2030-08-20');
    expect(result).toBe('20 August 2030');
  });
});

describe('getYearNow', () => {
  it('should return current year as number', () => {
    const result = getYearNow();
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(2024);
  });

  it('should match Date.getFullYear() output', () => {
    const result = getYearNow();
    const expected = new Date().getFullYear();
    expect(result).toBe(expected);
  });

  it('should return 4-digit year', () => {
    const result = getYearNow();
    expect(result.toString()).toHaveLength(4);
  });

  it('should be consistent when called multiple times', () => {
    const result1 = getYearNow();
    const result2 = getYearNow();
    expect(result1).toBe(result2);
  });

  it('should handle mock dates correctly', () => {
    const mockDate = new Date('2025-06-15');
    vi.setSystemTime(mockDate);

    const result = getYearNow();
    expect(result).toBe(2025);

    vi.useRealTimers();
  });
});
