import { useEffect, useMemo, useState } from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import Title from '@/components/Atoms/title';
import EditorialPostCard from '@/components/Molecules/card/EditorialPostCard';
import FeaturedPostCard from '@/components/Molecules/card/FeaturedPostCard';
import SearchFilter from '@/components/Molecules/SearchFilter';

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

  const show = LoaderView();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

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

      <SearchFilter
        data-fade='2'
        className='mt-10'
        search={search}
        onSearchChange={_setSearch}
        searchPlaceholder='Search articles...'
        activeFilter={selectedTag}
        onFilterChange={setSelectedTag}
        filters={allTags}
      />

      {/* Articles count status description */}
      <div className='h-7 mt-3 flex items-center pl-1'>
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
                        'lg:border-b lg:border-gray-100 lg:dark:border-gray-800 h-full',
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
