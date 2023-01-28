import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';

setupMSW();

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <GlobalStyle />
        <Background />
        <Content>
          <Component {...pageProps} />
        </Content>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
