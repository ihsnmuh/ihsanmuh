import { format, formatDistanceStrict } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import ImageFallback from '@/components/Atoms/image/fallback';

import { IExperience } from '@/types/interfaces/experience';

const INITIAL_VISIBLE_COUNT = 3;

interface ExperienceCardProps extends IExperience {
  isLast?: boolean;
}

const ExperienceCard = (props: ExperienceCardProps) => {
  const {
    position,
    status,
    company,
    start,
    end,
    location,
    responsibilities,
    isLast = false,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  const dateRange = formatDistanceStrict(new Date(start), new Date(end));
  const dateStart = format(start, 'MMM yyyy');
  const dateEnd =
    end === new Date().toISOString().split('T')[0]
      ? 'Present'
      : format(end, 'MMM yyyy');

  const hasMore = responsibilities.length > INITIAL_VISIBLE_COUNT;
  const hiddenCount = responsibilities.length - INITIAL_VISIBLE_COUNT;

  return (
    <div className='relative flex md:gap-6'>
      {/* Timeline column - desktop only */}
      <div className='hidden md:flex flex-col items-center flex-none'>
        <div
          className={cn(
            'w-16 h-16 rounded-full flex-none',
            'border-2 border-slate-300 dark:border-zinc-700/40',
            'bg-white dark:bg-slate-800',
            'flex items-center justify-center',
            'z-10 overflow-hidden',
          )}
        >
          <ImageFallback
            src={company.logo}
            alt={company.name}
            width={64}
            height={64}
            className='rounded-sm'
          />
        </div>
        {!isLast && (
          <div className='w-[1.5px] flex-1 bg-slate-300 dark:bg-slate-600' />
        )}
      </div>

      {/* Content card */}
      <div className={cn('flex-1 min-w-0', !isLast && 'pb-6 md:pb-10')}>
        <div
          className={cn(
            'rounded-lg border overflow-hidden',
            'background-card',
            'border-slate-300 dark:border-zinc-700/40',
          )}
        >
          {/* Header */}
          <div className='p-4 md:p-5'>
            <div className='flex items-start gap-3'>
              {/* Logo - mobile only, inline in header */}
              <div
                className={cn(
                  'md:hidden flex-none',
                  'w-12 h-12 rounded-full',
                  'border border-slate-300 dark:border-zinc-700/40',
                  'bg-white dark:bg-slate-800',
                  'flex items-center justify-center',
                  'overflow-hidden',
                )}
              >
                <ImageFallback
                  src={company.logo}
                  alt={company.name}
                  width={48}
                  height={48}
                  className='rounded-sm'
                />
              </div>

              <div className='flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1'>
                <div>
                  <h3 className='font-primary text-base md:text-lg font-semibold'>
                    {position}
                  </h3>
                  <p className='font-primary text-sm text-slate-600 dark:text-slate-400'>
                    {company.name} · {status}
                  </p>
                </div>
                <div className='sm:text-right flex-none'>
                  <p className='font-primary text-xs md:text-sm font-medium'>
                    {dateStart} – {dateEnd}
                  </p>
                  <p className='font-primary text-xs text-slate-500 dark:text-slate-400'>
                    {dateRange} · {location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <div className='border-t border-slate-200 dark:border-zinc-700/40 px-4 md:px-5 py-4'>
            <p className='font-primary text-sm font-semibold mb-3'>
              Key Responsibilities
            </p>

            <ul className='space-y-2'>
              {responsibilities.slice(0, INITIAL_VISIBLE_COUNT).map((r) => (
                <li key={r.id} className='flex gap-2'>
                  <span className='text-primary-500 mt-0.5 flex-none text-sm'>
                    ▸
                  </span>
                  <p className='font-primary text-xs md:text-sm text-slate-700 dark:text-slate-300'>
                    {r.responsibility}
                  </p>
                </li>
              ))}
            </ul>

            <AnimatePresence initial={false}>
              {isExpanded && hasMore && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className='space-y-2 mt-2 overflow-hidden'
                >
                  {responsibilities.slice(INITIAL_VISIBLE_COUNT).map((r) => (
                    <motion.li
                      key={r.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className='flex gap-2'
                    >
                      <span className='text-primary-500 mt-0.5 flex-none text-sm'>
                        ▸
                      </span>
                      <p className='font-primary text-xs md:text-sm text-slate-700 dark:text-slate-300'>
                        {r.responsibility}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {hasMore && (
              <button
                type='button'
                onClick={() => setIsExpanded((prev) => !prev)}
                className={cn(
                  'mt-4 font-primary text-xs md:text-sm font-medium',
                  'text-primary-500 dark:text-primary-300',
                  'hover:text-primary-600 dark:hover:text-primary-200',
                  'cursor-pointer transition-colors',
                  'flex items-center gap-1.5',
                )}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className='flex items-center'
                >
                  <ChevronDown size={16} />
                </motion.div>
                {isExpanded ? 'Show less' : `Show ${hiddenCount} more`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
