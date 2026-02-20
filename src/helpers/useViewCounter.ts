import { useEffect, useRef, useState } from 'react';

type ViewCounterState = {
  views: number;
  isLoading: boolean;
  error: string | null;
};

type UseViewCounterOptions = {
  increment?: boolean;
};

export function useViewCounter(
  slug: string,
  options: UseViewCounterOptions = {},
) {
  const { increment = true } = options;
  const [state, setState] = useState<ViewCounterState>({
    views: 0,
    isLoading: true,
    error: null,
  });
  const incrementedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    if (increment && incrementedSlug.current === slug) return;

    setState({ views: 0, isLoading: true, error: null });

    const fetchViews = async () => {
      try {
        if (increment) {
          incrementedSlug.current = slug;
        }

        const response = await fetch(`/api/views/${slug}`, {
          method: increment ? 'POST' : 'GET',
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

    fetchViews();
  }, [slug, increment]);

  return state;
}
