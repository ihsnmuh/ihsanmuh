import { useEffect, useRef, useState } from 'react';

type LikeCounterState = {
  likes: number;
  isLiked: boolean;
  isLoading: boolean;
  error: string | null;
};

type UseLikeCounterOptions = {
  interactive?: boolean;
  /** When provided, skip fetch and use this value (e.g. from batch pre-fetch) */
  initialLikes?: number;
};

const getLikedPostsFromStorage = (): string[] => {
  try {
    const raw = localStorage.getItem('likedPosts');
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function useLikeCounter(
  slug: string,
  options: UseLikeCounterOptions = {},
) {
  const { interactive = true, initialLikes } = options;
  const [state, setState] = useState<LikeCounterState>({
    likes: typeof initialLikes === 'number' ? initialLikes : 0,
    isLiked: false,
    isLoading: typeof initialLikes !== 'number',
    error: null,
  });
  const hasLikedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!slug) return;

    const likedForSlug = interactive
      ? getLikedPostsFromStorage().includes(slug)
      : false;
    hasLikedRef.current = likedForSlug;

    if (typeof initialLikes === 'number') {
      setState({
        likes: initialLikes,
        isLiked: likedForSlug,
        isLoading: false,
        error: null,
      });
      return;
    }

    const controller = new AbortController();
    let cancelled = false;
    setState({
      likes: 0,
      isLiked: likedForSlug,
      isLoading: true,
      error: null,
    });

    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/likes/${slug}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!cancelled) {
          setState({
            likes: data.count ?? 0,
            isLiked: likedForSlug,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled && (error as Error).name !== 'AbortError') {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            likes: 0,
          }));
        }
      }
    };

    fetchLikes();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [slug, interactive, initialLikes]);

  const handleLike = async () => {
    if (!interactive) return;
    if (hasLikedRef.current || state.isLoading) return;

    hasLikedRef.current = true;
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`/api/likes/${slug}`, {
        method: 'POST',
      });
      const data = await response.json();

      if (!response.ok) {
        hasLikedRef.current = false;
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: data.message ?? 'Failed to like',
        }));
        return;
      }

      const likedPosts = getLikedPostsFromStorage();
      if (!likedPosts.includes(slug)) {
        likedPosts.push(slug);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      }

      setState((prev) => {
        const newCount =
          typeof data.count === 'number' ? data.count : prev.likes + 1;
        return {
          ...prev,
          likes: newCount,
          isLiked: true,
          isLoading: false,
          error: null,
        };
      });
    } catch {
      hasLikedRef.current = false;
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  return { ...state, handleLike };
}
