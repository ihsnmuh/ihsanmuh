import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useViewIncrement } from '@/helpers/useViewCounter';

describe('useViewIncrement', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fires POST once and resolves state under React.StrictMode', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ count: 42 }), { status: 200 }),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.StrictMode, null, children);

    const { result } = renderHook(() => useViewIncrement('strict-slug'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.views).toBe(42);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/views/strict-slug', {
      method: 'POST',
    });
  });

  it('ignores stale POST response when slug changes mid-flight', async () => {
    let resolveSlugA: (value: Response) => void = () => {};
    const slugAPromise = new Promise<Response>((resolve) => {
      resolveSlugA = resolve;
    });

    const fetchMock = vi.fn((url: string) => {
      if (url === '/api/views/slug-a') return slugAPromise;
      if (url === '/api/views/slug-b') {
        return Promise.resolve(
          new Response(JSON.stringify({ count: 99 }), { status: 200 }),
        );
      }
      return Promise.reject(new Error(`Unexpected fetch: ${url}`));
    });
    vi.stubGlobal('fetch', fetchMock);

    const { result, rerender } = renderHook(
      ({ slug }) => useViewIncrement(slug),
      { initialProps: { slug: 'slug-a' } },
    );

    rerender({ slug: 'slug-b' });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.views).toBe(99);
    });

    resolveSlugA(new Response(JSON.stringify({ count: 10 }), { status: 200 }));
    await Promise.resolve();

    expect(result.current.views).toBe(99);
  });
});
