import { useQuery } from '@tanstack/react-query';
import {
  Activity,
  Bike,
  BookOpen,
  Camera,
  ChevronDown,
  Footprints,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useMemo, useState } from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import Title from '@/components/Atoms/title';
import ActivityHeatmapCard from '@/components/Molecules/card/ActivityHeatmapCard';
import BookCard from '@/components/Molecules/card/BookCard';
import PhotoCard from '@/components/Molecules/card/PhotoCard';
import RecentRunCard from '@/components/Molecules/card/RecentRunCard';
import RunningStatsCard from '@/components/Molecules/card/RunningStatsCard';
import HobbyTabNav from '@/components/Molecules/hobbies/HobbyTabNav';

import { BOOKS_DATA, HOBBY_CATEGORIES, PHOTOS_DATA } from '@/constant/hobbies';
import { calculateStatsFromActivities } from '@/helpers/heatmap';
import { queryStravaActivities } from '@/queries/strava';

import { THobbyCategory } from '@/types/interfaces/hobbies';

type TSportFilter = 'all' | 'run' | 'ride' | 'walk';
type TTimeFilter = 'all' | 'this_year' | '30_days' | string;

const HobbiesContainer = () => {
  const show = LoaderView();
  const [activeTab, setActiveTab] = useState<THobbyCategory>('running');
  const [sportFilter, setSportFilter] = useState<TSportFilter>('all');
  const [timeFilter, setTimeFilter] = useState<TTimeFilter>('all');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // TanStack Query for Strava Running data
  const {
    data: stravaData,
    isLoading: isStravaLoading,
    isError: isStravaError,
  } = useQuery({
    ...queryStravaActivities(),
  });

  const activeCategoryConfig = HOBBY_CATEGORIES.find((c) => c.id === activeTab);

  const tabCounts: Partial<Record<THobbyCategory, number>> = {
    running: stravaData?.activities?.length || 6,
    reading: BOOKS_DATA.length,
    photography: PHOTOS_DATA.length,
  };

  // Available activity years for year dropdown selector
  const availableYears = useMemo(() => {
    if (!stravaData?.activities) return [];
    const yearSet = new Set(
      stravaData.activities
        .map((act) => new Date(act.startDate).getFullYear())
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
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      );
  }, [stravaData?.activities, sportFilter, timeFilter]);

  // Calculate dynamic stats based on selected time filter
  const currentStats = useMemo(() => {
    if (timeFilter === 'all' && stravaData?.stats) {
      // Use official Strava all_run_totals stats when All Time is selected
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

  const displayedActivities = filteredActivities.slice(0, visibleCount);
  const hasMoreActivities = filteredActivities.length > visibleCount;

  return (
    <section className={cn('layout py-20', show && 'fade-in-start')}>
      {/* Page Header */}
      <div className='mt-10 max-w-3xl' data-fade='1'>
        <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary-500/10 text-primary-500 dark:text-primary-400 mb-3 border border-primary-500/20'>
          <Sparkles className='w-3.5 h-3.5' />
          <span>Life & Pursuits</span>
        </div>
        <Title title='Hobbies & Crafts' />
        <p
          className={cn(
            'mt-4 text-base md:text-lg leading-relaxed',
            'text-gray-500 dark:text-gray-400',
            'max-w-2xl',
          )}
        >
          Beyond writing code and shipping software: logging endurance miles,
          reading timeless literature, and capturing everyday moments.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className='mt-10 mb-8' data-fade='2'>
        <HobbyTabNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={tabCounts}
        />
      </div>

      {/* Tab Content Section */}
      <div className='min-h-[450px]' data-fade='3'>
        <AnimatePresence mode='wait'>
          {/* TAB 1: RUNNING & FITNESS */}
          {activeTab === 'running' && (
            <motion.div
              key='running'
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className='space-y-8'
            >
              {/* Category Description Banner */}
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20'>
                <div className='flex items-start gap-3'>
                  <div className='p-2 rounded-xl bg-orange-500 text-white shadow-sm mt-0.5'>
                    <Activity className='w-5 h-5' />
                  </div>
                  <div>
                    <h3 className='font-bold font-secondary text-slate-900 dark:text-white'>
                      Strava Running & Activities Log
                    </h3>
                    <p className='text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5'>
                      {activeCategoryConfig?.description}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-2 self-start sm:self-auto'>
                  <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FC4C02] text-white shadow-sm'>
                    <span className='w-1.5 h-1.5 rounded-full bg-white animate-pulse' />
                    Live Strava Sync
                  </span>
                </div>
              </div>

              {/* Running Summary Stats Cards */}
              <RunningStatsCard
                stats={currentStats}
                isLoading={isStravaLoading}
                timePeriodLabel={timePeriodLabel}
              />

              {/* 365-Day Activity Heatmap Grid */}
              <ActivityHeatmapCard
                activities={stravaData?.activities}
                isLoading={isStravaLoading}
              />

              {/* Recent Activities Section */}
              <div>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5'>
                  <div>
                    <h4 className='text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300'>
                      Recent Activities
                    </h4>
                    <p className='text-xs text-slate-400 dark:text-slate-500 mt-0.5'>
                      Showing {displayedActivities.length} of{' '}
                      {filteredActivities.length} logged activities
                    </p>
                  </div>

                  {/* Filter Controls (Time Range & Sport) */}
                  <div className='flex flex-wrap items-center gap-2 self-start sm:self-auto'>
                    {/* Time Range Filter Chips */}
                    <div className='flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60'>
                      {[
                        { id: 'all', label: 'All Time' },
                        {
                          id: 'this_year',
                          label: `${new Date().getFullYear()}`,
                        },
                        { id: '30_days', label: '30 Days' },
                      ].map((item) => {
                        const isActive = timeFilter === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setTimeFilter(item.id as TTimeFilter);
                              setVisibleCount(6);
                            }}
                            className={cn(
                              'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors',
                              isActive
                                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200',
                            )}
                          >
                            {item.label}
                          </button>
                        );
                      })}

                      {/* Dropdown selector for specific older years */}
                      {availableYears.filter(
                        (y) => y !== new Date().getFullYear(),
                      ).length > 0 && (
                        <select
                          value={
                            ['all', 'this_year', '30_days'].includes(timeFilter)
                              ? ''
                              : timeFilter
                          }
                          onChange={(e) => {
                            if (e.target.value) {
                              setTimeFilter(e.target.value);
                              setVisibleCount(6);
                            }
                          }}
                          className={cn(
                            'px-2 py-1 rounded-lg text-xs font-medium bg-transparent cursor-pointer outline-none transition-colors',
                            !['all', 'this_year', '30_days'].includes(
                              timeFilter,
                            )
                              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200',
                          )}
                        >
                          <option value='' disabled hidden>
                            Year...
                          </option>
                          {availableYears
                            .filter((y) => y !== new Date().getFullYear())
                            .map((year) => (
                              <option
                                key={year}
                                value={`${year}`}
                                className='bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
                              >
                                {year}
                              </option>
                            ))}
                        </select>
                      )}
                    </div>

                    {/* Sport Filter Chips */}
                    <div className='flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60'>
                      {[
                        { id: 'all', label: 'All', icon: null },
                        { id: 'run', label: 'Runs', icon: Activity },
                        { id: 'ride', label: 'Rides', icon: Bike },
                        { id: 'walk', label: 'Walks', icon: Footprints },
                      ].map((item) => {
                        const isActive = sportFilter === item.id;
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setSportFilter(item.id as TSportFilter);
                              setVisibleCount(6);
                            }}
                            className={cn(
                              'flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors',
                              isActive
                                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200',
                            )}
                          >
                            {Icon && <Icon className='w-3 h-3' />}
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {isStravaLoading ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className='h-52 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse'
                      />
                    ))}
                  </div>
                ) : isStravaError ? (
                  <div className='text-center py-12 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800'>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                      Failed to load live Strava activities. Please try
                      refreshing.
                    </p>
                  </div>
                ) : displayedActivities.length > 0 ? (
                  <>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                      {displayedActivities.map((activity) => (
                        <RecentRunCard key={activity.id} activity={activity} />
                      ))}
                    </div>

                    {/* Load More Button */}
                    {hasMoreActivities && (
                      <div className='mt-8 flex justify-center'>
                        <button
                          onClick={() => setVisibleCount((prev) => prev + 6)}
                          className={cn(
                            'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold',
                            'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
                            'border border-slate-200 dark:border-slate-700',
                            'hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors',
                          )}
                        >
                          <span>Show More Activities</span>
                          <ChevronDown className='w-4 h-4' />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className='text-center py-12 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800'>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                      No activities found for this filter.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: READING */}
          {activeTab === 'reading' && (
            <motion.div
              key='reading'
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className='space-y-6'
            >
              {/* Category Description Banner */}
              <div className='flex items-start gap-3 p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-500/20'>
                <div className='p-2 rounded-xl bg-blue-500 text-white shadow-sm mt-0.5'>
                  <BookOpen className='w-5 h-5' />
                </div>
                <div>
                  <h3 className='font-bold font-secondary text-slate-900 dark:text-white'>
                    Bookshelf & Reading Notes
                  </h3>
                  <p className='text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5'>
                    {activeCategoryConfig?.description}
                  </p>
                </div>
              </div>

              {/* Books Grid */}
              <div className='grid grid-cols-1 gap-5'>
                {BOOKS_DATA.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: PHOTOGRAPHY */}
          {activeTab === 'photography' && (
            <motion.div
              key='photography'
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className='space-y-6'
            >
              {/* Category Description Banner */}
              <div className='flex items-start gap-3 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20'>
                <div className='p-2 rounded-xl bg-emerald-500 text-white shadow-sm mt-0.5'>
                  <Camera className='w-5 h-5' />
                </div>
                <div>
                  <h3 className='font-bold font-secondary text-slate-900 dark:text-white'>
                    Moments & Photography
                  </h3>
                  <p className='text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5'>
                    {activeCategoryConfig?.description}
                  </p>
                </div>
              </div>

              {/* Photography Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {PHOTOS_DATA.map((photo) => (
                  <PhotoCard key={photo.id} photo={photo} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HobbiesContainer;
