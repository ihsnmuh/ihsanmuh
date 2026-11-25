import { act, render, screen } from '@testing-library/react';
import { useTheme } from 'next-themes';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import GiscusComments from '@/components/Molecules/blog/GiscusComments';

vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

describe('GiscusComments', () => {
  let intersectionCallback: IntersectionCallback | null = null;
  const disconnectMock = vi.fn();
  const observeMock = vi.fn();

  beforeEach(() => {
    intersectionCallback = null;
    disconnectMock.mockClear();
    observeMock.mockClear();

    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'light',
      theme: 'light',
      setTheme: vi.fn(),
      themes: ['light', 'dark'],
    });

    class MockIntersectionObserver {
      constructor(cb: IntersectionCallback) {
        intersectionCallback = cb;
      }
      observe = observeMock;
      disconnect = disconnectMock;
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
      root = null;
      rootMargin = '';
      thresholds = [];
    }

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('renders nothing in production when Giscus env vars are missing', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_REPO', '');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_REPO_ID', '');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_CATEGORY_ID', '');

    const { container } = render(<GiscusComments slug='my-article' />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a helpful setup card in development when Giscus env vars are missing', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_REPO', '');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_REPO_ID', '');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_CATEGORY_ID', '');

    render(<GiscusComments slug='my-article' />);
    expect(
      screen.getByText(/Giscus is not configured yet/i),
    ).toBeInTheDocument();
  });

  it('lazily injects the Giscus script only after intersecting the viewport', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_REPO', 'ihsnmuh/ihsanmuh');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_REPO_ID', 'R_123');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_CATEGORY', 'Announcements');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_CATEGORY_ID', 'DIC_456');

    const { container } = render(<GiscusComments slug='react-19-patterns' />);

    expect(observeMock).toHaveBeenCalledTimes(1);
    expect(container.querySelector('script')).toBeNull();

    act(() => {
      intersectionCallback?.([
        { isIntersecting: true } as IntersectionObserverEntry,
      ]);
    });

    const script = container.querySelector('script');
    expect(script).not.toBeNull();
    expect(script?.getAttribute('src')).toBe('https://giscus.app/client.js');
    expect(script?.getAttribute('data-repo')).toBe('ihsnmuh/ihsanmuh');
    expect(script?.getAttribute('data-repo-id')).toBe('R_123');
    expect(script?.getAttribute('data-category')).toBe('Announcements');
    expect(script?.getAttribute('data-category-id')).toBe('DIC_456');
    expect(script?.getAttribute('data-mapping')).toBe('specific');
    expect(script?.getAttribute('data-term')).toBe('react-19-patterns');
    expect(script?.getAttribute('data-reactions-enabled')).toBe('0');
    expect(script?.getAttribute('data-input-position')).toBe('bottom');
    expect(script?.getAttribute('data-theme')).toBe('noborder_light');
    expect(disconnectMock).toHaveBeenCalled();
  });

  it('posts updated theme config to the Giscus iframe when theme changes', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_REPO', 'ihsnmuh/ihsanmuh');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_REPO_ID', 'R_123');
    vi.stubEnv('NEXT_PUBLIC_GISCUS_CATEGORY_ID', 'DIC_456');

    const { container, rerender } = render(
      <GiscusComments slug='theme-sync-post' />,
    );

    act(() => {
      intersectionCallback?.([
        { isIntersecting: true } as IntersectionObserverEntry,
      ]);
    });

    const postMessageMock = vi.fn();
    const fakeIframe = document.createElement('iframe');
    fakeIframe.className = 'giscus-frame';
    Object.defineProperty(fakeIframe, 'contentWindow', {
      value: { postMessage: postMessageMock },
    });
    container.querySelector('.giscus')?.appendChild(fakeIframe);

    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'dark',
      theme: 'dark',
      setTheme: vi.fn(),
      themes: ['light', 'dark'],
    });

    rerender(<GiscusComments slug='theme-sync-post' />);

    expect(postMessageMock).toHaveBeenCalledWith(
      { giscus: { setConfig: { theme: 'transparent_dark' } } },
      'https://giscus.app',
    );
  });
});
