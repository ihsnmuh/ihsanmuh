import { motion, MotionConfig } from 'motion/react';
import dynamic from 'next/dynamic';
import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { cn } from '@/lib/utils';

import { EDITORIAL_EASE } from '@/components/Atoms/Motion';

import Footer from './Footer';
import Header from './Header';

const CommandPalette = dynamic(
  () => import('@/components/Molecules/CommandPalette'),
  { ssr: false },
);

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { asPath } = useRouter();

  return (
    <MotionConfig reducedMotion='user'>
      <Head>
        <style>{`:root { --font-plus-jakarta: ${plusJakarta.style.fontFamily}; --font-jetbrains-mono: ${jetbrainsMono.style.fontFamily}; }`}</style>
      </Head>
      <div
        className={cn(
          plusJakarta.className,
          plusJakarta.variable,
          jetbrainsMono.variable,
          'bg-canvas text-body min-h-screen flex flex-col selection:bg-accent-soft selection:text-ink transition-colors duration-200',
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
        <motion.main
          key={asPath.split('?')[0]}
          id='main-content'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
          className='flex-1 w-full max-w-4xl mx-auto pt-24 sm:pt-28 pb-20 px-5 sm:px-6'
        >
          {children}
        </motion.main>
        <Footer />
        <CommandPalette />
      </div>
    </MotionConfig>
  );
};

export default Layout;
