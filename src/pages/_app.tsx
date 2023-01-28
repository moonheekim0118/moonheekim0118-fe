import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';

import Layout from '../components/common/Layout';

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
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <GlobalStyle />
        <Layout {...props} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
