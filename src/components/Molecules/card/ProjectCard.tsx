import { ArrowUpRight, Github } from 'lucide-react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import StackPills from '@/components/Atoms/pills/StackPills';
import { Tooltip } from '@/components/Atoms/Tooltip';

import WrapperCard from './WrapperCard';

import { IProject } from '@/types/interfaces/projects';

const STACKS_VISIBLE = 4;

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
  const visibleStacks = stacks?.slice(0, STACKS_VISIBLE) ?? [];
  const hiddenStacks = stacks?.slice(STACKS_VISIBLE) ?? [];

  return (
    <WrapperCard
      className={cn(
        'group h-full flex overflow-hidden bg-surface text-ink',
        'border border-hairline rounded-lg hover:border-hairline-strong hover:-translate-y-0.5 transition-all duration-200',
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
            ? 'md:w-[48%] border-b md:border-b-0 md:border-r border-hairline'
            : 'border-b border-hairline',
        )}
        aria-label={`Open ${title}`}
      >
        <div
          className={cn(
            'relative w-full overflow-hidden',
            isFeatured
              ? 'aspect-video md:h-full md:aspect-auto min-h-[220px]'
              : 'aspect-video',
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
            sizes={
              isFeatured
                ? '(max-width: 768px) 100vw, 50vw'
                : '(max-width: 768px) 100vw, 45vw'
            }
            fill
            style={{ objectFit: 'cover' }}
            useSkeleton
          />
        </div>
      </a>

      <div className='p-5 sm:p-6 flex flex-col flex-1 justify-between'>
        <div>
          <div className='flex items-center justify-between gap-2 mb-2.5'>
            <div className='flex items-center gap-2'>
              {category && (
                <span className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                  {category}
                </span>
              )}
              {isFeatured && (
                <span className='px-2 py-0.5 rounded-full bg-accent-soft text-accent text-[10px] font-mono font-medium'>
                  Featured
                </span>
              )}
            </div>

            <div className='flex items-center gap-1 text-muted'>
              {github && (
                <a
                  href={github}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='GitHub repository'
                  className='hover:text-ink hover:bg-subtle transition-colors duration-150 p-1.5 rounded-md'
                >
                  <Github size={15} />
                </a>
              )}
              {website && (
                <a
                  href={website}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Live website'
                  className='hover:text-ink hover:bg-subtle transition-colors duration-150 p-1.5 rounded-md'
                >
                  <ArrowUpRight size={15} />
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

        <div className='mt-5 pt-4 border-t border-hairline/70 flex flex-wrap gap-1.5'>
          {visibleStacks.map((data) => (
            <StackPills key={data} name={data} />
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
    </WrapperCard>
  );
};

export default ProjectCard;
