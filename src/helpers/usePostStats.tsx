import { useEffect, useState } from 'react';

type PostStats = {
  views: number;
  likes: number;
};

type UsePostStatsOptions = {
  initialViews?: number;
  initialLikes?: number;
};

type UsePostStatsReturn = PostStats & {
  isLoading: boolean;
};

/**
 * Returns view/like stats for a post slug.
 * Skips network fetch when both initialViews and initialLikes are provided (e.g. SSR batch prefetch).
 */
export function usePostStats(
  slug: string,
  options: UsePostStatsOptions = {},
): UsePostStatsReturn {
  const { initialViews, initialLikes } = options;
  const hasInitialStats =
    typeof initialViews === 'number' && typeof initialLikes === 'number';

  const [stats, setStats] = useState<PostStats>({
    views: hasInitialStats ? initialViews : 0,
    likes: hasInitialStats ? initialLikes : 0,
  });
  const [isLoading, setIsLoading] = useState(!hasInitialStats);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    if (hasInitialStats) {
      setStats({ views: initialViews, likes: initialLikes });
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    let cancelled = false;
    setIsLoading(true);

    const fetchStats = async () => {
      try {
        const response = await fetch(
          `/api/stats?slugs=${encodeURIComponent(slug)}`,
          { signal: controller.signal },
        );
        if (!cancelled && response.ok) {
          const data = await response.json();
          if (data[slug]) {
            setStats(data[slug]);
          }
        }
      } catch (error) {
        if (!cancelled && (error as Error).name !== 'AbortError') {
          console.warn('Failed to fetch post stats:', error);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [slug, hasInitialStats, initialViews, initialLikes]);

  return { ...stats, isLoading };
}
