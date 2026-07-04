import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import Title from '@/components/Atoms/title';
import ShowcaseProjectCard from '@/components/Molecules/card/ShowcaseProjectCard';
import SearchFilter from '@/components/Molecules/SearchFilter';

import { queryProjectList } from '@/queries/projectList';

const ALL_CATEGORY = 'All';

const ProjectContainer = () => {
  const show = LoaderView();
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [search, _setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { data } = useQuery({
    ...queryProjectList({ limit: 100 }),
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Compute categories with counts
  const categoriesWithCounts = useMemo(() => {
    if (!data) return [{ name: ALL_CATEGORY, count: 0 }];

    const counts: Record<string, number> = {};
    data.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });

    const uniqueCategories = Object.keys(counts).sort();
    return [
      { name: ALL_CATEGORY, count: data.length },
      ...uniqueCategories.map((cat) => ({
        name: cat,
        count: counts[cat] || 0,
      })),
    ];
  }, [data]);

  // Filter projects by active category and search term
  const filteredProjects = useMemo(() => {
    if (!data) return [];
    let result = data;

    if (activeCategory !== ALL_CATEGORY) {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(searchLower);
        const descMatch = p.description?.toLowerCase().includes(searchLower);
        const stackMatch = p.stacks?.some((s) =>
          s.toLowerCase().includes(searchLower),
        );
        return titleMatch || descMatch || stackMatch;
      });
    }

    return result;
  }, [data, activeCategory, debouncedSearch]);

  return (
    <section className={cn('layout py-20', show && 'fade-in-start')}>
      <div className='mt-10 max-w-3xl' data-fade='1'>
        <p
          className={cn(
            'text-[11px] font-semibold uppercase tracking-[0.2em]',
            'text-primary-500 dark:text-primary-400',
            'mb-3',
          )}
        >
          Portfolio
        </p>
        <Title title='Projects' />
        <p
          className={cn(
            'mt-4 text-base md:text-lg leading-relaxed',
            'text-gray-500 dark:text-gray-400',
            'max-w-2xl',
          )}
        >
          Real work over ideas. A selection of projects I&apos;ve shipped—from
          AI-powered products to internal tools and experiments.
        </p>
      </div>

      <SearchFilter
        data-fade='2'
        className='mt-8'
        search={search}
        onSearchChange={_setSearch}
        searchPlaceholder='Search projects by title, stack, or description...'
        activeFilter={activeCategory}
        onFilterChange={setActiveCategory}
        filters={categoriesWithCounts}
        filterLabel='Filter by:'
      />

      <div className='min-h-[320px] mt-8' data-fade='3'>
        {filteredProjects.length > 0 ? (
          <>
            {/* Search/Filter stats description banner */}
            {(search || activeCategory !== ALL_CATEGORY) && (
              <div className='mb-6 flex items-center gap-3'>
                <span className='text-xs sm:text-sm text-slate-500 dark:text-slate-400'>
                  Found {filteredProjects.length} project
                  {filteredProjects.length !== 1 ? 's' : ''}{' '}
                  {activeCategory !== ALL_CATEGORY && (
                    <span>
                      in{' '}
                      <span className='font-semibold text-primary-500 dark:text-primary-400'>
                        {activeCategory}
                      </span>
                    </span>
                  )}
                  {search && (
                    <span>
                      {' '}
                      matching &ldquo;
                      <span className='font-semibold text-slate-850 dark:text-slate-200'>
                        {search}
                      </span>
                      &rdquo;
                    </span>
                  )}
                </span>
                <div className='h-px flex-1 bg-gray-200 dark:bg-gray-700/60' />
              </div>
            )}

            <div
              className={cn('grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8')}
            >
              {filteredProjects.map((project) => (
                <ShowcaseProjectCard key={project.title} {...project} />
              ))}
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center text-center py-20'>
            <div className='w-16 h-px mb-6 bg-gray-200 dark:bg-gray-700' />
            <p className='font-secondary text-lg font-semibold text-gray-400 dark:text-gray-500'>
              No projects found
            </p>
            <p className='text-sm text-gray-400 dark:text-gray-500 mt-1.5'>
              {search
                ? `No results for "${search}". Try different keywords.`
                : 'No projects in this category yet.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectContainer;
