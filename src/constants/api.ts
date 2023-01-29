export const PRODUCTS_PAGINATION_SIZE = 10;

export const QUERY_KEY = {
  getUserRequiredKey: 'user',
  productRequiredKey: 'product',
  productsRequiredKey: 'products',
  getUser: (id: string) => [QUERY_KEY.getUserRequiredKey, id],
  login: () => ['login'],
  product: (id: string) => [QUERY_KEY.productRequiredKey, id],
  products: (page: string) => [QUERY_KEY.productsRequiredKey, page],
} as const;
