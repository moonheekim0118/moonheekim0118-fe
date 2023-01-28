import { useRouter } from 'next/router';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import ProductList from '../components/ProductList';

import useProducts from '../hooks/products/useProducts';

const PaginationPage = () => {
  const router = useRouter();
  const { page } = router.query;

  const { data } = useProducts({ page: page ?? '1' });

  return (
    <div>
      <Container>
        {data && <ProductList products={data.products.slice(0, 10)} />}
        {data && (
          <Pagination
            defaultPage={page ? Number(page) : 1}
            count={data.lastPage}
            range={5}
            directUrl={'/pagination?page='}
          />
        )}
      </Container>
    </div>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
