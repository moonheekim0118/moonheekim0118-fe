const isOnlyAlphanumeric = (value: string) => /^[A-Za-z0-9]*$/.test(value);
const isContainingAlphanumeric = (value: string) =>
  isOnlyAlphanumeric(value) && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value);

export const INPUT_ID = {
  USER_ID: 'userId',
  PASSWORD: 'password',
};

export const INPUT_CONTENTS = {
  [INPUT_ID.USER_ID]: {
    label: '아이디',
    errorMessage: '올바른 아이디 형식으로 입력해주세요.',
  },
  [INPUT_ID.PASSWORD]: {
    label: '비밀번호',
    errorMessage: '올바른 비밀번호 형식으로 입력해주세요',
  },
};

export const INPUT_VALIDATOR = {
  [INPUT_ID.USER_ID]: (value: string) => {
    return isOnlyAlphanumeric(value) && value.length >= 5 && value.length <= 30;
  },
  [INPUT_ID.PASSWORD]: (value: string) => {
    return isContainingAlphanumeric(value) && value.length >= 8 && value.length <= 30;
  },
};
