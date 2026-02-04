import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import TagPill from '@/components/Atoms/pills/TagPills';

import { timeReading } from '@/helpers/readingTime';

import WrapperCard from './WrapperCard';

import { IPost } from '@/types/interfaces/posts';

interface IPostCard extends IPost {
  className?: string;
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
  } = props;

  const date = format(new Date(publishedAt ?? ''), 'MMMM dd, yyyy');
  const reading = timeReadingText ?? '';

  return (
    <Link href={`blog/${slug}`}>
      <WrapperCard className={cn('group h-full', className)}>
        <div className='relative'>
          <NextImage
            className='w-full aspect-video'
            src={`/images/blog/${banner}`}
            alt={title}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            fill
            style={{
              objectFit: 'cover',
            }}
            useSkeleton
          />
          <div className='absolute flex gap-2 right-2 bottom-2'>
            {tags?.map((tag) => <TagPill key={tag} name={tag} />)}
          </div>
        </div>
        <div className='p-4 flex flex-col gap-2'>
          <p className='font-bold text-lg'>{title}</p>
          <div className='flex gap-1 text-sm items-center'>
            <p className='font-semibold'>{date}</p>•
            {reading ? <p className='font-medium'>{reading}</p> : null}
          </div>
          <p className='text-sm'>{description}</p>
        </div>
      </WrapperCard>
    </Link>
  );
};

export default PostCard;
