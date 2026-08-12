import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { calculateStatsFromActivities, isValidDate } from '@/helpers/heatmap';
import { queryStravaActivities } from '@/queries/strava';

import {
  IStravaActivity,
  IStravaResponse,
  IStravaStats,
} from '@/types/interfaces/hobbies';

export interface IUseStravaActivitiesReturn {
  stravaData?: IStravaResponse;
  isStravaLoading: boolean;
  isStravaError: boolean;
  timePeriodLabel: string;
  currentYearActivities: IStravaActivity[];
  displayedActivities: IStravaActivity[];
  currentStats?: IStravaStats;
}

/**
 * Custom Hook for fetching Strava activity data filtered exclusively for the current active year
 */
export const useStravaActivities = (limit = 6): IUseStravaActivitiesReturn => {
  const {
    data: stravaData,
    isLoading: isStravaLoading,
    isError: isStravaError,
  } = useQuery({
    ...queryStravaActivities(),
  });

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const timePeriodLabel = `${currentYear}`;

  // Filter activities strictly for the current active year
  const currentYearActivities = useMemo(() => {
    if (!stravaData?.activities) return [];
    return stravaData.activities.filter((act) => {
      const d = new Date(act.startDate);
      return isValidDate(d) && d.getFullYear() === currentYear;
    });
  }, [stravaData?.activities, currentYear]);

  // Calculate dynamic stats exclusively for the current active year
  const currentStats = useMemo(() => {
    if (!currentYearActivities || currentYearActivities.length === 0) {
      return calculateStatsFromActivities([]);
    }
    return calculateStatsFromActivities(currentYearActivities);
  }, [currentYearActivities]);

  // Display latest N activities from current active year (default 6)
  const displayedActivities = useMemo(
    () => currentYearActivities.slice(0, limit),
    [currentYearActivities, limit],
  );

  return {
    stravaData,
    isStravaLoading,
    isStravaError,
    timePeriodLabel,
    currentYearActivities,
    displayedActivities,
    currentStats,
  };
};
