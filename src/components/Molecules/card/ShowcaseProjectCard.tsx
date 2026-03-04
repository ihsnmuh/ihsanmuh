import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import StackPills from '@/components/Atoms/pills/StackPills';
import { Tooltip } from '@/components/Atoms/Tooltip';

import { IProject } from '@/types/interfaces/projects';

const STACKS_VISIBLE = 5;

const ShowcaseProjectCard = (props: IProject) => {
  const { title, image, category, description, stacks, github, website } =
    props;

  const projectUrl = website || github;
  const visibleStacks = stacks?.slice(0, STACKS_VISIBLE) ?? [];
  const hiddenStacks = stacks?.slice(STACKS_VISIBLE) ?? [];

  return (
    <article
      className={cn(
        'group flex flex-col h-full',
        'rounded-xl overflow-hidden',
        'border border-gray-200/80 dark:border-gray-700/40',
        'bg-white dark:bg-slate-800/30',
        'transition-all duration-300 ease-out',
        'hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20',
        'hover:border-gray-300 dark:hover:border-gray-600',
      )}
    >
      <a
        href={projectUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='relative block overflow-hidden'
        aria-label={`Open ${title}`}
      >
        <div className='relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800'>
          <NextImage
            className='w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]'
            src={`/images/project/${image}.png`}
            alt={title}
            sizes='(max-width: 768px) 100vw, 50vw'
            fill
            style={{ objectFit: 'cover' }}
            useSkeleton
          />
          <div
            className={cn(
              'absolute inset-0',
              'bg-gradient-to-t from-black/40 via-black/5 to-transparent',
              'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            )}
          />
          <div
            className={cn(
              'absolute bottom-4 right-4',
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full',
              'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm',
              'text-xs font-medium text-gray-700 dark:text-gray-200',
              'opacity-0 translate-y-2',
              'transition-all duration-300',
              'group-hover:opacity-100 group-hover:translate-y-0',
            )}
          >
            View Project
            <ArrowUpRight className='h-3 w-3' />
          </div>
        </div>

        {category && (
          <span
            className={cn(
              'absolute top-3 left-3',
              'px-2.5 py-1 rounded-full',
              'text-[10px] font-semibold uppercase tracking-[0.12em]',
              'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm',
              'text-gray-600 dark:text-gray-300',
              'border border-white/20 dark:border-gray-700/50',
            )}
          >
            {category}
          </span>
        )}
      </a>

      <div className='flex flex-col flex-1 p-5 sm:p-6'>
        <a
          href={projectUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='block'
        >
          <h3
            className={cn(
              'font-secondary font-bold text-lg sm:text-xl',
              'leading-snug tracking-tight',
              'text-gray-900 dark:text-gray-50',
              'line-clamp-1',
              'transition-colors duration-200',
              'group-hover:text-primary-600 dark:group-hover:text-primary-400',
            )}
          >
            {title}
          </h3>
        </a>

        <p
          className={cn(
            'mt-2 text-sm leading-relaxed',
            'text-gray-500 dark:text-gray-400',
            'line-clamp-3',
            'flex-1',
          )}
        >
          {description}
        </p>

        <div
          className={cn(
            'mt-4 pt-4',
            'border-t border-gray-100 dark:border-gray-700/40',
            'flex items-center justify-between gap-3',
          )}
        >
          <div className='flex flex-wrap gap-1.5 min-w-0'>
            {visibleStacks.map((stack) => (
              <StackPills key={stack} name={stack} />
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

          <div className='flex items-center gap-2 shrink-0'>
            {github && (
              <a
                href={github}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub repository'
                className={cn(
                  'p-1.5 rounded-md',
                  'text-gray-400 dark:text-gray-500',
                  'hover:text-primary-600 dark:hover:text-primary-400',
                  'hover:bg-gray-100 dark:hover:bg-gray-700/50',
                  'transition-colors duration-200',
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className='h-4 w-4' />
              </a>
            )}
            {website && (
              <a
                href={website}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Live website'
                className={cn(
                  'p-1.5 rounded-md',
                  'text-gray-400 dark:text-gray-500',
                  'hover:text-primary-600 dark:hover:text-primary-400',
                  'hover:bg-gray-100 dark:hover:bg-gray-700/50',
                  'transition-colors duration-200',
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className='h-4 w-4' />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ShowcaseProjectCard;
