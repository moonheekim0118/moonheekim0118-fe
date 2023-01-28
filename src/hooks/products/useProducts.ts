import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../apiFetchers/products';
import { PRODUCTS_PAGINATION_SIZE } from '../../constants/api';

interface Props {
  page: string | string[] | undefined;
}

const useProducts = ({ page }: Props) => {
  return useQuery(['products', page], getProducts, {
    select: ({ products, totalCount }) => {
      return {
        products: products,
        lastPage: Math.ceil(totalCount / PRODUCTS_PAGINATION_SIZE),
      };
    },
  });
};

export default useProducts;
