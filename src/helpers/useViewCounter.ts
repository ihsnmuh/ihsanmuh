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

        const data = await response.json();

        setState({
          views: data.count || 0,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.warn('View counter error (non-critical):', error);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          views: 0,
        }));
      }
    };

    fetchAndIncrementViews();
  }, [slug]);

  return state;
}
