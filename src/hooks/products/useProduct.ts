import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../../apiFetchers/products';

interface Props {
  id: string;
}

const useProduct = ({ id }: Props) => {
  return useQuery(['product', id], getProduct, {
    select: (data) => {
      return data.product;
    },
  });
};

export default useProduct;
