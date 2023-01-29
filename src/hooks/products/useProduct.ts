import { useQuery } from '@tanstack/react-query';

import { getProduct } from '../../apiFetchers/products';
import { QUERY_KEY } from '../../constants/api';

interface Props {
  id: string;
}

const useProduct = ({ id }: Props) => {
  return useQuery(QUERY_KEY.product(id), getProduct, {
    useErrorBoundary: true,
    select: (data) => {
      return data.product;
    },
    enabled: !!id,
  });
};

export default useProduct;
