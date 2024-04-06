import React from 'react';

import { cn } from '@/lib/utils';

import ArrowLink from '@/components/atoms/links/ArrowLink';
import UnstyledLink from '@/components/atoms/links/UnstyledLink';
import Title from '@/components/atoms/title';
import PostCard from '@/components/molecules/card/BlogCard';

import { TPosts } from '@/types/interfaces/posts';

interface IBlog {
  posts: TPosts;
}

const Blog = (props: IBlog) => {
  const { posts } = props;

  return (
    <section className='background mb-10'>
      <div className='layout'>
        <div className='flex justify-between'>
          <Title title='Latest Articles' />
          <ArrowLink
            as={UnstyledLink}
            className='inline-flex items-center'
            href='/blog'
          >
            View All Articles
          </ArrowLink>
        </div>
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-10',
          )}
        >
          {posts?.map((post) => (
            <PostCard
              key={post.title}
              title={post.title}
              publishedAt={post.publishedAt}
              description={post.description}
              tags={post.tags}
              slug={post.slug}
              banner={post.banner}
              content={post.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
