import type { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import useProduct from '../../hooks/products/useProduct';

import { getProduct } from '../../apiFetchers/products';
import { QUERY_KEY } from '../../constants/api';
import { formatPrice } from '../../utilities';

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: true,
  };
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const queryClient = new QueryClient();
  const id = (ctx.params?.id as string) || '1';

  await queryClient.prefetchQuery(QUERY_KEY.product(id), getProduct);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: product } = useProduct({
    id: id as string,
  });

  return (
    <>
      {product && (
        <>
          <Thumbnail src={product.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
          <ProductInfoWrapper>
            <Name>{product.name}</Name>
            <Price>{formatPrice(product.price)}원</Price>
          </ProductInfoWrapper>
        </>
      )}
    </>
  );
};

export default ProductDetailPage;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
