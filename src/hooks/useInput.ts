import { ChangeEvent, useState } from 'react';

interface Props<T> {
  initialValue: T;
  validator?: (value: T) => boolean;
}

const useInput = <T = string>({ initialValue, validator }: Props<T>) => {
  const [value, setValue] = useState<T>(initialValue);
  const [isError, setIsError] = useState(false);

  const handleChangeValue = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value as T;
    setValue(value);

    if (validator && validator(value)) {
      setIsError(false);
    }
  };

  const handleValidateValue = () => {
    if (!validator) return;

    setIsError(!validator(value));
  };

  return { value, isError, handleChangeValue, handleValidateValue };
};

export default useInput;
