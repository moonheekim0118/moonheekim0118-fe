import { fireEvent, getByText } from '@testing-library/react';
import Login from '../pages/login';
import '@testing-library/jest-dom';
import { INPUT_CONTENTS, INPUT_ID } from '../constants/input';
import { customRender } from './customRender';

const setUp = () => {
  const utils = customRender(<Login />);
  const loginForm = utils.container.querySelector('form')!;
  const userIdInput = utils.getByLabelText(INPUT_CONTENTS[INPUT_ID.USER_ID].label);
  const passwordInput = utils.getByLabelText(INPUT_CONTENTS[INPUT_ID.PASSWORD].label);
  const submitButton = utils.getByText('로그인');

  return {
    loginForm,
    userIdInput,
    passwordInput,
    submitButton,
    ...utils,
  };
};

describe('로그인 페이지', () => {
  test('잘못된 아이디를 입력 하고 Input Focus Out 되었을 때, 에러 메시지를 보여준다.', () => {
    const { loginForm, userIdInput } = setUp();
    fireEvent.change(userIdInput, { target: { value: 'six-shop' } });
    fireEvent.blur(userIdInput);

    expect(getByText(loginForm, INPUT_CONTENTS[INPUT_ID.USER_ID].errorMessage)).toBeInTheDocument();
  });

  test('잘못된 비밀번호를 입력 하고 Input Focus Out 되었을 때, , 에러 메시지를 보여준다.', () => {
    const { loginForm, passwordInput } = setUp();
    fireEvent.change(passwordInput, { target: { value: 'sixshop123' } });
    fireEvent.blur(passwordInput);

    expect(
      getByText(loginForm, INPUT_CONTENTS[INPUT_ID.PASSWORD].errorMessage)
    ).toBeInTheDocument();
  });

  test('잘못된 아이디를 입력 할 경우, 로그인 버튼이 비활성화 된다.', () => {
    const { submitButton, userIdInput } = setUp();
    fireEvent.change(userIdInput, { target: { value: 'six-shop' } });
    expect(submitButton).toHaveAttribute('disabled');
  });

  test('잘못된 비밀번호를 입력 할 경우, 로그인 버튼이 비활성화 된다.', () => {
    const { submitButton, passwordInput } = setUp();
    fireEvent.change(passwordInput, { target: { value: 'six-shop' } });

    expect(submitButton).toHaveAttribute('disabled');
  });

  test('올바른 아이디를 입력 할 경우, 에러 메시지는 사라진다.', () => {
    const { loginForm, userIdInput } = setUp();
    fireEvent.change(userIdInput, { target: { value: 'six-shop' } });
    fireEvent.blur(userIdInput);
    fireEvent.change(userIdInput, { target: { value: 'sixShop1' } });

    expect(() => getByText(loginForm, INPUT_CONTENTS[INPUT_ID.USER_ID].errorMessage)).toThrow();
  });

  test('올바른 비밀번호를 입력 할 경우, 에러 메시지는 사라진다.', () => {
    const { loginForm, passwordInput } = setUp();
    fireEvent.change(passwordInput, { target: { value: 'six-shop' } });
    fireEvent.blur(passwordInput);
    fireEvent.change(passwordInput, { target: { value: 'sixShop1' } });

    expect(() => getByText(loginForm, INPUT_CONTENTS[INPUT_ID.PASSWORD].errorMessage)).toThrow();
  });

  test('올바른 아이디와 비밀번호를 입력 할 경우, 로그인 버튼이 활성화 된다.', () => {
    const { submitButton, userIdInput, passwordInput } = setUp();
    fireEvent.change(userIdInput, { target: { value: 'sixshop1' } });
    fireEvent.change(passwordInput, { target: { value: 'sixShop1' } });

    expect(submitButton).not.toHaveAttribute('disabled');
  });
});
