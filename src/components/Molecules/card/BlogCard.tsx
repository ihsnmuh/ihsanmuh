import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import TagPill from '@/components/Atoms/pills/TagPills';
import { LikeButtonStats } from '@/components/Molecules/blog/LikeButton';
import { ViewCounterStats } from '@/components/Molecules/blog/ViewCounter';

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
    excludeFromToC = false,
  } = props;

  const date = format(new Date(publishedAt ?? ''), 'MMMM dd, yyyy');
  const reading = timeReadingText ?? '';

  return (
    <Link href={`/blog/${slug}`} className='block h-full'>
      <WrapperCard
        className={cn(
          'group h-full overflow-hidden transition-all duration-300 ease-in-out',
          'hover:shadow-xl hover:-translate-y-1',
          className,
        )}
      >
        <div className='relative overflow-hidden'>
          <NextImage
            className='w-full aspect-video transition-transform duration-300 group-hover:scale-105'
            src={`/images/blog/${banner}`}
            alt={title}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            fill
            style={{
              objectFit: 'cover',
            }}
            useSkeleton
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          <div className='absolute flex flex-wrap gap-2 right-3 bottom-3'>
            {tags?.map((tag) => <TagPill key={tag} name={tag} />)}
          </div>
        </div>

        <div className='flex flex-col gap-3 p-5'>
          <h3
            {...(excludeFromToC && { 'data-toc-exclude': 'true' })}
            className='font-bold text-lg leading-tight line-clamp-2 transition-colors group-hover:text-primary-500 dark:group-hover:text-primary-400'
          >
            {title}
          </h3>

          <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed'>
            {description}
          </p>

          <div className='flex flex-col gap-2 mt-auto pt-3 border-t border-gray-200 dark:border-gray-700'>
            <div className='flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400'>
              <Calendar className='h-3.5 w-3.5' />
              <time dateTime={publishedAt}>{date}</time>
            </div>

            <div className='flex items-center justify-between gap-3 flex-wrap'>
              {reading ? (
                <div className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400'>
                  <Clock className='h-3.5 w-3.5' />
                  <span>{reading}</span>
                </div>
              ) : (
                <div />
              )}

              <div className='flex items-center gap-3'>
                <ViewCounterStats views={props.views ?? 0} showIcon />
                <LikeButtonStats likes={props.likes ?? 0} showIcon />
              </div>
            </div>
          </div>
        </div>
      </WrapperCard>
    </Link>
  );
};

export default PostCard;
