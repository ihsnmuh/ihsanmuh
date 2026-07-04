import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import TagPill from '@/components/Atoms/pills/TagPills';
import { LikeButton } from '@/components/Molecules/blog/LikeButton';
import ReadingProgress from '@/components/Molecules/blog/ReadingProgress';
import RelatedPosts from '@/components/Molecules/blog/RelatedPosts';
import TOCMobile from '@/components/Molecules/blog/TOCMobile';
import { ViewIncrement } from '@/components/Molecules/blog/ViewCounter';

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
      <section className={cn('layout py-16 md:py-20')}>
        {/* Hero Banner Image at the top */}
        <div className='relative w-full aspect-video shadow-md max-h-52 sm:max-h-96 md:max-h-[480px] rounded-2xl overflow-hidden mb-8 border border-slate-200 dark:border-zinc-800/40'>
          <NextImage
            className='w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]'
            classNames={{
              image: 'rounded-2xl',
            }}
            src={`/images/blog/${image}`}
            alt={title}
            sizes='100vw'
            fill
            style={{
              objectFit: 'cover',
            }}
            useSkeleton
            priority
          />
          <div className='absolute bottom-4 right-4 z-10'>
            <div className='flex gap-2 mt-2'>
              {tags.map((tag) => (
                <TagPill key={tag} name={tag} />
              ))}
            </div>
          </div>
        </div>

        {/* Title and Metadata below the image */}
        <div className='pb-6 border-b border-slate-200 dark:border-zinc-800/80 mb-8'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-secondary font-extrabold tracking-tight text-slate-800 dark:text-zinc-100 mb-4 leading-tight'>
            {title}
          </h1>
          <div className='flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-500 dark:text-zinc-400'>
            <div className='flex items-center gap-1.5'>
              <Calendar size={16} className='text-primary-500' />
              <span>{publishDate}</span>
            </div>
            <span>•</span>
            <div className='flex items-center gap-1.5'>
              <Clock size={16} className='text-primary-500' />
              <span>{timeReading}</span>
            </div>
            <span>•</span>
            <div className='flex items-center gap-1.5'>
              <ViewIncrement slug={slug} />
            </div>
            <span>•</span>
            <div className='flex items-center gap-1.5'>
              <LikeButton slug={slug} />
            </div>
          </div>
        </div>

        {/* Article content & TOC grid */}
        <div className='lg:grid lg:grid-cols-[auto,260px] lg:gap-10'>
          <div className='flex-auto max-w-none'>
            <article className='prose dark:prose-dark prose-slate dark:prose-invert prose-headings:font-secondary prose-a:text-primary-500 hover:prose-a:text-primary-600 transition-colors prose-img:rounded-xl'>
              <MDXRemote {...source} components={components} />
            </article>

            {/* End of article Like Callout for Mobile & Desktop */}
            <div className='mt-10 mb-6 flex flex-col items-center justify-center gap-3 p-6 border border-slate-200 dark:border-zinc-700/40 rounded-2xl background-card backdrop-blur text-center'>
              <p className='font-primary text-sm text-slate-600 dark:text-zinc-400 font-semibold'>
                Terima kasih sudah membaca! Suka dengan artikel ini?
              </p>
              <LikeButton
                slug={slug}
                className='px-4 py-2 bg-slate-100 hover:bg-red-50 dark:bg-zinc-800 dark:hover:bg-red-950/20 border border-slate-200 dark:border-zinc-700/60 hover:border-red-200 dark:hover:border-red-900/40 rounded-xl font-bold shadow-sm transition-all text-sm'
              />
            </div>
          </div>
          <aside className='py-2 hidden lg:block'>
            <div className='sticky top-24'>
              <TabelOfContent slug={slug} />
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
