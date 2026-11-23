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
    if (typeof initialLikes === 'number') {
      let isLiked = false;
      if (interactive) {
        const likedPosts =
          JSON.parse(localStorage.getItem('likedPosts') || '[]') || [];
        isLiked = likedPosts.includes(slug);
        hasLikedRef.current = isLiked;
      }
      setState({
        likes: initialLikes,
        isLiked,
        isLoading: false,
        error: null,
      });
      return;
    }

    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/likes/${slug}`);
        const data = await response.json();

        let isLiked = false;
        if (interactive) {
          const likedPosts =
            JSON.parse(localStorage.getItem('likedPosts') || '[]') || [];
          isLiked = likedPosts.includes(slug);
          hasLikedRef.current = isLiked;
        }

        setState({
          likes: data.count ?? 0,
          isLiked,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          likes: 0,
        }));
      }
    };

    fetchLikes();
  }, [slug, interactive, initialLikes]);

  const handleLike = async () => {
    if (!interactive) return;
    if (hasLikedRef.current || state.isLoading) return;

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`/api/likes/${slug}`, {
        method: 'POST',
      });
      const data = await response.json();

      if (!response.ok) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: data.message ?? 'Failed to like',
        }));
        return;
      }

      const likedPosts =
        JSON.parse(localStorage.getItem('likedPosts') || '[]') || [];
      likedPosts.push(slug);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

      hasLikedRef.current = true;

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
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  return { ...state, handleLike };
}
