import React, { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

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
  filterLabel = 'Filter by:',
  className,
  ...rest
}: SearchFilterProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
    <div className={cn('space-y-6', className)} {...rest}>
      {/* Search Input */}
      <div className='relative max-w-md'>
        <input
          id='search-filter-input'
          ref={inputRef}
          className={cn(
            'w-full py-2.5 pl-10 pr-16',
            'rounded-xl border',
            'border-slate-200 dark:border-zinc-700/50',
            'bg-slate-50/50 dark:bg-slate-800/20',
            'text-slate-900 dark:text-slate-100',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400',
            'transition-all duration-300',
            'text-sm shadow-sm',
          )}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          type='text'
          placeholder={searchPlaceholder}
          aria-label='Search input'
        />
        <svg
          className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.8}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
        {!search && (
          <kbd className='absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] font-mono text-slate-400 dark:text-slate-500 pointer-events-none select-none'>
            /
          </kbd>
        )}
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className={cn(
              'absolute right-3.5 top-1/2 -translate-y-1/2',
              'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300',
              'focus:outline-none rounded',
              'transition-colors',
            )}
            aria-label='Clear search'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
      </div>

      {/* Category/Tag Pills */}
      {filters.length > 1 && (
        <div className='flex flex-wrap gap-2 items-center'>
          {filterLabel && (
            <span className='text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1.5 hidden sm:inline'>
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
                  key={name}
                  onClick={() => onFilterChange(name)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-xs font-medium',
                    'border transition-all duration-200',
                    isActive
                      ? 'bg-primary-500 text-white border-primary-500 shadow-sm shadow-primary-500/10'
                      : cn(
                          'bg-transparent',
                          'text-gray-500 dark:text-gray-400',
                          'border-gray-200 dark:border-gray-700',
                          'hover:border-gray-400 dark:hover:border-gray-500',
                          'hover:text-gray-700 dark:hover:text-gray-300',
                        ),
                  )}
                >
                  {name}
                  {count !== undefined && (
                    <span
                      className={cn(
                        'ml-1 text-[10px] opacity-70 font-mono',
                        isActive
                          ? 'text-white'
                          : 'text-gray-400 dark:text-gray-500',
                      )}
                    >
                      {count}
                    </span>
                  )}
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
