import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';

import Layout from '../components/common/Layout';
import ErrorBoundary from '../components/error/ErrorBoundary';

setupMSW();

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyle />
          <Layout>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
