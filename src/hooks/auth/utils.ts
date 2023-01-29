interface AuthStore {
  accessToken: string;
  userId: string;
}

export const authStore = {
  set: (data: AuthStore) => {
    typeof window !== 'undefined' ? sessionStorage.setItem('auth', JSON.stringify(data)) : '';
  },

  getAccessSToken: (): string => {
    return typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('auth') ?? '{}')?.accessToken ?? ''
      : '';
  },

  getUserID: (): string => {
    return typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('auth') ?? '{}')?.userId ?? ''
      : '';
  },

  clear: () => {
    typeof window !== 'undefined' ? sessionStorage.removeItem('auth') : '';
  },
};
