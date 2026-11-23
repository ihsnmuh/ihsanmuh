import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import React, { useEffect, useMemo, useState } from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import {
  Reveal,
  staggerContainerVariants,
  staggerItemVariants,
} from '@/components/Atoms/Motion';
import ProjectCard from '@/components/Molecules/card/ProjectCard';
import ShowcaseProjectCard from '@/components/Molecules/card/ShowcaseProjectCard';
import SearchFilter from '@/components/Molecules/SearchFilter';

import { queryProjectList } from '@/queries/projectList';

const ALL_CATEGORY = 'All';

const ProjectContainer = () => {
  const show = LoaderView();
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { data, isLoading } = useQuery({
    ...queryProjectList({ limit: 100 }),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);
    return () => clearTimeout(timer);
  }, [search]);

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

  const isSearchingOrFiltering =
    debouncedSearch.length > 0 || activeCategory !== ALL_CATEGORY;
  const featuredProject = !isSearchingOrFiltering
    ? filteredProjects[0]
    : undefined;
  const remainingProjects = !isSearchingOrFiltering
    ? filteredProjects.slice(1)
    : filteredProjects;

  const resetFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setActiveCategory(ALL_CATEGORY);
  };

  return (
    <div className={cn('pt-2 sm:pt-4', show && 'fade-in-start')}>
      <header className='mb-10'>
        <div className='flex items-center gap-3 mb-2'>
          <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium'>
            Portfolio
          </p>
          {data && (
            <>
              <span aria-hidden='true' className='text-hairline-strong'>
                /
              </span>
              <span className='font-mono text-[11px] text-muted tabular-nums'>
                {data.length} project{data.length !== 1 ? 's' : ''}
              </span>
            </>
          )}
        </div>

        <h1 className='font-primary text-3xl sm:text-4xl font-bold tracking-tight text-ink'>
          Selected Projects
        </h1>
        <p className='mt-3 text-base leading-relaxed text-body max-w-2xl'>
          Web applications, internal tools, and UI experiments I have built and
          shipped.
        </p>
      </header>

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder='Search projects by title, stack, or description...'
        activeFilter={activeCategory}
        onFilterChange={setActiveCategory}
        filters={categoriesWithCounts}
        filterLabel='Category:'
      />

      {isSearchingOrFiltering && (
        <div className='mt-4 flex items-center justify-between gap-3 py-2 border-b border-hairline/70'>
          <p className='text-xs font-mono text-muted tabular-nums'>
            Showing {filteredProjects.length} project
            {filteredProjects.length !== 1 ? 's' : ''}{' '}
            {activeCategory !== ALL_CATEGORY && (
              <span>
                in{' '}
                <span className='font-medium text-ink'>{activeCategory}</span>
              </span>
            )}
            {search && (
              <span>
                {' '}
                matching &ldquo;
                <span className='font-medium text-ink'>{search}</span>&rdquo;
              </span>
            )}
          </p>
          <button
            type='button'
            onClick={resetFilters}
            className='text-xs font-mono text-accent hover:text-accent-hover transition-colors shrink-0'
          >
            Clear filters
          </button>
        </div>
      )}

      <div className='min-h-[320px] mt-8'>
        {isLoading ? (
          <div className='space-y-8'>
            <div className='h-64 rounded-lg border border-hairline bg-surface animate-pulse' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className='h-80 rounded-lg border border-hairline bg-surface animate-pulse'
                />
              ))}
            </div>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className='space-y-12'>
            {featuredProject && (
              <Reveal>
                <p className='font-mono text-[11px] uppercase tracking-wider text-muted mb-3'>
                  Featured Project
                </p>
                <ProjectCard {...featuredProject} isFeatured={true} />
              </Reveal>
            )}

            {remainingProjects.length > 0 && (
              <div>
                {featuredProject && (
                  <p className='font-mono text-[11px] uppercase tracking-wider text-muted mb-4'>
                    All Projects
                  </p>
                )}

                <motion.div
                  key={`${activeCategory}-${debouncedSearch}`}
                  variants={staggerContainerVariants}
                  initial='hidden'
                  animate='visible'
                  className='grid grid-cols-1 md:grid-cols-2 gap-6'
                >
                  {remainingProjects.map((project) => (
                    <motion.div
                      key={project.title}
                      variants={staggerItemVariants}
                      className='h-full'
                    >
                      <ShowcaseProjectCard {...project} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center text-center py-20 border border-hairline rounded-lg bg-surface'>
            <p className='font-primary text-base font-semibold text-ink'>
              No projects found
            </p>
            <p className='text-sm text-muted mt-1 max-w-sm'>
              {search
                ? `No results for "${search}". Try different keywords.`
                : 'No projects in this category yet.'}
            </p>
            {isSearchingOrFiltering && (
              <button
                type='button'
                onClick={resetFilters}
                className='mt-5 px-4 py-2 rounded-md text-xs font-medium bg-cta text-cta-fg hover:bg-cta-hover active:scale-[0.98] transition-all'
              >
                Reset filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectContainer;
