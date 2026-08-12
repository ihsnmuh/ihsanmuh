import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';

import { calculateStatsFromActivities, isValidDate } from '@/helpers/heatmap';
import { queryStravaActivities } from '@/queries/strava';

import {
  IStravaActivity,
  IStravaResponse,
  IStravaStats,
} from '@/types/interfaces/hobbies';

export type TSportFilter = 'all' | 'run' | 'ride' | 'walk';
export type TTimeFilter = 'all' | 'this_year' | '30_days' | string;

export interface IUseStravaActivitiesReturn {
  stravaData?: IStravaResponse;
  isStravaLoading: boolean;
  isStravaError: boolean;
  sportFilter: TSportFilter;
  setSportFilter: (filter: TSportFilter) => void;
  timeFilter: TTimeFilter;
  setTimeFilter: (filter: TTimeFilter) => void;
  visibleCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  loadMore: () => void;
  availableYears: number[];
  timePeriodLabel: string;
  filteredActivities: IStravaActivity[];
  displayedActivities: IStravaActivity[];
  hasMoreActivities: boolean;
  currentStats?: IStravaStats;
}

/**
 * Custom Hook for managing Strava activity state, filtering, pagination, and dynamic stats calculation
 */
export const useStravaActivities = (
  initialVisibleCount = 6,
): IUseStravaActivitiesReturn => {
  const [sportFilter, setSportFilterState] = useState<TSportFilter>('all');
  const [timeFilter, setTimeFilterState] = useState<TTimeFilter>('all');
  const [visibleCount, setVisibleCount] = useState<number>(initialVisibleCount);

  const {
    data: stravaData,
    isLoading: isStravaLoading,
    isError: isStravaError,
  } = useQuery({
    ...queryStravaActivities(),
  });

  const setSportFilter = (filter: TSportFilter) => {
    setSportFilterState(filter);
    setVisibleCount(initialVisibleCount);
  };

  const setTimeFilter = (filter: TTimeFilter) => {
    setTimeFilterState(filter);
    setVisibleCount(initialVisibleCount);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // Available activity years for year dropdown selector
  const availableYears = useMemo(() => {
    if (!stravaData?.activities) return [];
    const yearSet = new Set(
      stravaData.activities
        .map((act) => {
          const d = new Date(act.startDate);
          return isValidDate(d) ? d.getFullYear() : NaN;
        })
        .filter((y) => !isNaN(y)),
    );
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [stravaData?.activities]);

  const timePeriodLabel = useMemo(() => {
    if (timeFilter === 'all') return 'All-Time';
    if (timeFilter === 'this_year') return `${new Date().getFullYear()}`;
    if (timeFilter === '30_days') return '30 Days';
    return timeFilter;
  }, [timeFilter]);

  // Filter activities by selected sport and time range / year
  const filteredActivities = useMemo(() => {
    if (!stravaData?.activities) return [];

    const now = Date.now();
    const currentYear = new Date().getFullYear();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

    return stravaData.activities
      .filter((act) => {
        const actDate = new Date(act.startDate);
        if (!isValidDate(actDate)) return false;

        // 1. Time range / year filter
        if (timeFilter === 'this_year') {
          if (actDate.getFullYear() !== currentYear) return false;
        } else if (timeFilter === '30_days') {
          if (now - actDate.getTime() > thirtyDaysMs) return false;
        } else if (timeFilter !== 'all') {
          if (actDate.getFullYear() !== Number(timeFilter)) return false;
        }

        // 2. Sport type filter
        if (sportFilter === 'all') return true;
        const type = (act.type || act.sportType || '').toLowerCase();
        if (sportFilter === 'run') return type.includes('run');
        if (sportFilter === 'ride')
          return (
            type.includes('ride') ||
            type.includes('cycle') ||
            type.includes('bike')
          );
        if (sportFilter === 'walk')
          return type.includes('walk') || type.includes('hike');
        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
      });
  }, [stravaData?.activities, sportFilter, timeFilter]);

  // Calculate dynamic stats based on selected time filter
  const currentStats = useMemo(() => {
    if (timeFilter === 'all' && stravaData?.stats) {
      return {
        totalRuns: stravaData.stats.allTimeRuns ?? stravaData.stats.totalRuns,
        totalDistanceKm:
          stravaData.stats.allTimeDistanceKm ??
          stravaData.stats.totalDistanceKm,
        ytdDistanceKm: stravaData.stats.ytdDistanceKm,
        totalElevationGain:
          stravaData.stats.allTimeElevationGain ??
          stravaData.stats.totalElevationGain,
        avgPace: stravaData.stats.allTimeAvgPace || stravaData.stats.avgPace,
        recentRunCount: stravaData.activities?.length || 0,
      };
    }

    if (!stravaData?.activities || stravaData.activities.length === 0) {
      return stravaData?.stats;
    }

    const targetActivities = stravaData.activities.filter((act) => {
      const actDate = new Date(act.startDate);
      if (!isValidDate(actDate)) return false;
      if (timeFilter === 'this_year') {
        return actDate.getFullYear() === new Date().getFullYear();
      }
      if (timeFilter === '30_days') {
        return Date.now() - actDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
      }
      return actDate.getFullYear() === Number(timeFilter);
    });

    return calculateStatsFromActivities(targetActivities);
  }, [stravaData, timeFilter]);

  const displayedActivities = useMemo(
    () => filteredActivities.slice(0, visibleCount),
    [filteredActivities, visibleCount],
  );

  const hasMoreActivities = filteredActivities.length > visibleCount;

  return {
    stravaData,
    isStravaLoading,
    isStravaError,
    sportFilter,
    setSportFilter,
    timeFilter,
    setTimeFilter,
    visibleCount,
    setVisibleCount,
    loadMore,
    availableYears,
    timePeriodLabel,
    filteredActivities,
    displayedActivities,
    hasMoreActivities,
    currentStats,
  };
};
