import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { getUser, UserResponse } from '../../apiFetchers/auth';
import { QUERY_KEY } from '../../constants/common';
import { userState } from '../../globalStates/auth';
import { authStore } from './utils';

const useGetUser = () => {
  const setUserState = useSetRecoilState(userState);

  return useQuery<UserResponse, AxiosError>(QUERY_KEY.getUser(authStore.getUserID()), getUser, {
    onSuccess: (data) => {
      setUserState({
        name: data.user.name,
      });
    },
    enabled: !!authStore.getUserID(),
  });
};

export default useGetUser;
