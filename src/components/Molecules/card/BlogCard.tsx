import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import TagPill from '@/components/Atoms/pills/TagPills';
import { LikeButtonStats } from '@/components/Molecules/blog/LikeButton';
import { ViewCounterStats } from '@/components/Molecules/blog/ViewCounter';

import { usePostStats } from '@/helpers/usePostStats';

import WrapperCard from './WrapperCard';

import { IPost } from '@/types/interfaces/posts';

interface IPostCard extends IPost {
  className?: string;
  excludeFromToC?: boolean;
}

const PostCard = (props: IPostCard) => {
  const {
    className,
    slug,
    title,
    banner,
    tags,
    timeReading: timeReadingText,
    publishedAt,
    description,
    views: initialViews,
    likes: initialLikes,
    excludeFromToC = false,
  } = props;

  const { views, likes, isLoading } = usePostStats(slug, {
    initialViews,
    initialLikes,
  });

  const date = publishedAt ? format(new Date(publishedAt), 'MMM dd, yyyy') : '';
  const reading = timeReadingText ?? '';

  return (
    <Link href={`/blog/${slug}`} className='block h-full'>
      <WrapperCard
        className={cn(
          'group h-full flex flex-col overflow-hidden bg-surface text-ink',
          'border border-hairline rounded-lg hover:border-hairline-strong transition-colors duration-200',
          className,
        )}
      >
        <div className='relative overflow-hidden border-b border-hairline bg-subtle'>
          <NextImage
            className='w-full aspect-video'
            classNames={{
              image:
                'transition-transform duration-500 ease-out group-hover:scale-[1.03]',
            }}
            src={`/images/blog/${banner}`}
            alt={title}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            fill
            style={{
              objectFit: 'cover',
            }}
            useSkeleton
          />
        </div>

        <div className='flex flex-col flex-1 gap-2.5 p-5'>
          {tags?.length > 0 && (
            <div className='flex flex-wrap gap-1.5'>
              {tags.slice(0, 2).map((tag) => (
                <TagPill key={tag} name={tag} />
              ))}
            </div>
          )}

          <h3
            {...(excludeFromToC && { 'data-toc-exclude': 'true' })}
            className='font-primary font-semibold text-base sm:text-lg tracking-tight leading-snug line-clamp-2 text-ink group-hover:text-accent transition-colors duration-150'
          >
            {title}
          </h3>

          <p className='text-sm text-body line-clamp-2 leading-relaxed'>
            {description}
          </p>

          <div className='flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 mt-auto pt-4 border-t border-hairline/70 text-xs font-mono text-muted tabular-nums'>
            <div className='flex items-center gap-2 whitespace-nowrap'>
              {date && <time dateTime={publishedAt}>{date}</time>}
              {reading && (
                <>
                  <span aria-hidden='true'>·</span>
                  <span>{reading}</span>
                </>
              )}
            </div>

            <div className='flex items-center gap-3 whitespace-nowrap'>
              {isLoading ? (
                <span className='h-3 w-12 animate-pulse rounded bg-subtle' />
              ) : (
                <>
                  <ViewCounterStats
                    views={views}
                    showIcon
                    compact
                    className='text-xs'
                  />
                  <LikeButtonStats
                    likes={likes}
                    showIcon
                    compact
                    className='text-xs'
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </WrapperCard>
    </Link>
  );
};

export default PostCard;
