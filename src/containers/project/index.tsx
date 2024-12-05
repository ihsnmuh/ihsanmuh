import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import Title from '@/components/Atoms/title';
import ProjectCard from '@/components/Molecules/card/ProjectCard';

import { queryProjectList } from '@/queries/projectList';

const ProjectContainer = () => {
  const show = LoaderView();

  //* fetching list type filter
  const { data } = useQuery({
    ...queryProjectList({ limit: 100 }),
  });

  return (
    <section className={cn('layout py-20', show && 'fade-in-start')}>
      <div
        className={cn('flex flex-col h-fit rounded-2xl mt-10', 'max-w-2xl')}
        data-fade='1'
      >
        <Title title='Projects' />
        <p className='mt-4 font-primary text-sm md:text-base'>
          On this page, you’ll find a showcase of my projects, ideas, and
          experiences that reflect my journey in Frontend Developer. Each
          project tells a story of creativity, dedication, and the joy of
          building something meaningful. Whether it’s crafting elegant designs,
          writing clean code, or turning innovative ideas into reality, my goal
          is to inspire, connect, and create a positive impact.
        </p>
      </div>

      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-10',
        )}
        data-fade='2'
      >
        {data?.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            image={project.image}
            category={project.category}
            description={project.description}
            stacks={project.stacks}
            github={project.github}
            website={project.website}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectContainer;
