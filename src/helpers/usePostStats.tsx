import { useEffect, useState } from 'react';

type PostStats = {
  views: number;
  likes: number;
};

type UsePostStatsReturn = PostStats & {
  isLoading: boolean;
};

export function usePostStats(slug: string): UsePostStatsReturn {
  const [stats, setStats] = useState<PostStats>({ views: 0, likes: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch(
          `/api/stats?slugs=${encodeURIComponent(slug)}`,
        );
        if (response.ok) {
          const data = await response.json();
          if (data[slug]) {
            setStats(data[slug]);
          }
        }
      } catch (error) {
        console.warn('Failed to fetch post stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [slug]);

  return { ...stats, isLoading };
}
