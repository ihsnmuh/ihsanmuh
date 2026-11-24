import { ArrowUpRight, Github } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import StackPills from '@/components/Atoms/pills/StackPills';
import { Tooltip } from '@/components/Atoms/Tooltip';

import { IProject } from '@/types/interfaces/projects';

const STACKS_VISIBLE = 3;

const ShowcaseProjectCard = (props: IProject) => {
  const { title, image, category, description, stacks, github, website } =
    props;

  const projectUrl = website || github;
  const visibleStacks = stacks?.slice(0, STACKS_VISIBLE) ?? [];
  const hiddenStacks = stacks?.slice(STACKS_VISIBLE) ?? [];

  return (
    <article
      className={cn(
        'group relative flex flex-col h-full',
        'rounded-lg overflow-hidden',
        'border border-hairline-strong/80 dark:border-hairline hover:border-hairline-strong hover:-translate-y-0.5',
        'shadow-[0_1px_2px_rgba(24,24,27,0.05)] hover:shadow-[0_8px_24px_-12px_rgba(24,24,27,0.12)] dark:shadow-none',
        'bg-surface text-ink',
        'transition-all duration-200',
      )}
    >
      <a
        href={projectUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='relative block p-3 pb-0 overflow-hidden border-b border-hairline bg-subtle'
        aria-label={`Open ${title}`}
      >
        <div className='relative aspect-[16/9] overflow-hidden rounded-t-md border border-b-0 border-hairline bg-surface'>
          <NextImage
            className='w-full h-full'
            classNames={{
              image:
                'transition-transform duration-500 ease-out group-hover:scale-[1.03]',
            }}
            src={`/images/project/${image}.png`}
            alt={title}
            sizes='(max-width: 768px) 100vw, 420px'
            fill
            style={{ objectFit: 'cover' }}
            useSkeleton
          />
        </div>
      </a>

      <div className='flex flex-col flex-1 p-5 sm:p-6'>
        <div className='flex items-center justify-between gap-2 mb-2.5'>
          {category ? (
            <span className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium'>
              {category}
            </span>
          ) : (
            <span />
          )}

          <div className='flex items-center gap-1.5 text-muted'>
            {github && (
              <a
                href={github}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`${title} GitHub repository`}
                className='p-1.5 rounded-md border border-hairline bg-subtle/40 hover:text-accent hover:border-hairline-strong hover:bg-subtle transition-colors duration-150'
                onClick={(e) => e.stopPropagation()}
              >
                <Github className='h-3.5 w-3.5' />
              </a>
            )}
            {website && (
              <a
                href={website}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`${title} live website`}
                className='p-1.5 rounded-md border border-hairline bg-subtle/40 hover:text-accent hover:border-hairline-strong hover:bg-subtle transition-colors duration-150'
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight className='h-3.5 w-3.5' />
              </a>
            )}
          </div>
        </div>

        <a
          href={projectUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='block'
        >
          <h3 className='font-primary font-semibold text-lg sm:text-xl tracking-tight leading-snug text-ink line-clamp-1 group-hover:text-accent transition-colors duration-150'>
            {title}
          </h3>
        </a>

        <p className='mt-2 text-sm leading-relaxed text-body line-clamp-3'>
          {description}
        </p>
      </div>

      <div className='px-4 sm:px-5 py-2.5 border-t border-hairline bg-subtle/75 flex items-center flex-wrap gap-1.5'>
        {visibleStacks.map((stack) => (
          <StackPills key={stack} name={stack} />
        ))}
        {hiddenStacks.length > 0 && (
          <Tooltip
            content={
              <span className='flex flex-col gap-0.5 font-mono text-xs'>
                {hiddenStacks.map((s) => (
                  <span key={s}>
                    {s === 'ReactQuery' ? 'TanStack Query' : s}
                  </span>
                ))}
              </span>
            }
          >
            <span className='inline-flex items-center px-2.5 py-1 rounded-md border border-hairline bg-surface text-[11px] font-mono text-muted leading-none cursor-default'>
              +{hiddenStacks.length}
            </span>
          </Tooltip>
        )}
      </div>
    </article>
  );
};

export default ShowcaseProjectCard;
