import { MessageSquare } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import UnderlineLink from '@/components/Atoms/links/UnderlineLink';

const GISCUS_ORIGIN = 'https://giscus.app';

type GiscusCommentsProps = {
  slug: string;
  className?: string;
};

/**
 * GitHub Discussions-backed comments via Giscus.
 * Lazily injects the Giscus client when scrolled near view and keeps
 * Light/Dark theme synchronized with next-themes via postMessage.
 */
const GiscusComments = ({ slug, className }: GiscusCommentsProps) => {
  const { resolvedTheme } = useTheme();
  const sectionRef = useRef<HTMLElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'General';
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  const isConfigured = Boolean(repo && repoId && categoryId);
  const isDev = process.env.NODE_ENV === 'development';

  const giscusTheme =
    resolvedTheme === 'dark' ? 'transparent_dark' : 'noborder_light';
  const latestThemeRef = useRef(giscusTheme);
  latestThemeRef.current = giscusTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isConfigured || shouldLoad) return;

    const target = sectionRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [isConfigured, shouldLoad]);

  useEffect(() => {
    const container = mountRef.current;
    if (
      !container ||
      !mounted ||
      !shouldLoad ||
      !repo ||
      !repoId ||
      !categoryId
    ) {
      return;
    }

    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = `${GISCUS_ORIGIN}/client.js`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', slug);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '0');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', latestThemeRef.current);
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');

    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [mounted, shouldLoad, repo, repoId, category, categoryId, slug]);

  useEffect(() => {
    if (!mounted || !shouldLoad) return;

    const sendThemeToIframe = (theme: string) => {
      const iframe = mountRef.current?.querySelector<HTMLIFrameElement>(
        'iframe.giscus-frame',
      );
      iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        GISCUS_ORIGIN,
      );
    };

    sendThemeToIframe(giscusTheme);

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== GISCUS_ORIGIN) return;
      if (
        typeof event.data === 'object' &&
        event.data &&
        'giscus' in event.data
      ) {
        sendThemeToIframe(latestThemeRef.current);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [giscusTheme, mounted, shouldLoad]);

  if (!isConfigured && !isDev) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      aria-label='Article discussion'
      data-toc-exclude
      className={cn('mt-16 pt-10 border-t border-hairline', className)}
    >
      <div className='mb-6'>
        <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-2'>
          Discussion
        </p>
        {/* Use div instead of h2 so it is excluded from TOC heading queries */}
        <div className='font-primary text-2xl font-semibold tracking-tight text-ink'>
          Comments
        </div>
        <p className='text-sm text-muted mt-1'>
          Questions, feedback, or corrections? Sign in with GitHub to join the
          thread.
        </p>
      </div>

      {isConfigured ? (
        <div className='min-h-[160px] rounded-lg border border-hairline bg-surface p-4 sm:p-6'>
          <div ref={mountRef} className='giscus' />
        </div>
      ) : (
        <div className='rounded-lg border border-dashed border-hairline-strong bg-subtle/40 p-5 text-sm text-body'>
          <div className='flex items-start gap-3'>
            <MessageSquare
              size={18}
              className='text-accent shrink-0 mt-0.5'
              aria-hidden='true'
            />
            <div className='space-y-2 min-w-0'>
              <p className='font-primary font-semibold text-ink'>
                Giscus is not configured yet (dev-only preview)
              </p>
              <p className='text-xs sm:text-sm text-muted leading-relaxed'>
                Enable GitHub Discussions on your repository, generate your IDs
                at{' '}
                <UnderlineLink
                  href='https://giscus.app'
                  className='text-ink font-medium underline decoration-hairline-strong hover:decoration-accent underline-offset-4'
                >
                  giscus.app
                </UnderlineLink>
                , then add these variables to{' '}
                <code className='font-mono text-xs text-ink'>.env</code>:
              </p>
              <pre className='overflow-x-auto rounded-md border border-hairline bg-surface p-3 font-mono text-xs text-ink leading-relaxed'>
                {`NEXT_PUBLIC_GISCUS_REPO="ihsnmuh/ihsanmuh"
NEXT_PUBLIC_GISCUS_REPO_ID="..."
NEXT_PUBLIC_GISCUS_CATEGORY="General"
NEXT_PUBLIC_GISCUS_CATEGORY_ID="..."`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GiscusComments;
