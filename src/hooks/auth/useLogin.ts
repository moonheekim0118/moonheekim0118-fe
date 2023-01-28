import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { login, LoginParams, LoginResponse } from '../../apiFetchers/auth';
import { authStore } from './utils';

const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, AxiosError, LoginParams>(
    ['login'],
    ({ id, password }) => login({ id, password }),
    {
      onSuccess: (data) => {
        authStore.set({ accessToken: data.accessToken, userId: data.user.id });
        router.push('/');
      },
    }
  );
};

export default useLogin;
