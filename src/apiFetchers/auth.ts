import { QueryFunctionContext } from '@tanstack/react-query';
import { fetcher } from '.';

export const login = async ({ id, password }: LoginParams): Promise<LoginResponse> => {
  const { data } = await fetcher.post('/login', { id, password });
  return data.data;
};

export const getUser = async ({ queryKey }: QueryFunctionContext): Promise<UserResponse> => {
  const [_, userId] = queryKey;
  const { data } = await fetcher.get(`/users/${userId}`);
  return data.data;
};

export interface LoginParams {
  id: string;
  password: string;
}

export interface UserResponse {
  user: {
    id: string;
    name: string;
  };
}

export interface LoginResponse extends UserResponse {
  accessToken: string;
}
