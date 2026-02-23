import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import ShowcaseProjectCard from '@/components/Molecules/card/ShowcaseProjectCard';

import { queryProjectList } from '@/queries/projectList';
import Title from '@/components/Atoms/title';

const ALL_CATEGORY = 'All';

const ProjectContainer = () => {
  const show = LoaderView();
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const { data } = useQuery({
    ...queryProjectList({ limit: 100 }),
  });

  const categories = useMemo(() => {
    if (!data) return [ALL_CATEGORY];
    const unique = [...new Set(data.map((p) => p.category).filter(Boolean))];
    return [ALL_CATEGORY, ...unique];
  }, [data]);

  const filteredProjects = useMemo(() => {
    if (!data) return [];
    if (activeCategory === ALL_CATEGORY) return data;
    return data.filter((p) => p.category === activeCategory);
  }, [data, activeCategory]);

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

      {categories.length > 2 && (
        <div className='mt-8 flex flex-wrap gap-2' data-fade='2'>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-medium',
                'border transition-all duration-200',
                activeCategory === cat
                  ? cn(
                      'bg-primary-500 dark:bg-primary-500',
                      'text-white border-primary-500',
                    )
                  : cn(
                      'bg-transparent',
                      'text-gray-500 dark:text-gray-400',
                      'border-gray-200 dark:border-gray-700',
                      'hover:border-gray-400 dark:hover:border-gray-500',
                      'hover:text-gray-700 dark:hover:text-gray-300',
                    ),
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className='min-h-[320px] mt-8' data-fade='3'>
        {filteredProjects.length > 0 ? (
          <>
            {activeCategory !== ALL_CATEGORY && (
              <div className='mb-6 flex items-center gap-3'>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                  {filteredProjects.length} project
                  {filteredProjects.length !== 1 ? 's' : ''} in{' '}
                  <span className='font-medium text-gray-700 dark:text-gray-300'>
                    {activeCategory}
                  </span>
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
              No projects in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectContainer;
