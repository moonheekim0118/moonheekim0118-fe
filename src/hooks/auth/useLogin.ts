import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { login, LoginParams, LoginResponse } from '../../apiFetchers/auth';

const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, AxiosError, LoginParams>(
    ['login'],
    ({ id, password }) => login({ id, password }),
    {
      onSuccess: () => {
        router.push('/');
      },
    }
  );
};

export default useLogin;
