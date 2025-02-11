import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import React from 'react';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import '@/styles/main.css';
import '@/styles/colors.css';

import ProgressBar from '@/components/Atoms/ProgressBar';
import Layout from '@/containers/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
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
  );
}
