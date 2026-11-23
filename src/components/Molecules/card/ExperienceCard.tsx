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
    <div className='relative flex md:gap-5'>
      {/* Timeline column - desktop only */}
      <div className='hidden md:flex flex-col items-center flex-none'>
        <div
          className={cn(
            'w-12 h-12 rounded-sm flex-none',
            'border border-hairline',
            'bg-paper-white',
            'flex items-center justify-center',
            'z-10 overflow-hidden shadow-none',
          )}
        >
          <ImageFallback
            src={company.logo}
            alt={company.name}
            width={48}
            height={48}
            className='rounded-xs'
          />
        </div>
        {!isLast && <div className='w-[1px] flex-1 bg-hairline mt-2' />}
      </div>

      {/* Content card */}
      <div className={cn('flex-1 min-w-0', !isLast && 'pb-5 md:pb-8')}>
        <div
          className={cn(
            'rounded-sm border border-hairline overflow-hidden',
            'bg-paper-white text-deep-moss shadow-none',
          )}
        >
          {/* Header */}
          <div className='p-4 md:p-5'>
            <div className='flex items-start gap-3'>
              {/* Logo - mobile only */}
              <div
                className={cn(
                  'md:hidden flex-none',
                  'w-10 h-10 rounded-sm',
                  'border border-hairline',
                  'bg-paper-white',
                  'flex items-center justify-center',
                  'overflow-hidden shadow-none',
                )}
              >
                <ImageFallback
                  src={company.logo}
                  alt={company.name}
                  width={40}
                  height={40}
                  className='rounded-xs'
                />
              </div>

              <div className='flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1'>
                <div>
                  <h3 className='font-primary text-base md:text-lg font-bold text-deep-moss'>
                    {position}
                  </h3>
                  <p className='font-ui text-xs sm:text-sm text-olive-char'>
                    {company.name} · {status}
                  </p>
                </div>
                <div className='sm:text-right flex-none'>
                  <p className='font-mono text-xs font-medium text-deep-moss'>
                    {dateStart} – {dateEnd}
                  </p>
                  <p className='font-mono text-[11px] text-sage-gray'>
                    {dateRange} · {location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <div className='border-t border-hairline/70 px-4 md:px-5 py-3.5 bg-soft-linen/40'>
            <p className='font-mono text-[11px] font-bold uppercase tracking-wider text-sage-gray mb-2.5'>
              Key Responsibilities
            </p>

            <ul className='space-y-1.5'>
              {responsibilities.slice(0, INITIAL_VISIBLE_COUNT).map((r) => (
                <li key={r.id} className='flex gap-2 items-start'>
                  <span className='text-amber-glow mt-0.5 flex-none text-xs font-mono'>
                    ▸
                  </span>
                  <p className='font-ui text-xs sm:text-sm text-olive-char leading-relaxed'>
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
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className='space-y-1.5 mt-1.5 overflow-hidden'
                >
                  {responsibilities.slice(INITIAL_VISIBLE_COUNT).map((r) => (
                    <motion.li
                      key={r.id}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className='flex gap-2 items-start'
                    >
                      <span className='text-amber-glow mt-0.5 flex-none text-xs font-mono'>
                        ▸
                      </span>
                      <p className='font-ui text-xs sm:text-sm text-olive-char leading-relaxed'>
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
                  'mt-3 font-ui text-xs font-semibold',
                  'text-burnished-gold hover:text-dark-amber',
                  'cursor-pointer transition-colors',
                  'flex items-center gap-1',
                )}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className='flex items-center'
                >
                  <ChevronDown size={14} />
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
