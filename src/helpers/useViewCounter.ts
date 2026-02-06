import { useEffect, useState } from 'react';

type ViewCounterState = {
  views: number;
  isLoading: boolean;
  error: string | null;
};

export function useViewCounter(slug: string) {
  const [state, setState] = useState<ViewCounterState>({
    views: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!slug) return;

    const fetchAndIncrementViews = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Failed to increment view count');
        }

        const data = await response.json();
        setState({
          views: data.count || 0,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error tracking view:', error);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error ? error.message : 'Unknown error occurred',
        }));

        try {
          const response = await fetch(`/api/views/${slug}`);
          if (response.ok) {
            const data = await response.json();
            setState((prev) => ({
              ...prev,
              views: data.count || 0,
            }));
          }
        } catch {
          // Ignore fallback error
        }
      }
    };

    fetchAndIncrementViews();
  }, [slug]);

  return state;
}
