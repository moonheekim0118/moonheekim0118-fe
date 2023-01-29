import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import { INPUT_CONTENTS } from '../constants/input';

type TextInputFieldProps = {
  isError: boolean;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInputField = ({ id, isError, ...props }: TextInputFieldProps) => {
  return (
    <Container>
      <Label htmlFor={id}>{INPUT_CONTENTS[id].label}</Label>
      <Input id={id} isError={isError} {...props} />
      {isError && <ErrorMessage>{INPUT_CONTENTS[id].errorMessage}</ErrorMessage>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`;

const Input = styled.input<{ isError: boolean }>`
  margin-top: 8px;
  padding: 16px;
  border-radius: 12px;
  background: ${({ isError }) => (isError ? '#fdedee' : '#f7f7fa')};
`;

const ErrorMessage = styled.span`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;

export default TextInputField;
