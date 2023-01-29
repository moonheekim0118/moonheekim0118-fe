import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '../../constants/api';
import { authStore } from './utils';

const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    authStore.clear();
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.getUserRequiredKey] });
  };

  return logout;
};

export default useLogout;
