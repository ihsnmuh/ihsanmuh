import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/atoms/NextImage';
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
}

const Detail = (props: IDetailBlog) => {
  const { source, components, image, title, publishedAt, timeReading } = props;
  const publishDate = format(new Date(publishedAt), 'MMMM dd, yyyy');

  return (
    <section className={cn('layout py-20')}>
      <div className='relative w-full'>
        <NextImage
          className='w-full aspect-video max-h-52 sm:max-h-96'
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
      </div>
      <div className='mt-8 pb-4 border-b border-slate-200 dark:border-slate-500'>
        <Title title={title} />
        <p className='mt-2 text-sm'>{`Created at ${publishDate} by Muhammad Ihsan • ☕️ ${timeReading}`}</p>
      </div>
      <div className='flex gap-8'>
        <div className='prose dark:prose-dark'>
          <MDXRemote {...source} components={components} />
        </div>
        <TabelOfContent />
      </div>
    </section>
  );
};

export default Detail;
