import { useEffect, useMemo, useState } from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

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
    <div className={cn('pt-2 sm:pt-4', show && 'fade-in-start')}>
      <header data-fade='1' className='mb-10'>
        <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-2'>
          Writing
        </p>
        <h1 className='font-primary text-3xl sm:text-4xl font-bold tracking-tight text-ink'>
          Articles &amp; Notes
        </h1>
        <p className='mt-3 text-base leading-relaxed text-body max-w-2xl'>
          Writing helps me think clearly. Here I share notes on frontend
          architecture, web performance, and lessons from day-to-day engineering
          work.
        </p>
      </header>

      <SearchFilter
        data-fade='2'
        search={search}
        onSearchChange={_setSearch}
        searchPlaceholder='Search articles...'
        activeFilter={selectedTag}
        onFilterChange={setSelectedTag}
        filters={allTags}
      />

      <div className='h-6 mt-3 flex items-center'>
        {(search || selectedTag !== 'All') && (
          <p className='text-xs font-mono text-muted'>
            Found {filteredPosts.length} article
            {filteredPosts.length !== 1 ? 's' : ''}{' '}
            {selectedTag !== 'All' && (
              <span>
                under{' '}
                <span className='font-medium text-ink'>{selectedTag}</span>
              </span>
            )}
            {search && (
              <span>
                {' '}
                matching &ldquo;
                <span className='font-medium text-ink'>{search}</span>&rdquo;
              </span>
            )}
          </p>
        )}
      </div>

      <div className='min-h-[320px] mt-4' data-fade='3'>
        {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
          <>
            {featuredPost && (
              <div className='mb-12'>
                <FeaturedPostCard {...featuredPost} />
              </div>
            )}

            {remainingPosts.length > 0 && (
              <>
                {featuredPost && (
                  <p className='font-mono text-[11px] uppercase tracking-wider text-muted mb-3'>
                    All Articles
                  </p>
                )}

                <div className='divide-y divide-hairline border-t border-b border-hairline'>
                  {remainingPosts.map((post) => (
                    <EditorialPostCard key={post.slug} {...post} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className='flex flex-col items-center justify-center text-center py-20 border border-hairline rounded-lg bg-surface'>
            <p className='font-primary text-base font-semibold text-ink'>
              No articles found
            </p>
            <p className='text-sm text-muted mt-1'>
              No results for &ldquo;{search}&rdquo;. Try a different keyword or
              tag.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogContainer;
