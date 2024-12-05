import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import StackPills from '@/components/Atoms/pills/StackPills';

import WrapperCard from './WrapperCard';

import { IProject } from '@/types/interfaces/projects';

interface IProjectProps extends IProject {
  className?: string;
}

const ProjectCard = (props: IProjectProps) => {
  const { title, className, description, image, stacks, website, github } =
    props;

  return (
    <Link href={website ? website : github}>
      <WrapperCard className={cn('group h-full', className)}>
        <div className='relative'>
          <NextImage
            className='w-full aspect-video'
            src={`/images/project/${image}.png`}
            alt={title}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            fill
            style={{
              objectFit: 'cover',
            }}
            useSkeleton
          />
          <div
            className={cn(
              'rounded-t-lg text-sm font-medium',
              'flex justify-center items-center gap-1 absolute top-0 left-0 w-full h-full',
              'bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300',
              'text-white text-sm',
            )}
          >
            <span>View Project</span>
            <ArrowRight size={16} />
          </div>
        </div>
        <div className='p-4'>
          <p className='font-bold text-lg'>{title}</p>
          <p className='text-pretty text-sm mt-3'>{description}</p>
          <div className='flex flex-wrap mt-4 gap-2'>
            {stacks?.map((data) => <StackPills key={data} name={data} />)}
          </div>
        </div>
      </WrapperCard>
    </Link>
  );
};

export default ProjectCard;
