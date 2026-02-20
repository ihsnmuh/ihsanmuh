import { useEffect, useState } from 'react';

type ViewCounterState = {
  views: number;
  isLoading: boolean;
  error: string | null;
};

type UseViewCounterOptions = {
  /** When provided, skip fetch and use this value (e.g. from batch pre-fetch) */
  initialViews?: number;
};

/** Fetches view count with GET only. Never increments. */
export function useViewCounter(
  slug: string,
  options: UseViewCounterOptions = {},
) {
  const { initialViews } = options;
  const [state, setState] = useState<ViewCounterState>({
    views: typeof initialViews === 'number' ? initialViews : 0,
    isLoading: typeof initialViews !== 'number',
    error: null,
  });

  useEffect(() => {
    if (!slug) return;
    if (typeof initialViews === 'number') {
      setState({ views: initialViews, isLoading: false, error: null });
      return;
    }

    setState({ views: 0, isLoading: true, error: null });

    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`, { method: 'GET' });
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

    fetchViews();
  }, [slug, initialViews]);

  return state;
}

type ViewIncrementState = {
  views: number;
  isLoading: boolean;
  error: string | null;
};

/** POSTs to increment view count once on mount. Use on article detail page. */
export function useViewIncrement(slug: string) {
  const [state, setState] = useState<ViewIncrementState>({
    views: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!slug) return;

    const incrementView = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`, { method: 'POST' });
        const data = await response.json();

        setState({
          views: data.count ?? 0,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.warn('View increment error (non-critical):', error);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          views: 0,
        }));
      }
    };

    incrementView();
  }, [slug]);

  return state;
}
