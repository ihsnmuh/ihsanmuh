import { format, formatDistanceStrict } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
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

  const isCurrent = !end;
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const dateRange = formatDistanceStrict(startDate, endDate);
  const dateStart = format(startDate, 'MMM yyyy');
  const dateEnd = isCurrent ? 'Present' : format(endDate, 'MMM yyyy');

  const companyMonogram =
    company.shortName ||
    company.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? '')
      .join('');

  const hasMore = responsibilities.length > INITIAL_VISIBLE_COUNT;
  const hiddenCount = responsibilities.length - INITIAL_VISIBLE_COUNT;

  return (
    <div className={cn('relative', !isLast && 'pb-6')}>
      <div className='rounded-lg border border-hairline overflow-hidden bg-surface hover:border-hairline-strong transition-colors'>
        <div className='p-5'>
          <div className='flex items-start gap-3.5'>
            <div className='flex-none w-11 h-11 rounded-md border border-hairline bg-white p-1 flex items-center justify-center overflow-hidden'>
              {company.logo ? (
                <ImageFallback
                  src={company.logo}
                  alt={company.name}
                  width={44}
                  height={44}
                  className='w-full h-full object-contain rounded-sm'
                />
              ) : (
                <span className='font-mono text-xs font-bold tracking-tight text-accent select-none'>
                  {companyMonogram}
                </span>
              )}
            </div>

            <div className='flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1'>
              <div>
                <h3 className='font-primary text-base sm:text-lg font-semibold text-ink tracking-tight'>
                  {position}
                </h3>
                <p className='text-sm text-body'>
                  {company.name} · <span className='text-muted'>{status}</span>
                </p>
              </div>
              <div className='sm:text-right flex-none tabular-nums'>
                <p className='font-mono text-xs font-medium text-ink'>
                  {dateStart} – {dateEnd}
                </p>
                <p className='font-mono text-[11px] text-muted mt-0.5'>
                  {dateRange} · {location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-hairline/70 px-5 py-4 bg-subtle/40'>
          <ul className='space-y-2'>
            {responsibilities.slice(0, INITIAL_VISIBLE_COUNT).map((r) => (
              <li key={r.id} className='flex gap-2.5 items-start'>
                <span className='text-accent mt-1 flex-none text-[10px] font-mono'>
                  ▸
                </span>
                <p className='text-sm text-body leading-relaxed'>
                  {r.responsibility}
                </p>
              </li>
            ))}
          </ul>

          <AnimatePresence initial={false}>
            {isExpanded && hasMore && (
              <m.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className='space-y-2 mt-2 overflow-hidden'
              >
                {responsibilities.slice(INITIAL_VISIBLE_COUNT).map((r) => (
                  <li key={r.id} className='flex gap-2.5 items-start'>
                    <span className='text-accent mt-1 flex-none text-[10px] font-mono'>
                      ▸
                    </span>
                    <p className='text-sm text-body leading-relaxed'>
                      {r.responsibility}
                    </p>
                  </li>
                ))}
              </m.ul>
            )}
          </AnimatePresence>

          {hasMore && (
            <button
              type='button'
              onClick={() => setIsExpanded((prev) => !prev)}
              className='mt-3.5 font-mono text-xs font-medium text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1'
            >
              <m.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.18 }}
                className='inline-flex items-center'
              >
                <ChevronDown size={14} />
              </m.span>
              <span>
                {isExpanded ? 'Show less' : `Show ${hiddenCount} more`}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
