import { format } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { LikeButtonStats } from '@/components/Molecules/blog/LikeButton';
import { ViewCounterStats } from '@/components/Molecules/blog/ViewCounter';

import { usePostStats } from '@/helpers/usePostStats';

import { IPost } from '@/types/interfaces/posts';

const EditorialPostCard = (props: IPost) => {
  const {
    slug,
    title,
    tags,
    timeReading,
    publishedAt,
    description,
    views: initialViews,
    likes: initialLikes,
  } = props;

  const { views, likes, isLoading } = usePostStats(slug, {
    initialViews,
    initialLikes,
  });
  const date = publishedAt ? format(new Date(publishedAt), 'MMM dd, yyyy') : '';

  return (
    <Link href={`/blog/${slug}`} prefetch={false} className='group block'>
      <article
        className={cn(
          'py-5 sm:py-6 -mx-3 px-3 rounded-lg',
          'transition-colors duration-150 hover:bg-subtle/60',
        )}
      >
        <div className='flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-6'>
          <h3 className='font-primary text-base sm:text-lg font-semibold tracking-tight text-ink group-hover:text-accent transition-colors duration-150 leading-snug'>
            {title}
          </h3>
          <div className='flex items-center gap-2 shrink-0 font-mono text-xs text-muted tabular-nums'>
            {date && <time dateTime={publishedAt}>{date}</time>}
            <ArrowUpRight
              size={14}
              className='hidden sm:inline-block opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent'
            />
          </div>
        </div>

        {description && (
          <p className='mt-1.5 text-sm text-body line-clamp-2 leading-relaxed max-w-2xl'>
            {description}
          </p>
        )}

        <div className='mt-3 flex items-center justify-between gap-3 flex-wrap text-xs font-mono text-muted'>
          <div className='flex items-center gap-2 flex-wrap'>
            {timeReading && <span>{timeReading}</span>}
            {tags?.length > 0 && (
              <>
                {timeReading && <span aria-hidden='true'>·</span>}
                <div className='flex items-center gap-1.5'>
                  {tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className='px-2 py-0.5 rounded-full bg-subtle border border-hairline text-[11px] text-body'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className='flex items-center gap-3 tabular-nums'>
            {isLoading ? (
              <div className='flex items-center gap-2'>
                <span className='h-3 w-8 animate-pulse rounded bg-subtle' />
                <span className='h-3 w-8 animate-pulse rounded bg-subtle' />
              </div>
            ) : (
              <>
                <ViewCounterStats
                  views={views}
                  showIcon
                  className='text-[11px]'
                />
                <LikeButtonStats
                  likes={likes}
                  showIcon
                  className='text-[11px]'
                />
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EditorialPostCard;
