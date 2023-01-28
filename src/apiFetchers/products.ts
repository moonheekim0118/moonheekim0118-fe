import { fetcher } from '.';
import { QueryFunctionContext } from '@tanstack/react-query';
import { PRODUCTS_PAGINATION_SIZE } from '../constants/api';

export const getProducts = async ({
  queryKey,
}: QueryFunctionContext): Promise<ProductsResponse> => {
  const [_, page] = queryKey;
  const { data } = await fetcher.get(`/products?page=${page}&size=${PRODUCTS_PAGINATION_SIZE}`);
  return data.data;
};

export const getProduct = async ({ queryKey }: QueryFunctionContext): Promise<ProductResponse> => {
  const [_, id] = queryKey;
  const { data } = await fetcher.get(`/products/${id}`);

  return data.data;
};

interface Product {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
}

export interface ProductResponse {
  product: Product;
}

export interface ProductsResponse {
  products: Product[];
  totalCount: number;
}
