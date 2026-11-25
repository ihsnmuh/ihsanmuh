import { format } from 'date-fns';
import { ArrowLeft, Calendar, Check, Clock, Link2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React, { useState } from 'react';

import NextImage from '@/components/Atoms/NextImage';
import TagPill from '@/components/Atoms/pills/TagPills';
import { LikeButton } from '@/components/Molecules/blog/LikeButton';
import ReadingProgress from '@/components/Molecules/blog/ReadingProgress';
import RelatedPosts from '@/components/Molecules/blog/RelatedPosts';
import TOCMobile from '@/components/Molecules/blog/TOCMobile';
import { ViewIncrement } from '@/components/Molecules/blog/ViewCounter';

const GiscusComments = dynamic(
  () => import('@/components/Molecules/blog/GiscusComments'),
  { ssr: false },
);

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
  const [copied, setCopied] = useState(false);
  const publishDate = format(new Date(publishedAt), 'MMMM dd, yyyy');

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <ReadingProgress />
      <div className='pt-2 sm:pt-4'>
        <div className='flex flex-wrap items-center justify-between gap-3 mb-8'>
          <Link
            href='/blog'
            className='inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors group'
          >
            <ArrowLeft
              size={15}
              className='group-hover:-translate-x-0.5 transition-transform'
            />
            <span>Back to writing</span>
          </Link>

          {tags?.length > 0 && (
            <div className='flex flex-wrap gap-1.5'>
              {tags.map((tag) => (
                <TagPill key={tag} name={tag} />
              ))}
            </div>
          )}
        </div>

        <header className='pb-8 border-b border-hairline mb-8'>
          <h1 className='font-primary text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-ink leading-[1.14] mb-5 max-w-3xl'>
            {title}
          </h1>

          <div className='flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted tabular-nums'>
            <div className='flex flex-wrap items-center gap-x-3.5 gap-y-2'>
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
            </div>

            <button
              type='button'
              onClick={handleCopyLink}
              className='inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors'
            >
              {copied ? (
                <Check size={13} className='text-accent' />
              ) : (
                <Link2 size={13} />
              )}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </header>

        {image && (
          <div className='relative w-full aspect-video max-h-[440px] rounded-xl overflow-hidden mb-12 border border-hairline bg-subtle'>
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

        <div className='lg:grid lg:grid-cols-[minmax(0,1fr)_210px] lg:gap-12'>
          <div className='min-w-0'>
            <article className='mdx prose max-w-none'>
              <MDXRemote {...source} components={components} />
            </article>

            <div className='mt-14 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border border-hairline rounded-lg bg-surface'>
              <div>
                <p className='font-primary text-base font-semibold text-ink'>
                  Found this article useful?
                </p>
                <p className='text-sm text-muted mt-0.5'>
                  Leave a like or share it with a teammate.
                </p>
              </div>
              <div className='flex items-center gap-2.5 shrink-0'>
                <LikeButton
                  slug={slug}
                  className='px-4 py-2 bg-subtle hover:bg-hover border border-hairline rounded-md font-primary font-medium transition-colors text-sm text-ink'
                />
                <button
                  type='button'
                  onClick={handleCopyLink}
                  className='inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface hover:bg-subtle border border-hairline rounded-md font-primary font-medium transition-colors text-sm text-ink'
                >
                  {copied ? (
                    <Check size={14} className='text-accent' />
                  ) : (
                    <Link2 size={14} />
                  )}
                  <span>{copied ? 'Copied' : 'Copy link'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className='hidden lg:block'>
            <div className='sticky top-24'>
              <TabelOfContent slug={slug} />
            </div>
          </div>
        </div>
        <GiscusComments key={slug} slug={slug} />

        <TOCMobile />
        <RelatedPosts posts={relatedPosts} />
      </div>
    </>
  );
};

export default Detail;
