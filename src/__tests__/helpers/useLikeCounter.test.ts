import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useLikeCounter } from '@/helpers/useLikeCounter';

describe('useLikeCounter', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('ignores late handleLike response after slug changes', async () => {
    let resolveLikePost: (value: Response) => void = () => {};
    const postPromise = new Promise<Response>((resolve) => {
      resolveLikePost = resolve;
    });

    const fetchMock = vi.fn((url: string, init?: RequestInit) => {
      if (init?.method === 'POST' && url === '/api/likes/post-a') {
        return postPromise;
      }
      if (url === '/api/likes/post-a') {
        return Promise.resolve(
          new Response(JSON.stringify({ count: 5 }), { status: 200 }),
        );
      }
      if (url === '/api/likes/post-b') {
        return Promise.resolve(
          new Response(JSON.stringify({ count: 12 }), { status: 200 }),
        );
      }
      return Promise.reject(new Error(`Unexpected fetch: ${url}`));
    });

    vi.stubGlobal('fetch', fetchMock);

    const { result, rerender } = renderHook(
      ({ slug }) => useLikeCounter(slug),
      { initialProps: { slug: 'post-a' } },
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.likes).toBe(5);
    });

    let likeRequest: Promise<void> | undefined;
    act(() => {
      likeRequest = result.current.handleLike();
    });

    rerender({ slug: 'post-b' });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.likes).toBe(12);
      expect(result.current.isLiked).toBe(false);
    });

    await act(async () => {
      resolveLikePost(
        new Response(JSON.stringify({ count: 6 }), { status: 200 }),
      );
      await likeRequest;
    });

    expect(result.current.likes).toBe(12);
    expect(result.current.isLiked).toBe(false);
    expect(JSON.parse(localStorage.getItem('likedPosts') || '[]')).toContain(
      'post-a',
    );
  });
});
