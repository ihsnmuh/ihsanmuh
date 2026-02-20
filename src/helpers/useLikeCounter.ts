import { useEffect, useRef, useState } from 'react';

type LikeCounterState = {
  likes: number;
  isLiked: boolean;
  isLoading: boolean;
  error: string | null;
};

export function useLikeCounter(slug: string) {
  const [state, setState] = useState<LikeCounterState>({
    likes: 0,
    isLiked: false,
    isLoading: true,
    error: null,
  });
  const hasLikedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!slug) return;

    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/likes/${slug}`);
        const data = await response.json();

        const likedPosts =
          JSON.parse(localStorage.getItem('likedPosts') || '[]') || [];
        const isLiked = likedPosts.includes(slug);
        hasLikedRef.current = isLiked;

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
  }, [slug]);

  const handleLike = async () => {
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
