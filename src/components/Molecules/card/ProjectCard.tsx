import { ArrowRight, ExternalLink, Github } from 'lucide-react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import StackPills from '@/components/Atoms/pills/StackPills';
import { Tooltip } from '@/components/Atoms/Tooltip';

import WrapperCard from './WrapperCard';

const STACKS_VISIBLE = 4;

import { IProject } from '@/types/interfaces/projects';

interface IProjectProps extends IProject {
  className?: string;
}

const ProjectCard = (props: IProjectProps) => {
  const {
    title,
    className,
    description,
    image,
    stacks,
    website,
    github,
    category,
  } = props;

  const projectUrl = website || github;
  const visibleStacks = stacks?.slice(0, STACKS_VISIBLE) ?? [];
  const hiddenStacks = stacks?.slice(STACKS_VISIBLE) ?? [];

  return (
    <WrapperCard className={cn('group h-full flex flex-col', className)}>
      {/* Accent gradient top border */}
      <div className='h-1 w-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 flex-shrink-0' />

      {/* Clickable image area */}
      <a
        href={projectUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='relative block flex-shrink-0'
        aria-label={`Open ${title}`}
      >
        <NextImage
          className='w-full aspect-video'
          src={`/images/project/${image}.png`}
          alt={title}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          fill
          style={{ objectFit: 'cover' }}
          useSkeleton
        />

        {/* Category badge */}
        {category && (
          <span
            className={cn(
              'absolute top-3 left-3 z-10',
              'text-xs font-semibold tracking-wide',
              'bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm',
              'text-primary-600 dark:text-primary-400',
              'rounded-full px-2.5 py-0.5 border border-primary-200 dark:border-primary-800/50',
            )}
          >
            {category}
          </span>
        )}

        {/* Hover overlay — gradient from bottom */}
        <div
          className={cn(
            'absolute inset-0 flex items-end justify-center pb-5',
            'bg-gradient-to-t from-primary-900/75 via-primary-900/20 to-transparent',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          )}
        >
          <span className='flex items-center gap-1.5 text-white text-sm font-medium'>
            View Project
            <ArrowRight size={14} />
          </span>
        </div>
      </a>

      {/* Content */}
      <div className='p-4 flex flex-col flex-1'>
        <a
          href={projectUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='font-bold text-lg leading-snug group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-1'
        >
          {title}
        </a>

        <p className='text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2 flex-1'>
          {description}
        </p>

        {/* Footer: stacks + action icons */}
        <div
          className={cn(
            'mt-4 pt-3 flex items-center justify-between gap-2',
            'border-t border-slate-200 dark:border-zinc-700/40',
          )}
        >
          <div className='flex flex-wrap gap-1.5 flex-1 min-w-0'>
            {visibleStacks.map((data) => (
              <StackPills key={data} name={data} />
            ))}
            {hiddenStacks.length > 0 && (
              <Tooltip
                content={
                  <span className='flex flex-col gap-0.5'>
                    {hiddenStacks.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </span>
                }
              >
                <div
                  className={cn(
                    'flex items-center justify-center w-7 h-7 rounded-full',
                    'border border-slate-300 dark:border-zinc-700/40',
                    'bg-white dark:bg-slate-700/50 shadow-sm cursor-default',
                    'text-xs font-semibold text-slate-500 dark:text-slate-400',
                    'hover:border-primary-400 dark:hover:border-primary-500',
                    'hover:bg-primary-50 dark:hover:bg-primary-900/20',
                    'transition-colors duration-200',
                  )}
                >
                  +{hiddenStacks.length}
                </div>
              </Tooltip>
            )}
          </div>

          <div className='flex gap-2 flex-shrink-0'>
            {github && (
              <a
                href={github}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub repository'
                className='text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200'
              >
                <Github size={16} />
              </a>
            )}
            {website && (
              <a
                href={website}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Live website'
                className='text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200'
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </WrapperCard>
  );
};

export default ProjectCard;
