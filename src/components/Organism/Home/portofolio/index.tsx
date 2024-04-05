import { useQuery } from '@tanstack/react-query';

import { cn } from '@/lib/utils';

import ArrowLink from '@/components/atoms/links/ArrowLink';
import UnstyledLink from '@/components/atoms/links/UnstyledLink';
import Title from '@/components/atoms/title';
import ProjectCard from '@/components/molecules/card/ProjectCard';

import { queryProjectList } from '@/queries/projectList';

const Portofolio = () => {
  //* fetching list type filter
  const { data } = useQuery({
    ...queryProjectList({ limit: 3 }),
  });

  return (
    <section className='background mb-10'>
      <div className='layout'>
        <div className='flex justify-between'>
          <Title title='Portofolio' />
          <ArrowLink
            as={UnstyledLink}
            className='inline-flex items-center'
            href='/project'
          >
            View All Portofolio
          </ArrowLink>
        </div>
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-10',
          )}
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
      </div>
    </section>
  );
};

export default Portofolio;
