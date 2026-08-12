import { Activity, Flame, Mountain, Timer } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

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
      value: stats ? `${stats.totalDistanceKm} km` : '-',
      subValue: `${period} Total Distance`,
      icon: Activity,
      color: 'text-orange-500 dark:text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20',
    },
    {
      label: 'Runs',
      value: stats ? stats.totalRuns.toLocaleString() : '-',
      subValue: `${period} Logged Runs`,
      icon: Flame,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Avg Pace',
      value: stats?.avgPace || '-',
      subValue: `${period} Average Pace`,
      icon: Timer,
      color: 'text-emerald-500 dark:text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Elevation',
      value: stats ? `${stats.totalElevationGain.toLocaleString()} m` : '-',
      subValue: `${period} Vertical Climb`,
      icon: Mountain,
      color: 'text-sky-500 dark:text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
    },
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={cn(
              'group relative p-5 rounded-2xl transition-all duration-300',
              'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md',
              'border border-slate-200/80 dark:border-slate-800/80',
              'hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md dark:hover:shadow-slate-900/40',
            )}
          >
            <div className='flex items-center justify-between mb-3'>
              <span className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                {item.label}
              </span>
              <div
                className={cn(
                  'w-8 h-8 rounded-xl flex items-center justify-center border',
                  item.bg,
                  item.color,
                )}
              >
                <Icon className='w-4 h-4' />
              </div>
            </div>

            {isLoading ? (
              <div className='space-y-2 animate-pulse'>
                <div className='h-7 w-24 bg-slate-200 dark:bg-slate-800 rounded' />
                <div className='h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded' />
              </div>
            ) : (
              <div>
                <p className='text-2xl font-bold font-secondary text-slate-900 dark:text-white tracking-tight'>
                  {item.value}
                </p>
                {item.subValue && (
                  <p className='text-xs text-slate-500 dark:text-slate-400 mt-1'>
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
