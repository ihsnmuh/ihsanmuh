import { STRAVA_ACTIVITIES } from '@/constant/queryKeys/strava';
import { fetchStravaData } from '@/services/strava';

export const queryStravaActivities = () => {
  return {
    queryKey: STRAVA_ACTIVITIES,
    queryFn: async () => fetchStravaData(),
    staleTime: 15 * 60 * 1000, // 15 minutes cache freshness
    cacheTime: 30 * 60 * 1000, // 30 minutes garbage collection retention
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  };
};
