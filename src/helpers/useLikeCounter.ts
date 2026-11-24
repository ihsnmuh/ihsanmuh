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
  const activeSlugRef = useRef<string>(slug);
  const hasLikedRef = useRef<boolean>(false);

  useEffect(() => {
    activeSlugRef.current = slug;
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
      return () => {
        activeSlugRef.current = '';
      };
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
      activeSlugRef.current = '';
      controller.abort();
    };
  }, [slug, interactive, initialLikes]);

  const handleLike = async () => {
    const targetSlug = slug;
    if (!interactive || !targetSlug) return;
    if (hasLikedRef.current || state.isLoading) return;

    hasLikedRef.current = true;
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`/api/likes/${targetSlug}`, {
        method: 'POST',
      });
      const data = await response.json();

      if (!response.ok) {
        if (activeSlugRef.current === targetSlug) {
          hasLikedRef.current = false;
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: data.message ?? 'Failed to like',
          }));
        }
        return;
      }

      const likedPosts = getLikedPostsFromStorage();
      if (!likedPosts.includes(targetSlug)) {
        likedPosts.push(targetSlug);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      }

      if (activeSlugRef.current === targetSlug) {
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
      }
    } catch {
      if (activeSlugRef.current === targetSlug) {
        hasLikedRef.current = false;
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    }
  };

  return { ...state, handleLike };
}
