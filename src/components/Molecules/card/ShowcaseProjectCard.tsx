import { ArrowUpRight, Github } from 'lucide-react';
import React from 'react';

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
        'group relative flex flex-col h-full',
        'rounded-lg overflow-hidden',
        'border border-hairline hover:border-hairline-strong hover:-translate-y-0.5',
        'bg-surface text-ink',
        'transition-all duration-200',
      )}
    >
      <a
        href={projectUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='relative block overflow-hidden border-b border-hairline bg-subtle'
        aria-label={`Open ${title}`}
      >
        <div className='relative aspect-[16/9] overflow-hidden'>
          <NextImage
            className='w-full h-full'
            classNames={{
              image:
                'transition-transform duration-500 ease-out group-hover:scale-[1.03]',
            }}
            src={`/images/project/${image}.png`}
            alt={title}
            sizes='(max-width: 768px) 100vw, 50vw'
            fill
            style={{ objectFit: 'cover' }}
            useSkeleton
          />
        </div>
      </a>

      <div className='flex flex-col flex-1 p-5 sm:p-6'>
        <div className='flex items-center justify-between gap-2 mb-2'>
          {category ? (
            <span className='font-mono text-[11px] uppercase tracking-wider text-muted'>
              {category}
            </span>
          ) : (
            <span />
          )}

          <div className='flex items-center gap-1 text-muted'>
            {github && (
              <a
                href={github}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub repository'
                className='p-1.5 rounded-md hover:text-ink hover:bg-subtle transition-colors duration-150'
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
                className='p-1.5 rounded-md hover:text-ink hover:bg-subtle transition-colors duration-150'
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight className='h-4 w-4' />
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

        <p className='mt-2 text-sm leading-relaxed text-body line-clamp-3 flex-1'>
          {description}
        </p>

        <div className='mt-5 pt-4 border-t border-hairline/70 flex flex-wrap gap-1.5'>
          {visibleStacks.map((stack) => (
            <StackPills key={stack} name={stack} />
          ))}
          {hiddenStacks.length > 0 && (
            <Tooltip
              content={
                <span className='flex flex-col gap-0.5 font-mono text-xs'>
                  {hiddenStacks.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </span>
              }
            >
              <div className='flex items-center justify-center px-2 py-0.5 rounded-full border border-hairline bg-subtle text-[10px] font-mono text-muted'>
                +{hiddenStacks.length}
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </article>
  );
};

export default ShowcaseProjectCard;
