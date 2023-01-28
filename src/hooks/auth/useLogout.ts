import { useQueryClient } from '@tanstack/react-query';
import { authStore } from './utils';

const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    authStore.clear();
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  return logout;
};

export default useLogout;
