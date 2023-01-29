import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { getProducts } from '../apiFetchers/products';
import Pagination from '../components/Pagination';
import ProductList from '../components/ProductList';
import { CLIENT_PATHNAME } from '../constants/common';

import useProducts from '../hooks/products/useProducts';

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const queryClient = new QueryClient();
  const page = parseInt(ctx.params?.page as string) || 1;

  await queryClient.prefetchQuery(['products', page], getProducts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const PaginationPage = () => {
  const router = useRouter();
  const { page } = router.query;

  const { data } = useProducts({ page: page ?? '1' });

  const handleChangePage = (page: number) => {
    router.push(`${CLIENT_PATHNAME.PAGINATION}?page=${page}`);
  };

  return (
    <Container>
      {data && <ProductList products={data.products} />}
      {data && (
        <Pagination
          defaultPage={page ? Number(page) : 1}
          count={data.lastPage}
          range={5}
          onChangePage={handleChangePage}
        />
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
