import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import '@/styles/main.css';
import '@/styles/colors.css';

import Layout from '@/containers/Layout/Layout';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
