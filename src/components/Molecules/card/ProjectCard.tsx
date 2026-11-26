import { ArrowUpRight, Github } from 'lucide-react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import StackPills from '@/components/Atoms/pills/StackPills';
import { Tooltip } from '@/components/Atoms/Tooltip';

import WrapperCard from './WrapperCard';

import { IProject } from '@/types/interfaces/projects';

const STACKS_VISIBLE = 3;
const STACKS_VISIBLE_FEATURED = 4;

interface IProjectProps extends IProject {
  className?: string;
  isFeatured?: boolean;
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
    isFeatured,
  } = props;

  const projectUrl = website || github;
  const maxStacks = isFeatured ? STACKS_VISIBLE_FEATURED : STACKS_VISIBLE;
  const visibleStacks = stacks?.slice(0, maxStacks) ?? [];
  const hiddenStacks = stacks?.slice(maxStacks) ?? [];

  return (
    <WrapperCard
      className={cn(
        'group h-full flex overflow-hidden bg-surface text-ink',
        'border border-hairline-strong/80 dark:border-hairline rounded-lg hover:border-hairline-strong [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]',
        'shadow-[0_1px_2px_rgba(24,24,27,0.05)] hover:shadow-[0_8px_24px_-12px_rgba(24,24,27,0.12)] dark:shadow-none',
        isFeatured ? 'flex-col md:flex-row' : 'flex-col',
        className,
      )}
    >
      <a
        href={projectUrl}
        target='_blank'
        rel='noopener noreferrer'
        className={cn(
          'relative block overflow-hidden bg-subtle shrink-0',
          isFeatured
            ? 'md:w-[48%] p-3 pb-0 md:pb-3 md:pr-0 border-b md:border-b-0 md:border-r border-hairline'
            : 'p-3 pb-0 border-b border-hairline',
        )}
        aria-label={`Open ${title}`}
      >
        <div
          className={cn(
            'relative w-full overflow-hidden border border-hairline bg-surface',
            isFeatured
              ? 'aspect-video md:h-full md:aspect-auto min-h-[220px] rounded-t-md md:rounded-tr-none md:rounded-l-md border-b-0 md:border-b md:border-r-0'
              : 'aspect-video rounded-t-md border-b-0',
          )}
        >
          <NextImage
            className='w-full h-full'
            classNames={{
              image:
                'transition-transform duration-500 ease-out group-hover:scale-[1.03]',
            }}
            src={`/images/project/${image}.png`}
            alt={title}
            sizes='(max-width: 768px) 100vw, 400px'
            fill
            style={{ objectFit: 'cover' }}
            useSkeleton
          />
        </div>
      </a>

      <div className='flex flex-col flex-1 min-w-0'>
        <div className='p-5 sm:p-6 flex-1'>
          <div className='flex items-center justify-between gap-2 mb-2.5'>
            <div className='flex items-center gap-2'>
              {category && (
                <span className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium'>
                  {category}
                </span>
              )}
              {isFeatured && (
                <span className='px-2 py-0.5 rounded-full bg-accent-soft border border-accent/20 text-accent text-[10px] font-mono font-medium'>
                  Featured
                </span>
              )}
            </div>

            <div className='flex items-center gap-1.5 text-muted'>
              {github && (
                <a
                  href={github}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`${title} GitHub repository`}
                  className='p-1.5 rounded-md border border-hairline bg-subtle/40 hover:text-accent hover:border-hairline-strong hover:bg-subtle transition-colors duration-150'
                >
                  <Github size={14} />
                </a>
              )}
              {website && (
                <a
                  href={website}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`${title} live website`}
                  className='p-1.5 rounded-md border border-hairline bg-subtle/40 hover:text-accent hover:border-hairline-strong hover:bg-subtle transition-colors duration-150'
                >
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>

          <a
            href={projectUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 font-primary text-lg sm:text-xl font-semibold tracking-tight text-ink group-hover:text-accent transition-colors duration-150 leading-snug'
          >
            <span className='line-clamp-1'>{title}</span>
          </a>

          <p className='text-body text-sm mt-2 line-clamp-3 leading-relaxed'>
            {description}
          </p>
        </div>

        <div className='px-4 sm:px-5 py-2.5 border-t border-hairline bg-subtle/75 flex items-center flex-wrap gap-1.5'>
          {visibleStacks.map((data) => (
            <StackPills key={data} name={data} />
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
      </div>
    </WrapperCard>
  );
};

export default ProjectCard;
