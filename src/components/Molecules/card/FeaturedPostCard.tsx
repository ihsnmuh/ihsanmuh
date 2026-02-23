import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import { LikeButtonStats } from '@/components/Molecules/blog/LikeButton';
import { ViewCounterStats } from '@/components/Molecules/blog/ViewCounter';

import { usePostStats } from '@/helpers/usePostStats';

import { IPost } from '@/types/interfaces/posts';

const FeaturedPostCard = (props: IPost) => {
  const { slug, title, banner, tags, timeReading, publishedAt, description } =
    props;

  const { views, likes, isLoading } = usePostStats(slug);
  const date = format(new Date(publishedAt ?? ''), 'MMMM dd, yyyy');

  return (
    <Link href={`/blog/${slug}`} className='group block'>
      <article
        className={cn(
          'grid grid-cols-1 lg:grid-cols-2 gap-0',
          'rounded-xl overflow-hidden',
          'border border-gray-200 dark:border-gray-700/50',
          'bg-white dark:bg-slate-800/40',
          'transition-all duration-300',
          'hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600',
        )}
      >
        <div className='relative aspect-[16/10] lg:aspect-auto overflow-hidden'>
          <NextImage
            className='w-full h-full'
            src={`/images/blog/${banner}`}
            alt={title}
            sizes='(max-width: 1024px) 100vw, 50vw'
            fill
            style={{ objectFit: 'cover' }}
            useSkeleton
          />
          <div
            className={cn(
              'absolute inset-0',
              'bg-gradient-to-t from-black/30 via-transparent to-transparent',
              'lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10',
              'opacity-0 transition-opacity duration-500 group-hover:opacity-100',
            )}
          />
        </div>

        <div className='flex flex-col justify-center p-6 sm:p-8 lg:p-10'>
          <div className='flex items-center gap-3 mb-4'>
            <span
              className={cn(
                'inline-block px-2.5 py-0.5',
                'text-[10px] font-semibold uppercase tracking-[0.15em]',
                'text-primary-600 dark:text-primary-400',
                'bg-primary-50 dark:bg-primary-500/10',
                'rounded-full',
              )}
            >
              Featured
            </span>
            {tags?.length > 0 && (
              <div className='flex items-center gap-1.5'>
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      'text-[10px] font-medium uppercase tracking-[0.12em]',
                      'text-gray-500 dark:text-gray-400',
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h2
            className={cn(
              'font-secondary text-2xl sm:text-3xl font-bold',
              'leading-tight tracking-tight',
              'text-gray-900 dark:text-gray-50',
              'transition-colors duration-300',
              'group-hover:text-primary-600 dark:group-hover:text-primary-400',
            )}
          >
            {title}
          </h2>

          <p
            className={cn(
              'mt-3 text-sm sm:text-base leading-relaxed',
              'text-gray-600 dark:text-gray-400',
              'line-clamp-3',
            )}
          >
            {description}
          </p>

          <div
            className={cn(
              'mt-6 pt-4',
              'border-t border-gray-100 dark:border-gray-700/50',
              'flex items-center justify-between flex-wrap gap-3',
            )}
          >
            <div className='flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400'>
              <span className='flex items-center gap-1.5'>
                <Calendar className='h-3.5 w-3.5' />
                <time dateTime={publishedAt}>{date}</time>
              </span>
              {timeReading && (
                <span className='flex items-center gap-1.5'>
                  <Clock className='h-3.5 w-3.5' />
                  <span>{timeReading}</span>
                </span>
              )}
            </div>

            <div className='flex items-center gap-3'>
              {isLoading ? (
                <div className='flex items-center gap-3'>
                  <span className='h-4 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
                  <span className='h-4 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
                </div>
              ) : (
                <>
                  <ViewCounterStats
                    views={views}
                    showIcon
                    className='text-xs'
                  />
                  <LikeButtonStats likes={likes} showIcon className='text-xs' />
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default FeaturedPostCard;
