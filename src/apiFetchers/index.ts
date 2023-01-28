import axios from 'axios';

const BASE_URL = 'https://api.sixshop.com';

export const fetcher = axios.create({ baseURL: BASE_URL });
