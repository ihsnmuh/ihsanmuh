import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import TagPill from '@/components/Atoms/pills/TagPills';
import Title from '@/components/Atoms/title';
import { LikeButton } from '@/components/Molecules/blog/LikeButton';
import ReadingProgress from '@/components/Molecules/blog/ReadingProgress';
import RelatedPosts from '@/components/Molecules/blog/RelatedPosts';
import TOCMobile from '@/components/Molecules/blog/TOCMobile';
import { ViewCounter } from '@/components/Molecules/blog/ViewCounter';

const TabelOfContent = dynamic(
  () => import('@/components/Molecules/blog/TabelOfContent'),
  { ssr: false },
);

import { IPost } from '@/types/interfaces/posts';

interface IDetailBlog {
  source: MDXRemoteSerializeResult;
  components: any;
  image: string | undefined;
  title: string;
  publishedAt: string;
  timeReading: string | undefined;
  tags: string[];
  slug: string;
  relatedPosts: IPost[];
}

const Detail = (props: IDetailBlog) => {
  const {
    source,
    components,
    image,
    title,
    publishedAt,
    timeReading,
    tags,
    slug,
    relatedPosts,
  } = props;
  const publishDate = format(new Date(publishedAt), 'MMMM dd, yyyy');

  return (
    <>
      <ReadingProgress />
      <section className={cn('layout py-20')}>
        <div className='relative w-full'>
          <NextImage
            className='w-full aspect-video shadow max-h-52 sm:max-h-96 rounded-lg'
            classNames={{
              image: 'rounded-lg',
            }}
            src={`/images/blog/${image}`}
            alt={title}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            fill
            style={{
              objectFit: 'cover',
            }}
            useSkeleton
          />
          <div className='absolute bottom-4 right-4'>
            <div className='flex gap-2 mt-2'>
              {tags.map((tag) => (
                <TagPill key={tag} name={tag} />
              ))}
            </div>
          </div>
        </div>
        <div className='mt-8 pb-4 border-b border-slate-400 dark:border-slate-500'>
          <Title title={title} />
          <div className='mt-2 flex flex-wrap items-center gap-3 text-sm'>
            <span>{`Created at ${publishDate}`}</span>
            <span>•</span>
            <span>{`☕️ ${timeReading}`}</span>
            <span>•</span>
            <ViewCounter slug={slug} />
            <span>•</span>
            <LikeButton slug={slug} />
          </div>
        </div>
        <div className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
          <article className='prose dark:prose-dark flex-auto'>
            <MDXRemote {...source} components={components} />
          </article>
          <aside className='py-8 hidden lg:block'>
            <div className='sticky top-24'>
              <TabelOfContent />
            </div>
          </aside>
        </div>
        <TOCMobile />
        <RelatedPosts posts={relatedPosts} />
      </section>
    </>
  );
};

export default Detail;
