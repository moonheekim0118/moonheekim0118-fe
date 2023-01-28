import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import useProduct from '../../hooks/products/useProduct';
import { useRouter } from 'next/router';

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
            <Price>{product.price}원</Price>
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
