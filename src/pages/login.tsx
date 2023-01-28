import type { NextPage } from 'next';
import React, { FormEvent } from 'react';
import styled from 'styled-components';

import TextInputField from '../components/TextInputField';
import { INPUT_ID, INPUT_VALIDATOR } from '../constants/input';
import useLogin from '../hooks/auth/useLogin';

import useInput from '../hooks/useInput';

const LoginPage: NextPage = () => {
  const userId = useInput({ initialValue: '', validator: INPUT_VALIDATOR[INPUT_ID.USER_ID] });
  const password = useInput({ initialValue: '', validator: INPUT_VALIDATOR[INPUT_ID.PASSWORD] });

  const submitDisabled =
    !INPUT_VALIDATOR[INPUT_ID.USER_ID](userId.value) ||
    !INPUT_VALIDATOR[INPUT_ID.PASSWORD](password.value) ||
    userId.isError ||
    password.isError;

  const { mutate: postLogin, isLoading } = useLogin();

  const login = (e: FormEvent) => {
    e.preventDefault();
    postLogin({ id: userId.value, password: password.value });
  };

  return (
    <>
      <Form onSubmit={login}>
        <TextInputField
          type='text'
          id={INPUT_ID.USER_ID}
          isError={userId.isError}
          onChange={userId.handleChangeValue}
          onBlur={userId.handleValidateValue}
        />
        <TextInputField
          type='password'
          id={INPUT_ID.PASSWORD}
          isError={password.isError}
          onChange={password.handleChangeValue}
          onBlur={password.handleValidateValue}
        />
        <LoginButton disabled={submitDisabled || isLoading} type='submit'>
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
  gap: 16px;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  &:disabled {
    background-color: #e2e2ea;
  }
`;
