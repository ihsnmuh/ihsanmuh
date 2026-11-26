import { ArrowRight } from 'lucide-react';
import React from 'react';

import UnstyledLink from '@/components/Atoms/links/UnstyledLink';
import ScrollReveal from '@/components/Atoms/ScrollReveal';
import EditorialPostCard from '@/components/Molecules/card/EditorialPostCard';

import { TPosts } from '@/types/interfaces/posts';

interface IBlog {
  posts: TPosts;
}

const Blog = (props: IBlog) => {
  const { posts } = props;

  return (
    <section className='text-body'>
      <ScrollReveal className='flex items-end justify-between mb-6 gap-4'>
        <div>
          <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-2'>
            Writing
          </p>
          <h2 className='font-primary font-semibold text-2xl sm:text-3xl text-ink tracking-tight'>
            Latest Articles
          </h2>
        </div>

        <UnstyledLink
          href='/blog'
          className='inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors group shrink-0'
        >
          <span>All articles</span>
          <ArrowRight
            size={15}
            className='group-hover:translate-x-0.5 transition-transform'
          />
        </UnstyledLink>
      </ScrollReveal>

      <div className='divide-y divide-hairline border-t border-b border-hairline'>
        {posts?.slice(0, 4)?.map((post, index) => (
          <ScrollReveal key={post.slug || post.title} delay={40 + index * 60}>
            <EditorialPostCard
              title={post.title}
              publishedAt={post.publishedAt}
              description={post.description}
              tags={post.tags}
              slug={post.slug}
              banner={post.banner}
              timeReading={post.timeReading}
              views={post.views}
              likes={post.likes}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Blog;
