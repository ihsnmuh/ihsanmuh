import { useEffect, useMemo, useState } from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import EditorialPostCard from '@/components/Molecules/card/EditorialPostCard';
import FeaturedPostCard from '@/components/Molecules/card/FeaturedPostCard';

import { TPosts } from '@/types/interfaces/posts';
import Title from '@/components/Atoms/title';

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredPosts = useMemo(
    () => filterPosts(posts, debouncedSearch),
    [posts, debouncedSearch],
  );

  const isSearching = debouncedSearch.length > 0;
  const featuredPost = !isSearching ? filteredPosts[0] : undefined;
  const remainingPosts = !isSearching ? filteredPosts.slice(1) : filteredPosts;

  return (
    <section className={cn('layout py-20', show && 'fade-in-start')}>
      <div className='mt-10 max-w-3xl' data-fade='1'>
        <p
          className={cn(
            'text-[11px] font-semibold uppercase tracking-[0.2em]',
            'text-primary-500 dark:text-primary-400',
            'mb-3',
          )}
        >
          Journal
        </p>
        <Title title='Personal Blog' />
        <p
          className={cn(
            'mt-4 text-base md:text-lg leading-relaxed',
            'text-gray-500 dark:text-gray-400',
            'max-w-2xl',
          )}
        >
          Writing helps me think clearly. Here I break down what I learn, from
          frontend patterns and performance tricks to lessons picked up along
          the way.
        </p>
      </div>

      <div data-fade='2' className='mt-10'>
        <label htmlFor='search-input' className='sr-only'>
          Search blog posts
        </label>
        <div className='relative max-w-md'>
          <input
            id='search-input'
            className={cn(
              'w-full py-2.5 px-4 pl-10',
              'border-b border-x-0 border-t-0',
              'border-gray-200 dark:border-gray-700',
              'bg-transparent',
              'text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'focus:outline-none focus:border-primary-500 dark:focus:border-primary-400',
              'transition-colors duration-300',
              'text-sm',
            )}
            value={search}
            onChange={(e) => _setSearch(e.target.value)}
            type='text'
            placeholder='Search articles...'
            aria-label='Search blog posts'
          />
          <svg
            className='absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          {search && (
            <button
              onClick={() => _setSearch('')}
              className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2',
                'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 rounded',
                'transition-colors',
              )}
              aria-label='Clear search'
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          )}
        </div>
        <div className='h-7 mt-1.5 flex items-center'>
          {search && (
            <p className='text-xs text-gray-400 dark:text-gray-500'>
              Found {filteredPosts.length} article
              {filteredPosts.length !== 1 ? 's' : ''} for &ldquo;{search}
              &rdquo;
            </p>
          )}
        </div>
      </div>

      <div className='min-h-[320px]' data-fade='3'>
        {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
          <>
            {featuredPost && (
              <div className='mt-4'>
                <FeaturedPostCard {...featuredPost} />
              </div>
            )}

            {remainingPosts.length > 0 && (
              <>
                {featuredPost && (
                  <div className='my-10 flex items-center gap-4'>
                    <div className='h-px flex-1 bg-gray-200 dark:bg-gray-700/60' />
                    <span
                      className={cn(
                        'text-[10px] font-semibold uppercase tracking-[0.2em]',
                        'text-gray-400 dark:text-gray-500',
                        'shrink-0',
                      )}
                    >
                      All Articles
                    </span>
                    <div className='h-px flex-1 bg-gray-200 dark:bg-gray-700/60' />
                  </div>
                )}

                <div
                  className={cn(
                    'grid grid-cols-1 lg:grid-cols-2 gap-x-8',
                    'divide-y lg:divide-y-0 divide-gray-100 dark:divide-gray-800',
                  )}
                >
                  {remainingPosts.map((post) => (
                    <div
                      key={post.slug}
                      className={cn(
                        'lg:border-b lg:border-gray-100 lg:dark:border-gray-800',
                      )}
                    >
                      <EditorialPostCard {...post} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className='flex flex-col items-center justify-center text-center py-20'>
            <div
              className={cn('w-16 h-px mb-6', 'bg-gray-200 dark:bg-gray-700')}
            />
            <p className='font-secondary text-lg font-semibold text-gray-400 dark:text-gray-500'>
              No articles found
            </p>
            <p className='text-sm text-gray-400 dark:text-gray-500 mt-1.5'>
              No results for &ldquo;{search}&rdquo;. Try a different keyword.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogContainer;
