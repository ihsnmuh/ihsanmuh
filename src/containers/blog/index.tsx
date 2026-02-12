import { useEffect, useMemo, useState } from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import Title from '@/components/Atoms/title';
import PostCard from '@/components/Molecules/card/BlogCard';

import { TPosts } from '@/types/interfaces/posts';

interface IBlogContainer {
  posts: TPosts;
}

const filterPosts = (posts: TPosts, search: string): TPosts => {
  const searchLower = search.toLowerCase();
  return posts.filter((el) => {
    const titleMatch = el.title.toLowerCase().includes(searchLower);
    const descriptionMatch = el.description
      ?.toLowerCase()
      .includes(searchLower);
    const tagsMatch = el.tags?.some((tag) =>
      tag.toLowerCase().includes(searchLower),
    );
    return titleMatch || descriptionMatch || tagsMatch;
  });
};

const BlogContainer = (props: IBlogContainer) => {
  const { posts } = props;
  const [search, _setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const show = LoaderView();

  // Debounce only the search input, not the initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Filter posts synchronously based on debounced search — no empty initial state
  const filteredPosts = useMemo(
    () => filterPosts(posts, debouncedSearch),
    [posts, debouncedSearch],
  );

  return (
    <section className={cn('layout py-20', show && 'fade-in-start')}>
      <div
        className={cn('flex flex-col h-fit rounded-2xl mt-10', 'max-w-2xl')}
        data-fade='1'
      >
        <Title title='Personal Blog' />
        <p className='mt-2 font-primary text-sm md:text-base'>
          Writing helps me think clearly. Here I break down what I learn, from
          frontend patterns and performance tricks to lessons picked up along
          the way. If it made me a better engineer, it might help you too.
        </p>
      </div>

      <div data-fade='2' className='mt-8'>
        <label htmlFor='search-input' className='sr-only'>
          Search blog posts
        </label>
        <div className='relative max-w-md'>
          <input
            id='search-input'
            className={cn(
              'w-full py-3 px-4 pl-11',
              'border rounded-lg',
              'border-gray-300 dark:border-gray-600',
              'bg-white dark:bg-gray-800',
              'text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-500 dark:placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'transition-colors',
            )}
            value={search}
            onChange={(e) => _setSearch(e.target.value)}
            type='text'
            placeholder='Search articles...'
            aria-label='Search blog posts'
          />
          <svg
            className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          {search && (
            <button
              onClick={() => _setSearch('')}
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2',
                'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 rounded',
              )}
              aria-label='Clear search'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          )}
        </div>
        {/* Always reserve space to prevent CLS when search text appears */}
        <div className='h-8 mt-2 flex items-center'>
          {search && (
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Found {filteredPosts.length} article
              {filteredPosts.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
            </p>
          )}
        </div>
      </div>

      {/* min-h prevents CLS when switching between cards and empty state */}
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-10',
          'min-h-[280px]',
        )}
        data-fade='2'
      >
        {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.title}
              title={post.title}
              publishedAt={post.publishedAt}
              description={post.description}
              tags={post.tags}
              slug={post.slug}
              banner={post.banner}
              timeReading={post.timeReading}
            />
          ))
        ) : (
          <div className='col-span-full flex flex-col items-center justify-center text-center py-10'>
            <p className='font-primary text-lg font-semibold text-slate-500 dark:text-slate-400'>
              No articles found
            </p>
            <p className='font-primary text-sm text-slate-400 dark:text-slate-500 mt-1'>
              No results for &ldquo;{search}&rdquo;. Try a different keyword.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogContainer;
