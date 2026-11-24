import { useEffect, useMemo, useState } from 'react';

import PostCard from '@/components/Molecules/card/BlogCard';

import { IPost } from '@/types/interfaces/posts';

type RelatedPostsProps = {
  posts: IPost[];
};

type TStatsMap = Record<string, { views: number; likes: number }>;

function isPostActive(post: IPost): boolean {
  const isShow = post.isShow;
  if (isShow === undefined || isShow === null) return true;
  if (typeof isShow === 'boolean') return isShow;
  if (typeof isShow === 'string') {
    const strValue = isShow as string;
    return strValue.toLowerCase() !== 'false' && strValue !== '0';
  }
  return true;
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  const visiblePosts = useMemo(
    () => posts.filter(isPostActive).slice(0, 2),
    [posts],
  );
  const slugsKey = visiblePosts.map((post) => post.slug).join(',');
  const [statsMap, setStatsMap] = useState<TStatsMap>({});

  useEffect(() => {
    if (!slugsKey) return;

    const controller = new AbortController();
    let cancelled = false;

    const fetchBatchStats = async () => {
      try {
        const response = await fetch(
          `/api/stats?slugs=${encodeURIComponent(slugsKey)}`,
          { signal: controller.signal },
        );
        if (!cancelled && response.ok) {
          const data: TStatsMap = await response.json();
          setStatsMap(data);
        }
      } catch (error) {
        if (!cancelled && (error as Error).name !== 'AbortError') {
          console.warn('Failed to fetch related posts stats:', error);
        }
      }
    };

    fetchBatchStats();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [slugsKey]);

  if (visiblePosts.length === 0) {
    return null;
  }

  return (
    <section className='mt-16 border-t border-hairline pt-10' data-toc-exclude>
      <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-2'>
        Keep Reading
      </p>
      {/* Use div instead of h2 so it is excluded from TOC heading queries */}
      <div className='font-primary text-2xl font-semibold tracking-tight text-ink mb-6'>
        Related Articles
      </div>
      <div className='grid gap-6 md:grid-cols-2'>
        {visiblePosts.map((post) => {
          const batchStats = statsMap[post.slug];
          return (
            <PostCard
              key={post.slug}
              {...post}
              views={batchStats?.views ?? post.views ?? 0}
              likes={batchStats?.likes ?? post.likes ?? 0}
              excludeFromToC
            />
          );
        })}
      </div>
    </section>
  );
}
