import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { getUser, UserResponse } from '../../apiFetchers/auth';
import { userState } from '../../globalStates/auth';
import { authStore } from './utils';

const useGetUser = () => {
  const setUserState = useSetRecoilState(userState);

  return useQuery<UserResponse, AxiosError>(['user', authStore.getUserID()], getUser, {
    onSuccess: (data) => {
      setUserState({
        name: data.user.name,
      });
    },
  });
};

export default useGetUser;
