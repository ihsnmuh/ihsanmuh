import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import Title from '@/components/atoms/title';
import PostCard from '@/components/molecules/card/BlogCard';

import { TPosts } from '@/types/interfaces/posts';

interface IBlogContainer {
  posts: TPosts;
}

const BlogContainer = (props: IBlogContainer) => {
  const { posts } = props;
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<TPosts>([]);

  const show = LoaderView();

  useEffect(() => {
    const postFiltered = posts.filter((el) =>
      el.title.toLowerCase().includes(search.toLowerCase()),
    );

    const searchDebounce = setTimeout(() => {
      setFilteredPosts(postFiltered);
    }, 500);

    return () => clearTimeout(searchDebounce);
  }, [search]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <section className={cn('layout py-20', show && 'fade-in-start')}>
      <div
        className={cn('flex flex-col h-fit rounded-2xl mt-10', 'max-w-2xl')}
        data-fade='1'
      >
        <Title title='Personal Blog' />
        <p className='mt-4 font-primary text-sm md:text-base'>
          This page is a fusion of writing about programing and personal
          reflections. Delve into insightful discussions on programming
          intricacies alongside introspective musings, creating a unique blend
          of technical knowledge and personal growth.
        </p>
      </div>

      <div data-fade='2'>
        <input
          className={cn(
            'w-1/3 py-2 px-4 mt-8',
            'border rounded-lg border-gray-300 dark:border-gray-600',
          )}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          type='text'
          placeholder='Search..'
        />
      </div>

      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-10',
        )}
        data-fade='3'
      >
        {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
          filteredPosts?.map((post) => (
            <PostCard
              key={post.title}
              title={post.title}
              publishedAt={format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
              description={post.description}
              tags={post.tags}
              slug={post.slug}
              banner={post.banner}
              content={post.content}
            />
          ))
        ) : (
          <p className='font-primary'>{`Sorry, Article for "${search}" is not found`}</p>
        )}
      </div>
    </section>
  );
};

export default BlogContainer;
