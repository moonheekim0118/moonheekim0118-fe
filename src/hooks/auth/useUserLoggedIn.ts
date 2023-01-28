import { useRecoilValue } from 'recoil';
import { userState } from '../../globalStates/auth';
import useGetUser from './useGetUser';

const useUserLoggedIn = () => {
  const { isSuccess } = useGetUser();
  const user = useRecoilValue(userState);

  return { isLoggedIn: isSuccess, user };
};

export default useUserLoggedIn;
