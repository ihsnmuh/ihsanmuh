import type { domMax } from 'motion/react';
import { LazyMotion, MotionConfig } from 'motion/react';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { cn } from '@/lib/utils';

import SanReactor from '@/components/Organism/SanReactor';

import Footer from './Footer';
import Header from './Header';

const CommandPalette = dynamic(
  () => import('@/components/Molecules/CommandPalette'),
  { ssr: false },
);

const plusJakarta = localFont({
  src: [
    {
      path: '../../fonts/plus-jakarta-sans-latin.woff2',
      weight: '200 800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

const jetbrainsMono = localFont({
  src: [
    {
      path: '../../fonts/jetbrains-mono-latin.woff2',
      weight: '100 800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  adjustFontFallback: false,
});

/**
 * Loads motion's animation features after the page has loaded and the main thread is idle,
 * so the feature bundle stays out of the critical load path.
 */
const loadMotionFeatures = () =>
  new Promise<typeof domMax>((resolve) => {
    const load = () => {
      const run = () =>
        import('@/lib/motionFeatures').then((mod) => resolve(mod.default));
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(run, { timeout: 2000 });
      } else {
        setTimeout(run, 200);
      }
    };

    if (document.readyState === 'complete') load();
    else window.addEventListener('load', load, { once: true });
  });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { asPath } = useRouter();

  return (
    <LazyMotion strict features={loadMotionFeatures}>
      <MotionConfig reducedMotion='user'>
        <Head>
          <style>{`:root { --font-plus-jakarta: ${plusJakarta.style.fontFamily}; --font-jetbrains-mono: ${jetbrainsMono.style.fontFamily}; }`}</style>
        </Head>
        <div
          className={cn(
            plusJakarta.className,
            plusJakarta.variable,
            jetbrainsMono.variable,
            'bg-canvas text-body min-h-screen flex flex-col overflow-x-clip selection:bg-accent-soft selection:text-ink transition-colors duration-200',
          )}
        >
          <a
            href='#main-content'
            className={cn(
              'sr-only focus:not-sr-only',
              'fixed top-4 left-4 z-[60] px-4 py-2',
              'bg-cta text-cta-fg rounded-md border border-hairline text-sm font-medium',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
            )}
          >
            Skip to content
          </a>
          <Header />
          <main
            key={asPath.split(/[?#]/)[0]}
            id='main-content'
            className='flex-1 w-full max-w-4xl mx-auto pt-24 sm:pt-28 pb-20 px-5 sm:px-6'
          >
            {children}
          </main>
          <Footer />
          <CommandPalette />
          <SanReactor />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
};

export default Layout;
