import axios from 'axios';
import NotFound from '../components/error/NotFound';
import ServerError from '../components/error/ServerError';

const BASE_URL = 'https://api.sixshop.com';

export const fetcher = axios.create({ baseURL: BASE_URL });

fetcher.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 404) {
      return Promise.reject({
        fallback: NotFound,
      });
    }
    return Promise.reject({
      fallback: ServerError,
    });
  }
);
