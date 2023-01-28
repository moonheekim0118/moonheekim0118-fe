import { atom } from 'recoil';

export const userState = atom<{ name: string }>({
  key: 'userState',
  default: {
    name: '',
  },
});
