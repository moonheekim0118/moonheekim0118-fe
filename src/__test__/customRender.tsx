import { RenderResult, render } from '@testing-library/react';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

const client = new QueryClient();

const options = client.getDefaultOptions();
options.queries = { ...options.queries, retry: false };

export const customRender = (element: ReactElement): RenderResult => {
  return render(
    <RecoilRoot>
      <QueryClientProvider client={client}>{element}</QueryClientProvider>
    </RecoilRoot>
  );
};
