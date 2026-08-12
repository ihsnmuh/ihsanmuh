import { Activity, Flame, Mountain, Timer } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import AnimatedNumber from '@/components/Atoms/AnimatedNumber';

import { IStravaStats } from '@/types/interfaces/hobbies';

interface RunningStatsCardProps {
  stats?: IStravaStats;
  isLoading?: boolean;
  timePeriodLabel?: string;
}

const RunningStatsCard: React.FC<RunningStatsCardProps> = ({
  stats,
  isLoading,
  timePeriodLabel,
}) => {
  const period = timePeriodLabel || `${new Date().getFullYear()}`;

  const statItems = [
    {
      label: 'Distance',
      isNumeric: true,
      numericValue: stats?.totalDistanceKm || 0,
      decimals: 2,
      suffix: ' km',
      fallback: stats ? `${stats.totalDistanceKm} km` : '-',
      subValue: `${period} Total Distance`,
      icon: Activity,
      color: 'text-orange-500 dark:text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20',
    },
    {
      label: 'Runs',
      isNumeric: true,
      numericValue: stats?.totalRuns || 0,
      decimals: 0,
      suffix: '',
      fallback: stats ? stats.totalRuns.toLocaleString() : '-',
      subValue: `${period} Logged Runs`,
      icon: Flame,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Avg Pace',
      isNumeric: false,
      value: stats?.avgPace || '-',
      subValue: `${period} Average Pace`,
      icon: Timer,
      color: 'text-emerald-500 dark:text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Elevation',
      isNumeric: true,
      numericValue: stats?.totalElevationGain || 0,
      decimals: 0,
      suffix: ' m',
      fallback: stats ? `${stats.totalElevationGain.toLocaleString()} m` : '-',
      subValue: `${period} Vertical Climb`,
      icon: Mountain,
      color: 'text-sky-500 dark:text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
    },
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4'>
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={cn(
              'group relative p-4 sm:p-5 rounded-2xl transition-all duration-300',
              'bg-white/80 dark:bg-slate-900/60 backdrop-blur-md',
              'border border-slate-200/80 dark:border-slate-800/80',
              'hover:border-slate-300 dark:hover:border-slate-700/80 hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-slate-950/40',
            )}
          >
            <div className='flex items-center justify-between mb-2.5 sm:mb-3'>
              <span className='text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate pr-1'>
                {item.label}
              </span>
              <div
                className={cn(
                  'w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center border flex-shrink-0',
                  item.bg,
                  item.color,
                )}
              >
                <Icon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
            </div>

            {isLoading ? (
              <div className='space-y-2 animate-pulse'>
                <div className='h-6 sm:h-7 w-20 sm:w-24 bg-slate-200 dark:bg-slate-800 rounded' />
                <div className='h-3 w-14 sm:w-16 bg-slate-200 dark:bg-slate-800 rounded' />
              </div>
            ) : (
              <div>
                <p className='text-xl sm:text-2xl font-bold font-secondary text-slate-900 dark:text-white tracking-tight truncate'>
                  {item.isNumeric && stats ? (
                    <AnimatedNumber
                      value={item.numericValue ?? 0}
                      decimals={item.decimals}
                      suffix={item.suffix}
                    />
                  ) : (
                    item.value
                  )}
                </p>
                {item.subValue && (
                  <p className='text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 truncate'>
                    {item.subValue}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RunningStatsCard;
