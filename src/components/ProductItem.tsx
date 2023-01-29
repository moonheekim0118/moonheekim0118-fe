import styled from 'styled-components';
import { CLIENT_PATHNAME } from '../constants/common';

import { Product } from '../types/product';

type ProductItemProps = {
  product: Product;
};

const formatPrice = (price: number) => price.toLocaleString('kr');

const ProductItem = ({ product: { id, name, thumbnail, price } }: ProductItemProps) => {
  return (
    <Container href={`${CLIENT_PATHNAME.PRODUCTS}/${id}`}>
      <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
      <Name>{name}</Name>
      <Price>{formatPrice(price)}원</Price>
    </Container>
  );
};

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
