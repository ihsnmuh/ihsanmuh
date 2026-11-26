import { useEffect, useMemo, useState } from 'react';

import ScrollReveal from '@/components/Atoms/ScrollReveal';
import EditorialPostCard from '@/components/Molecules/card/EditorialPostCard';
import FeaturedPostCard from '@/components/Molecules/card/FeaturedPostCard';
import SearchFilter, { FilterItem } from '@/components/Molecules/SearchFilter';

import { IPost, TPosts } from '@/types/interfaces/posts';

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

const groupPostsByYear = (posts: IPost[]): [string, IPost[]][] => {
  const groups = new Map<string, IPost[]>();

  posts.forEach((post) => {
    const parsedYear = post.publishedAt
      ? new Date(post.publishedAt).getFullYear()
      : NaN;
    const yearKey = Number.isNaN(parsedYear) ? 'Other' : String(parsedYear);
    const bucket = groups.get(yearKey) ?? [];
    bucket.push(post);
    groups.set(yearKey, bucket);
  });

  return Array.from(groups.entries()).sort(([a], [b]) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    return Number(b) - Number(a);
  });
};

const BlogContainer = (props: IBlogContainer) => {
  const { posts } = props;
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  const tagsWithCounts = useMemo<FilterItem[]>(() => {
    const counts: Record<string, number> = {};
    posts.forEach((post) => {
      post.tags?.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    const sortedTags = Object.keys(counts).sort();
    return [
      { name: 'All', count: posts.length },
      ...sortedTags.map((tag) => ({
        name: tag,
        count: counts[tag] || 0,
      })),
    ];
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

  const groupedByYear = useMemo(
    () => groupPostsByYear(remainingPosts),
    [remainingPosts],
  );

  const resetFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setSelectedTag('All');
  };

  return (
    <div className='pt-2 sm:pt-4'>
      <header className='mb-10'>
        <div className='flex items-center gap-3 mb-2'>
          <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium'>
            Writing
          </p>
          <span aria-hidden='true' className='text-hairline-strong'>
            /
          </span>
          <span className='font-mono text-[11px] text-muted tabular-nums'>
            {posts.length} article{posts.length !== 1 ? 's' : ''}
          </span>
        </div>

        <h1 className='font-primary text-3xl sm:text-4xl font-bold tracking-tight text-ink'>
          Articles &amp; Notes
        </h1>
        <p className='mt-3 text-base leading-relaxed text-body max-w-2xl'>
          Writing helps me think clearly. Here I share notes on software
          architecture, web performance, and lessons from day-to-day engineering
          work.
        </p>
      </header>

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder='Search articles by title, topic, or tag...'
        activeFilter={selectedTag}
        onFilterChange={setSelectedTag}
        filters={tagsWithCounts}
        filterLabel='Topics:'
      />

      {isSearchingOrFiltering && (
        <div className='mt-4 flex items-center justify-between gap-3 py-2 border-b border-hairline/70'>
          <p className='text-xs font-mono text-muted tabular-nums'>
            Showing {filteredPosts.length} article
            {filteredPosts.length !== 1 ? 's' : ''}{' '}
            {selectedTag !== 'All' && (
              <span>
                in <span className='font-medium text-ink'>{selectedTag}</span>
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
          <button
            type='button'
            onClick={resetFilters}
            className='text-xs font-mono text-accent hover:text-accent-hover transition-colors shrink-0'
          >
            Clear filters
          </button>
        </div>
      )}

      <div className='min-h-[320px] mt-8'>
        {filteredPosts.length > 0 ? (
          <div className='space-y-14'>
            {featuredPost && (
              <div>
                <p className='font-mono text-[11px] uppercase tracking-wider text-muted mb-3'>
                  Latest Post
                </p>
                <FeaturedPostCard {...featuredPost} />
              </div>
            )}

            {groupedByYear.length > 0 && (
              <div className='space-y-12'>
                {groupedByYear.map(([year, yearPosts], yearIndex) => (
                  <section
                    key={year}
                    aria-label={`Articles from ${year}`}
                    className='grid grid-cols-1 md:grid-cols-[96px_minmax(0,1fr)] gap-3 md:gap-8 items-start'
                  >
                    <div className='flex items-baseline md:flex-col gap-2 md:gap-0.5 md:sticky md:top-24 md:pt-5'>
                      <h2 className='font-mono text-sm font-semibold text-accent tabular-nums'>
                        {year}
                      </h2>
                      <span className='font-mono text-[11px] text-muted tabular-nums'>
                        {yearPosts.length} post
                        {yearPosts.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    <div
                      key={`${year}-${selectedTag}-${debouncedSearch}`}
                      className='divide-y divide-hairline border-t border-b border-hairline'
                    >
                      {yearPosts.map((post, index) => {
                        const card = <EditorialPostCard {...post} />;
                        const delay = (index % 4) * 60;

                        if (isSearchingOrFiltering) {
                          return (
                            <div
                              key={post.slug}
                              className='item-enter'
                              style={
                                {
                                  '--item-delay': `${Math.min(index, 5) * 30}ms`,
                                } as React.CSSProperties
                              }
                            >
                              {card}
                            </div>
                          );
                        }
                        if (yearIndex === 0 && index < 3) {
                          return <div key={post.slug}>{card}</div>;
                        }
                        return (
                          <ScrollReveal key={post.slug} delay={delay}>
                            {card}
                          </ScrollReveal>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center text-center py-20 border border-hairline rounded-lg bg-surface'>
            <p className='font-primary text-base font-semibold text-ink'>
              No articles found
            </p>
            <p className='text-sm text-muted mt-1 max-w-sm'>
              No articles match your current search or topic filter.
            </p>
            <button
              type='button'
              onClick={resetFilters}
              className='mt-5 px-4 py-2 rounded-md text-xs font-medium bg-cta text-cta-fg hover:bg-cta-hover active:scale-[0.98] transition-[background-color,transform] duration-150 ease-[var(--ease-out)]'
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogContainer;
