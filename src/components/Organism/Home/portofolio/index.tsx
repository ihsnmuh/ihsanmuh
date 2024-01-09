import { useQuery } from '@tanstack/react-query';

import { cn } from '@/lib/utils';

import Title from '@/components/atoms/title';
import ProjectCard from '@/components/molecules/card/ProjectCard';

import { queryProjectList } from '@/queries/projectList';

const Portofolio = () => {
  //* fetching list type filter
  const { data } = useQuery({
    ...queryProjectList(),
  });

  return (
    <section className='background mb-8'>
      <div className='layout'>
        <Title title='Portofolio' />
        <div className={cn('flex flex-col md:flex-row my-8 gap-6')}>
          {data
            ?.slice(0, 3)
            .map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                image={project.image}
                category={project.category}
                description={project.description}
                stack={project.stack}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Portofolio;
