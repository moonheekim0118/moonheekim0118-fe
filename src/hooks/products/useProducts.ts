import { useQuery } from '@tanstack/react-query';

import { getProducts } from '../../apiFetchers/products';
import { PRODUCTS_PAGINATION_SIZE } from '../../constants/api';
import { QUERY_KEY } from '../../constants/api';

interface Props {
  page: string;
}

const useProducts = ({ page }: Props) => {
  return useQuery(QUERY_KEY.products(page), getProducts, {
    useErrorBoundary: true,
    select: ({ products, totalCount }) => {
      return {
        products: products,
        lastPage: Math.ceil(totalCount / PRODUCTS_PAGINATION_SIZE),
      };
    },
  });
};

export default useProducts;
