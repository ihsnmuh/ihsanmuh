import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import { LikeButtonStats } from '@/components/Molecules/blog/LikeButton';
import { ViewCounterStats } from '@/components/Molecules/blog/ViewCounter';

import { usePostStats } from '@/helpers/usePostStats';

import { IPost } from '@/types/interfaces/posts';

const EditorialPostCard = (props: IPost) => {
  const { slug, title, banner, tags, timeReading, publishedAt, description } =
    props;

  const { views, likes, isLoading } = usePostStats(slug);
  const date = format(new Date(publishedAt ?? ''), 'MMM dd, yyyy');

  return (
    <Link href={`/blog/${slug}`} className='group block'>
      <article
        className={cn(
          'grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-4 sm:gap-5',
          'py-5 px-1',
          'transition-all duration-300',
          'rounded-lg',
          'hover:bg-gray-50/80 dark:hover:bg-slate-800/40',
        )}
      >
        <div
          className={cn(
            'relative aspect-[4/3] overflow-hidden rounded-lg',
            'bg-gray-100 dark:bg-gray-800',
          )}
        >
          <NextImage
            className='w-full h-full'
            src={`/images/blog/${banner}`}
            alt={title}
            sizes='160px'
            fill
            style={{ objectFit: 'cover' }}
            useSkeleton
          />
          <div
            className={cn(
              'absolute inset-0 rounded-lg',
              'ring-1 ring-inset ring-black/5 dark:ring-white/5',
            )}
          />
        </div>

        <div className='flex flex-col justify-center min-w-0'>
          {tags?.length > 0 && (
            <div className='flex items-center gap-2 mb-1.5'>
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'text-[10px] font-medium uppercase tracking-[0.1em]',
                    'text-gray-400 dark:text-gray-500',
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3
            className={cn(
              'font-secondary font-semibold text-base sm:text-lg',
              'leading-snug tracking-tight',
              'text-gray-900 dark:text-gray-100',
              'line-clamp-2',
              'transition-colors duration-200',
              'group-hover:text-primary-600 dark:group-hover:text-primary-400',
            )}
          >
            {title}
          </h3>

          <p
            className={cn(
              'mt-1 text-sm leading-relaxed',
              'text-gray-500 dark:text-gray-400',
              'line-clamp-2',
              'hidden sm:block',
            )}
          >
            {description}
          </p>

          <div className='flex items-center gap-3 mt-2 flex-wrap'>
            <div className='flex items-center gap-3 text-[11px] text-gray-400 dark:text-gray-500'>
              <span className='flex items-center gap-1'>
                <Calendar className='h-3 w-3' />
                <time dateTime={publishedAt}>{date}</time>
              </span>
              {timeReading && (
                <span className='flex items-center gap-1'>
                  <Clock className='h-3 w-3' />
                  <span>{timeReading}</span>
                </span>
              )}
            </div>

            <div className='flex items-center gap-2.5'>
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <span className='h-3 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
                  <span className='h-3 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
                </div>
              ) : (
                <>
                  <ViewCounterStats
                    views={views}
                    showIcon
                    className='text-[11px] text-gray-400 dark:text-gray-500'
                  />
                  <LikeButtonStats
                    likes={likes}
                    showIcon
                    className='text-[11px] text-gray-400 dark:text-gray-500'
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EditorialPostCard;
