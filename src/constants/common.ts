export const CLIENT_PATHNAME = {
  HOME: '/',
  PAGINATION: '/pagination',
  PRODUCTS: '/products',
  LOGIN: '/login',
} as const;

export const QUERY_KEY = {
  getUserRequiredKey: 'user',
  productRequiredKey: 'product',
  productsRequiredKey: 'products',
  getUser: (id: string) => [QUERY_KEY.getUserRequiredKey, id],
  login: () => ['login'],
  product: (id: string) => [QUERY_KEY.productRequiredKey, id],
  products: (page: string) => [QUERY_KEY.productsRequiredKey, page],
} as const;
