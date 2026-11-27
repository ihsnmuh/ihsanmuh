import { useEffect, useState } from 'react';

import type { TSanMood } from '@/lib/san';

export type TDayPeriod = { greeting: string; mood: TSanMood };

const getDayPeriod = (hour: number): TDayPeriod => {
  if (hour >= 5 && hour < 11) return { greeting: 'Good morning', mood: 'grin' };
  if (hour >= 11 && hour < 15) return { greeting: 'Good day', mood: 'focused' };
  if (hour >= 15 && hour < 18) {
    return { greeting: 'Good afternoon', mood: 'chill' };
  }
  if (hour >= 18 && hour < 22)
    return { greeting: 'Good evening', mood: 'cool' };
  return { greeting: 'Burning the midnight oil?', mood: 'tired' };
};

/**
 * Greeting and San mood for the visitor's local time. Returns null until mounted so the
 * server render and the first client render match.
 */
export function useDayPeriod() {
  const [period, setPeriod] = useState<TDayPeriod | null>(null);

  useEffect(() => {
    setPeriod(getDayPeriod(new Date().getHours()));
  }, []);

  return period;
}
