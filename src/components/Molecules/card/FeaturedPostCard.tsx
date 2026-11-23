import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import TagPill from '@/components/Atoms/pills/TagPills';
import { LikeButtonStats } from '@/components/Molecules/blog/LikeButton';
import { ViewCounterStats } from '@/components/Molecules/blog/ViewCounter';

import { usePostStats } from '@/helpers/usePostStats';

import { IPost } from '@/types/interfaces/posts';

const FeaturedPostCard = (props: IPost) => {
  const { slug, title, banner, tags, timeReading, publishedAt, description } =
    props;

  const { views, likes, isLoading } = usePostStats(slug);
  const date = publishedAt
    ? format(new Date(publishedAt), 'MMMM dd, yyyy')
    : '';

  return (
    <Link href={`/blog/${slug}`} className='group block'>
      <article
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 gap-0 relative',
          'rounded-lg overflow-hidden',
          'border border-hairline hover:border-hairline-strong hover:-translate-y-0.5',
          'bg-surface text-ink',
          'transition-all duration-200',
        )}
      >
        <div className='relative aspect-[16/10] md:aspect-auto min-h-[220px] overflow-hidden border-b md:border-b-0 md:border-r border-hairline bg-subtle'>
          <NextImage
            className='w-full h-full'
            classNames={{
              image:
                'transition-transform duration-500 ease-out group-hover:scale-[1.03]',
            }}
            src={`/images/blog/${banner}`}
            alt={title}
            sizes='(max-width: 1024px) 100vw, 50vw'
            fill
            style={{ objectFit: 'cover' }}
            useSkeleton
          />
        </div>

        <div className='flex flex-col justify-center p-6 sm:p-7'>
          <div className='flex items-center gap-2 mb-3 flex-wrap'>
            <span className='inline-block px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-accent bg-accent-soft rounded-full'>
              Featured
            </span>
            {tags?.slice(0, 2).map((tag) => <TagPill key={tag} name={tag} />)}
          </div>

          <h2 className='font-primary text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-ink group-hover:text-accent transition-colors duration-150'>
            {title}
          </h2>

          <p className='mt-2.5 text-sm leading-relaxed text-body line-clamp-3'>
            {description}
          </p>

          <div className='mt-6 pt-4 border-t border-hairline/70 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-muted tabular-nums'>
            <div className='flex items-center gap-2'>
              {date && <time dateTime={publishedAt}>{date}</time>}
              {timeReading && (
                <>
                  <span aria-hidden='true'>·</span>
                  <span>{timeReading}</span>
                </>
              )}
            </div>

            <div className='flex items-center gap-3'>
              {isLoading ? (
                <span className='h-3 w-12 animate-pulse rounded bg-subtle' />
              ) : (
                <>
                  <ViewCounterStats views={views} showIcon />
                  <LikeButtonStats likes={likes} showIcon />
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
