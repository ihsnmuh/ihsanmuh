import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/atoms/NextImage';
import TagPill from '@/components/atoms/pills/TagPills';
import Title from '@/components/atoms/title';

const TabelOfContent = dynamic(
  () => import('@/components/molecules/blog/TabelOfContent'),
  { ssr: false },
);

interface IDetailBlog {
  source: MDXRemoteSerializeResult;
  components: any;
  image: string | undefined;
  title: string;
  publishedAt: string;
  timeReading: string;
  tags: string[];
}

const Detail = (props: IDetailBlog) => {
  const { source, components, image, title, publishedAt, timeReading, tags } =
    props;
  const publishDate = format(new Date(publishedAt), 'MMMM dd, yyyy');

  return (
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
        <p className='mt-2 text-sm'>{`Created at ${publishDate} by Muhammad Ihsan • ☕️ ${timeReading}`}</p>
      </div>
      <div className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
        <article className='prose dark:prose-dark flex-auto'>
          <MDXRemote {...source} components={components} />
        </article>
        <aside className='py-8'>
          <div className='sticky top-24'>
            <TabelOfContent />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Detail;
