import { GetStaticPropsContext, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { getProducts } from '../apiFetchers/products';

import Pagination from '../components/Pagination';
import ProductList from '../components/ProductList';
import useProducts from '../hooks/products/useProducts';
import { CLIENT_PATHNAME, QUERY_KEY } from '../constants/common';

const DEFAULT_PAGE = '1';
const PAGE_RANGE = 5;

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const queryClient = new QueryClient();
  const page = (ctx.params?.page as string) || DEFAULT_PAGE;

  await queryClient.prefetchQuery(QUERY_KEY.products(page), getProducts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  const { data } = useProducts({ page: (page as string) ?? DEFAULT_PAGE });

  const handleChangePage = (page: number) => {
    router.push(`${CLIENT_PATHNAME.PAGINATION}?page=${page}`);
  };

  return (
    <Container>
      {data && (
        <>
          <ProductList products={data.products} />
          <Pagination
            defaultPage={page ? Number(page) : Number(DEFAULT_PAGE)}
            count={data.lastPage}
            range={PAGE_RANGE}
            onChangePage={handleChangePage}
          />
        </>
      )}
    </Container>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
