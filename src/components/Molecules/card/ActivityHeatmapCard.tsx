import { format } from 'date-fns';
import { Calendar, Flame } from 'lucide-react';
import React, { useMemo } from 'react';

import { cn } from '@/lib/utils';

import { Tooltip } from '@/components/Atoms/Tooltip';

import { generateYearlyHeatmapData } from '@/helpers/heatmap';

import { IStravaActivity } from '@/types/interfaces/hobbies';

interface ActivityHeatmapCardProps {
  activities?: IStravaActivity[];
  isLoading?: boolean;
  title?: string;
}

const LEVEL_BG_CLASSES: Record<number, string> = {
  0: 'bg-slate-100 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/40',
  1: 'bg-emerald-200 dark:bg-emerald-950/90 border-emerald-300/60 dark:border-emerald-800/60',
  2: 'bg-emerald-400 dark:bg-emerald-700 border-emerald-500/60 dark:border-emerald-600/60',
  3: 'bg-emerald-500 dark:bg-emerald-500 border-emerald-600/60 dark:border-emerald-400/60',
  4: 'bg-emerald-600 dark:bg-emerald-400 border-emerald-700/60 dark:border-emerald-300/60',
};

const ActivityHeatmapCard: React.FC<ActivityHeatmapCardProps> = ({
  activities = [],
  isLoading = false,
  title = 'Daily Activity Matrix',
}) => {
  const heatmapData = useMemo(() => {
    return generateYearlyHeatmapData(activities);
  }, [activities]);

  const { weeks, monthHeaders, totalActivities, totalDistanceKm } = heatmapData;

  const weekdays = [
    { label: 'Mon', show: true },
    { label: 'Tue', show: false },
    { label: 'Wed', show: true },
    { label: 'Thu', show: false },
    { label: 'Fri', show: true },
    { label: 'Sat', show: false },
    { label: 'Sun', show: false },
  ];

  return (
    <div
      className={cn(
        'p-5 sm:p-6 rounded-2xl transition-all duration-300',
        'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md',
        'border border-slate-200/80 dark:border-slate-800/80',
        'shadow-sm hover:shadow-md transition-shadow',
      )}
    >
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5'>
        <div className='flex items-center gap-2.5'>
          <div className='w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400'>
            <Calendar className='w-4 h-4' />
          </div>
          <div>
            <h3 className='text-base font-bold font-secondary text-slate-900 dark:text-white tracking-tight'>
              {title}
            </h3>
            <p className='text-xs text-slate-500 dark:text-slate-400 mt-0.5'>
              365-day activity heat grid logged via Strava
            </p>
          </div>
        </div>

        {/* Total Summary Badge */}
        {!isLoading && (
          <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300 self-start sm:self-auto'>
            <Flame className='w-3.5 h-3.5 text-orange-500 animate-pulse' />
            <span>
              {totalActivities} activities • {totalDistanceKm} km
            </span>
          </div>
        )}
      </div>

      {/* Heatmap Grid Content */}
      {isLoading ? (
        <div className='space-y-3 animate-pulse py-4'>
          <div className='h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded' />
          <div className='h-28 w-full bg-slate-100 dark:bg-slate-800/60 rounded-xl' />
        </div>
      ) : (
        <div className='overflow-x-auto pb-2 pt-1 scroller-style'>
          <div className='inline-flex flex-col min-w-[700px]'>
            {/* Month Labels Header Row */}
            <div className='flex pl-8 mb-2 h-4 text-[11px] font-medium text-slate-400 dark:text-slate-500 select-none'>
              {weeks.map((_, colIdx) => {
                const header = monthHeaders.find((m) => m.colIndex === colIdx);
                return (
                  <div key={colIdx} className='w-3 mr-1 flex-shrink-0 relative'>
                    {header && (
                      <span className='absolute left-0 top-0 whitespace-nowrap font-semibold'>
                        {header.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Matrix Body: Weekday Labels + Week Columns */}
            <div className='flex items-start'>
              {/* Weekday Row Labels (Mon, Wed, Fri) */}
              <div className='flex flex-col gap-1 pr-2 w-8 text-[10px] font-semibold text-slate-400 dark:text-slate-500 select-none pt-0.5'>
                {weekdays.map((wd, i) => (
                  <div
                    key={i}
                    className='h-3 flex items-center leading-none justify-end'
                  >
                    {wd.show ? wd.label : ''}
                  </div>
                ))}
              </div>

              {/* 52 Week Columns */}
              <div className='flex gap-1'>
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className='flex flex-col gap-1'>
                    {week.map((day) => {
                      const formattedDateStr = format(
                        new Date(day.date),
                        'EEEE, MMM d, yyyy',
                      );
                      const tooltipContent = (
                        <div className='text-center space-y-0.5'>
                          <p className='font-semibold text-white'>
                            {formattedDateStr}
                          </p>
                          <p className='text-emerald-300 font-mono text-[11px]'>
                            {day.count > 0
                              ? `${day.distanceKm} km (${day.count} activity${
                                  day.count > 1 ? 'ies' : ''
                                })`
                              : 'No activity logged'}
                          </p>
                        </div>
                      );

                      return (
                        <Tooltip
                          key={day.date}
                          content={tooltipContent}
                          side='top'
                        >
                          <div
                            data-testid={`day-cell-${day.date}`}
                            className={cn(
                              'w-3 h-3 rounded-[3px] border transition-all duration-150',
                              'hover:scale-125 hover:z-20 cursor-pointer shadow-2xs',
                              LEVEL_BG_CLASSES[day.level],
                            )}
                          />
                        </Tooltip>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer: Legend */}
      {!isLoading && (
        <div className='mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400'>
          <span className='hidden sm:inline text-[11px] font-medium text-slate-400 dark:text-slate-500'>
            Distance: 0km (Gray) • 1-5km • 5-10km • 10-15km • &gt;15km (Dark
            Green)
          </span>
          <div className='flex items-center gap-1.5 ml-auto text-[11px] font-semibold'>
            <span className='text-slate-400 dark:text-slate-500 mr-0.5'>
              Less
            </span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                className={cn(
                  'w-3 h-3 rounded-[3px] border',
                  LEVEL_BG_CLASSES[lvl],
                )}
              />
            ))}
            <span className='text-slate-400 dark:text-slate-500 ml-0.5'>
              More
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityHeatmapCard;
