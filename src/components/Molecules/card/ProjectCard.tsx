import { cn } from '@/lib/utils';

import NextImage from '@/components/atoms/NextImage';

import { IProject } from '@/types/interfaces/projects';

interface IProjectProps extends IProject {
  className?: string;
}

const ProjectCard = (props: IProjectProps) => {
  const { title, className, description, image, stack } = props;

  return (
    <div
      className={cn(
        'w-full p-4 font-primary',
        'rounded-xl border border-slate-300 dark:border-slate-700',
        className,
      )}
    >
      <p className='font-bold'>{title}</p>
      <p className='text-pretty mt-3'>{description}</p>
      <div>{stack?.map((data) => <p>{data}</p>)}</div>
      <div className='relative rounded-lg w-full aspect-video overflow-hidden'>
        <NextImage
          src={`/images/project/${image}.png`}
          alt={title}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          fill
          style={{
            objectFit: 'cover',
          }}
        />
        di
      </div>
    </div>
  );
};

export default ProjectCard;
