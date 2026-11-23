import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
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

  return (
    <div className={cn('pt-2 sm:pt-4', show && 'fade-in-start')}>
      <header data-fade='1' className='mb-10'>
        <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-2'>
          Portfolio
        </p>
        <h1 className='font-primary text-3xl sm:text-4xl font-bold tracking-tight text-ink'>
          Selected Projects
        </h1>
        <p className='mt-3 text-base leading-relaxed text-body max-w-2xl'>
          Web applications, internal tools, and UI experiments I have built and
          shipped.
        </p>
      </header>

      <SearchFilter
        data-fade='2'
        search={search}
        onSearchChange={_setSearch}
        searchPlaceholder='Search projects by title, stack, or description...'
        activeFilter={activeCategory}
        onFilterChange={setActiveCategory}
        filters={categoriesWithCounts}
        filterLabel='Category:'
      />

      <div className='min-h-[320px] mt-8' data-fade='3'>
        {filteredProjects.length > 0 ? (
          <>
            {(search || activeCategory !== ALL_CATEGORY) && (
              <div className='mb-5 flex items-center gap-3'>
                <span className='text-xs font-mono text-muted'>
                  Showing {filteredProjects.length} project
                  {filteredProjects.length !== 1 ? 's' : ''}{' '}
                  {activeCategory !== ALL_CATEGORY && (
                    <span>
                      in{' '}
                      <span className='font-medium text-ink'>
                        {activeCategory}
                      </span>
                    </span>
                  )}
                  {search && (
                    <span>
                      {' '}
                      matching &ldquo;
                      <span className='font-medium text-ink'>{search}</span>
                      &rdquo;
                    </span>
                  )}
                </span>
                <div className='h-px flex-1 bg-hairline' />
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {filteredProjects.map((project) => (
                <ShowcaseProjectCard key={project.title} {...project} />
              ))}
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center text-center py-20 border border-hairline rounded-lg bg-surface'>
            <p className='font-primary text-base font-semibold text-ink'>
              No projects found
            </p>
            <p className='text-sm text-muted mt-1'>
              {search
                ? `No results for "${search}". Try different keywords.`
                : 'No projects in this category yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectContainer;
