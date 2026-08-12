import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { calculateStatsFromActivities } from '@/helpers/heatmap';
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
  displayedActivities: IStravaActivity[];
  currentStats?: IStravaStats;
}

/**
 * Custom Hook for fetching Strava activity data, past 1-year stats, and latest activities
 */
export const useStravaActivities = (limit = 6): IUseStravaActivitiesReturn => {
  const {
    data: stravaData,
    isLoading: isStravaLoading,
    isError: isStravaError,
  } = useQuery({
    ...queryStravaActivities(),
  });

  const timePeriodLabel = 'Past 1 Year';

  // Calculate dynamic stats for past 1 year from fetched activities
  const currentStats = useMemo(() => {
    if (!stravaData?.activities || stravaData.activities.length === 0) {
      return stravaData?.stats;
    }
    return calculateStatsFromActivities(stravaData.activities);
  }, [stravaData]);

  // Display latest N activities (default 6)
  const displayedActivities = useMemo(
    () => (stravaData?.activities || []).slice(0, limit),
    [stravaData?.activities, limit],
  );

  return {
    stravaData,
    isStravaLoading,
    isStravaError,
    timePeriodLabel,
    displayedActivities,
    currentStats,
  };
};
