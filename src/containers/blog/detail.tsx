import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: MDXRemoteSerializeResult;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <div className='pt-2 sm:pt-4'>
        <Link
          href='/blog'
          className='inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors mb-8 group'
        >
          <ArrowLeft
            size={15}
            className='group-hover:-translate-x-0.5 transition-transform'
          />
          <span>Back to writing</span>
        </Link>

        <header className='pb-8 border-b border-hairline mb-8'>
          {tags?.length > 0 && (
            <div className='flex flex-wrap gap-1.5 mb-4'>
              {tags.map((tag) => (
                <TagPill key={tag} name={tag} />
              ))}
            </div>
          )}

          <h1 className='font-primary text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-[1.15] mb-5'>
            {title}
          </h1>

          <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-muted tabular-nums'>
            <div className='flex items-center gap-1.5'>
              <Calendar size={13} />
              <time dateTime={publishedAt}>{publishDate}</time>
            </div>
            {timeReading && (
              <>
                <span aria-hidden='true'>·</span>
                <div className='flex items-center gap-1.5'>
                  <Clock size={13} />
                  <span>{timeReading}</span>
                </div>
              </>
            )}
            <span aria-hidden='true'>·</span>
            <ViewIncrement slug={slug} />
            <span aria-hidden='true'>·</span>
            <LikeButton slug={slug} />
          </div>
        </header>

        {image && (
          <div className='relative w-full aspect-video max-h-[420px] rounded-lg overflow-hidden mb-10 border border-hairline bg-subtle'>
            <NextImage
              className='w-full h-full object-cover'
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
          </div>
        )}

        <div className='lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12'>
          <div className='min-w-0'>
            <article className='mdx prose max-w-none'>
              <MDXRemote {...source} components={components} />
            </article>

            <div className='mt-14 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border border-hairline rounded-lg bg-surface'>
              <div>
                <p className='font-primary text-base font-semibold text-ink'>
                  Enjoyed this article?
                </p>
                <p className='text-sm text-muted mt-0.5'>
                  Leave a like if you found these notes helpful.
                </p>
              </div>
              <LikeButton
                slug={slug}
                className='px-4 py-2 bg-subtle hover:bg-hover border border-hairline rounded-md font-primary font-medium transition-colors text-sm text-ink shrink-0'
              />
            </div>
          </div>

          <aside className='hidden lg:block'>
            <div className='sticky top-24'>
              <TabelOfContent slug={slug} />
            </div>
          </aside>
        </div>

        <TOCMobile />
        <RelatedPosts posts={relatedPosts} />
      </div>
    </>
  );
};

export default Detail;
