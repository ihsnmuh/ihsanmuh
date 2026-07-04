import { useEffect, useMemo, useRef, useState } from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import Title from '@/components/Atoms/title';
import EditorialPostCard from '@/components/Molecules/card/EditorialPostCard';
import FeaturedPostCard from '@/components/Molecules/card/FeaturedPostCard';

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
  const [selectedTag, setSelectedTag] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);

  const show = LoaderView();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Extract unique tags dynamically
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return ['All', ...Array.from(tagsSet).sort()];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (debouncedSearch) {
      result = filterPosts(result, debouncedSearch);
    }

    if (selectedTag !== 'All') {
      result = result.filter((post) =>
        post.tags?.some((t) => t.toLowerCase() === selectedTag.toLowerCase()),
      );
    }

    return result;
  }, [posts, debouncedSearch, selectedTag]);

  const isSearchingOrFiltering =
    debouncedSearch.length > 0 || selectedTag !== 'All';
  const featuredPost = !isSearchingOrFiltering ? filteredPosts[0] : undefined;
  const remainingPosts = !isSearchingOrFiltering
    ? filteredPosts.slice(1)
    : filteredPosts;

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
            ref={inputRef}
            className={cn(
              'w-full py-2.5 pl-10 pr-16',
              'rounded-xl border',
              'border-slate-200 dark:border-zinc-700/50',
              'bg-slate-50/50 dark:bg-slate-800/20',
              'text-slate-900 dark:text-slate-100',
              'placeholder:text-slate-400 dark:placeholder:text-slate-500',
              'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400',
              'transition-all duration-300',
              'text-sm shadow-sm',
            )}
            value={search}
            onChange={(e) => _setSearch(e.target.value)}
            type='text'
            placeholder='Search articles...'
            aria-label='Search blog posts'
          />
          <svg
            className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.8}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          {!search && (
            <kbd className='absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] font-mono text-slate-400 dark:text-slate-500 pointer-events-none select-none'>
              /
            </kbd>
          )}
          {search && (
            <button
              onClick={() => _setSearch('')}
              className={cn(
                'absolute right-3.5 top-1/2 -translate-y-1/2',
                'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300',
                'focus:outline-none rounded',
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
                  strokeWidth={1.8}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          )}
        </div>

        {/* Dynamic Tag Filters */}
        <div className='mt-5 flex flex-wrap gap-2 items-center'>
          <span className='text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1.5 hidden sm:inline'>
            Filter by:
          </span>
          <div className='flex flex-wrap gap-1.5'>
            {allTags.map((tag) => {
              const isActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 border',
                    isActive
                      ? 'bg-primary-500 border-primary-500 text-white shadow-sm shadow-primary-500/10'
                      : 'border-slate-200 dark:border-zinc-700/60 text-slate-600 dark:text-slate-400 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:border-slate-300 dark:hover:border-zinc-600',
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles count status description */}
        <div className='h-7 mt-3 flex items-center'>
          {(search || selectedTag !== 'All') && (
            <p className='text-xs text-slate-400 dark:text-slate-500'>
              Found {filteredPosts.length} article
              {filteredPosts.length !== 1 ? 's' : ''}{' '}
              {selectedTag !== 'All' && (
                <span>
                  under tag &ldquo;
                  <span className='font-semibold text-primary-500 dark:text-primary-400'>
                    {selectedTag}
                  </span>
                  &rdquo;
                </span>
              )}
              {search && (
                <span>
                  {' '}
                  for &ldquo;<span className='font-semibold'>{search}</span>
                  &rdquo;
                </span>
              )}
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
