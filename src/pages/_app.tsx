import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'next-themes';
import React from 'react';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import '@/styles/base.css';
import '@/styles/main.css';
import '@/styles/utilities.css';
import '@/styles/globals.css';
import '@/styles/mdx.css';

import ProgressBar from '@/components/Atoms/ProgressBar';
import ErrorBoundary from '@/components/Organism/ErrorBoundary';
import Layout from '@/containers/layout/Layout';

const ReactQueryDevtools =
  process.env.NODE_ENV === 'development'
    ? dynamic(
        () =>
          import('@tanstack/react-query-devtools').then(
            (mod) => mod.ReactQueryDevtools,
          ),
        { ssr: false },
      )
    : () => null;

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <ErrorBoundary>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ProgressBar />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
