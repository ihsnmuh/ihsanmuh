import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';

import UnstyledLink from '@/components/Atoms/links/UnstyledLink';
import ScrollReveal from '@/components/Atoms/ScrollReveal';
import ProjectCard from '@/components/Molecules/card/ProjectCard';

import { queryProjectList } from '@/queries/projectList';

const Portofolio = () => {
  const { data, isLoading } = useQuery({
    ...queryProjectList({ limit: 3, order: 'desc' }),
  });

  const flagshipProject = data?.[0];
  const secondaryProjects = data?.slice(1, 3) ?? [];

  return (
    <section className='text-body'>
      <ScrollReveal className='flex items-end justify-between mb-8 gap-4'>
        <div>
          <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-2'>
            Selected Work
          </p>
          <h2 className='font-primary font-semibold text-2xl sm:text-3xl text-ink tracking-tight'>
            Featured Projects
          </h2>
        </div>

        <UnstyledLink
          href='/project'
          className='inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors group shrink-0'
        >
          <span>All projects</span>
          <ArrowRight
            size={15}
            className='group-hover:translate-x-0.5 transition-transform'
          />
        </UnstyledLink>
      </ScrollReveal>

      {isLoading && !flagshipProject ? (
        <div className='space-y-5'>
          <div className='h-72 rounded-xl border border-hairline bg-subtle/60 animate-pulse' />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='h-64 rounded-xl border border-hairline bg-subtle/60 animate-pulse' />
            <div className='h-64 rounded-xl border border-hairline bg-subtle/60 animate-pulse' />
          </div>
        </div>
      ) : flagshipProject ? (
        <div className='space-y-5'>
          <ScrollReveal delay={40}>
            <ProjectCard
              title={flagshipProject.title}
              image={flagshipProject.image}
              category={flagshipProject.category}
              description={flagshipProject.description}
              stacks={flagshipProject.stacks}
              github={flagshipProject.github}
              website={flagshipProject.website}
              isFeatured={true}
            />
          </ScrollReveal>

          {secondaryProjects.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {secondaryProjects.map((project, index) => (
                <ScrollReveal key={project.title} delay={100 + index * 60}>
                  <ProjectCard
                    title={project.title}
                    image={project.image}
                    category={project.category}
                    description={project.description}
                    stacks={project.stacks}
                    github={project.github}
                    website={project.website}
                    isFeatured={false}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
};

export default Portofolio;
