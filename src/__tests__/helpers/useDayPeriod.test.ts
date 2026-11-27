import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useDayPeriod } from '@/helpers/useDayPeriod';

const atHour = (hour: number) => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 0, 1, hour, 30));
  return renderHook(() => useDayPeriod()).result.current;
};

describe('useDayPeriod', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    [8, 'Good morning', 'grin'],
    [12, 'Good day', 'focused'],
    [16, 'Good afternoon', 'chill'],
    [20, 'Good evening', 'cool'],
    [2, 'Burning the midnight oil?', 'tired'],
  ])('at %i:30 greets "%s" with the %s mood', (hour, greeting, mood) => {
    expect(atHour(hour)).toEqual({ greeting, mood });
  });
});
