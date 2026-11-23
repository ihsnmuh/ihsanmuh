import { motion } from 'motion/react';
import React, { useEffect, useId, useRef } from 'react';

import { cn } from '@/lib/utils';

import { SPRING_SNAPPY } from '@/components/Atoms/Motion';

export type FilterItem = string | { name: string; count?: number };

interface SearchFilterProps extends React.ComponentPropsWithoutRef<'div'> {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  activeFilter: string;
  onFilterChange: (value: string) => void;
  filters: FilterItem[];
  filterLabel?: string;
}

const SearchFilter = ({
  search,
  onSearchChange,
  searchPlaceholder = 'Search...',
  activeFilter,
  onFilterChange,
  filters,
  filterLabel = 'Filter:',
  className,
  ...rest
}: SearchFilterProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const pillGroupId = useId();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        const activeEl = document.activeElement;
        const isInput =
          activeEl?.tagName === 'INPUT' ||
          activeEl?.tagName === 'TEXTAREA' ||
          activeEl?.getAttribute('contenteditable') === 'true';

        if (!isInput) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={cn('space-y-4', className)} {...rest}>
      <div className='relative max-w-md'>
        <input
          id='search-filter-input'
          ref={inputRef}
          className={cn(
            'w-full py-2.5 pl-9 pr-12',
            'rounded-md border border-hairline',
            'bg-surface text-ink',
            'placeholder:text-muted font-primary',
            'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-hairline-strong',
            'transition-colors duration-150',
            'text-sm',
          )}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          type='text'
          placeholder={searchPlaceholder}
          aria-label='Search input'
        />
        <svg
          className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.75}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
        {!search && (
          <kbd className='absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 rounded border border-hairline bg-subtle text-[10px] font-mono text-muted pointer-events-none select-none'>
            /
          </kbd>
        )}
        {search && (
          <button
            type='button'
            onClick={() => onSearchChange('')}
            className='absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink focus:outline-none rounded p-0.5 transition-colors'
            aria-label='Clear search'
          >
            <svg
              className='w-3.5 h-3.5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
      </div>

      {filters.length > 1 && (
        <div className='flex flex-wrap gap-2 items-center'>
          {filterLabel && (
            <span className='text-[11px] font-mono uppercase tracking-wider text-muted mr-1 hidden sm:inline'>
              {filterLabel}
            </span>
          )}
          <div className='flex flex-wrap gap-1.5'>
            {filters.map((filter) => {
              const name = typeof filter === 'string' ? filter : filter.name;
              const count =
                typeof filter === 'string' ? undefined : filter.count;
              const isActive = activeFilter === name;

              return (
                <button
                  type='button'
                  key={name}
                  onClick={() => onFilterChange(name)}
                  className={cn(
                    'relative px-3 py-1 rounded-full text-xs font-mono select-none',
                    'border transition-colors duration-150',
                    isActive
                      ? 'text-cta-fg border-transparent font-medium'
                      : 'bg-surface text-body border-hairline hover:bg-subtle hover:text-ink',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`active-filter-${pillGroupId}`}
                      transition={SPRING_SNAPPY}
                      className='absolute inset-0 rounded-full bg-cta'
                    />
                  )}
                  <span className='relative z-10'>
                    {name}
                    {count !== undefined && (
                      <span
                        className={cn(
                          'ml-1 text-[10px] opacity-80 font-mono',
                          isActive ? 'text-cta-fg' : 'text-muted',
                        )}
                      >
                        ({count})
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
