import Pagination from '../../components/Pagination';
import '@testing-library/jest-dom';
import { customRender } from '../customRender';
import { fireEvent, getByText, waitFor } from '@testing-library/react';

const props = {
  count: 11,
  range: 5,
  onChangePage: () => {},
};

const setUp = (defaultPage?: number) => {
  const utils = customRender(<Pagination {...props} defaultPage={defaultPage ? defaultPage : 1} />);
  const buttons = Array.from(utils.container.querySelectorAll('button'));

  const prevButton = buttons.shift();
  const nextButton = buttons.pop();

  return {
    prevButton,
    nextButton,
    pageButtons: buttons,
    ...utils,
  };
};

describe('페이지네이션 컴포넌트', () => {
  test(`한 페이지 당 ${props.range}개의 올바른 범위의 페이지 버튼을 보여준다.`, () => {
    const { container } = setUp();

    for (let i = 1; i <= props.range; i++) {
      expect(getByText(container, `${i}`)).toBeInTheDocument();
    }
  });

  test('현재 선택된 페이지는 클릭 될 수 없다.', () => {
    const { container } = setUp(1);
    const currentPageButton = getByText(container, '1');

    expect(currentPageButton).toHaveAttribute('disabled');
  });

  test('첫 페이지일 경우 이전 페이지 버튼이 클릭 될 수 없다.', () => {
    const { prevButton } = setUp(1);

    expect(prevButton).toHaveAttribute('disabled');
  });

  test('마지막 페이지일 경우 다음 페이지 버튼이 클릭 될 수 없다.', () => {
    const { nextButton } = setUp(props.count);

    expect(nextButton).toHaveAttribute('disabled');
  });

  test('이전 범위 버튼을 클릭하면, 이전 범위의 마지막 페이지를 보여준다.', () => {
    const { prevButton, container } = setUp(6);
    fireEvent(prevButton!, new MouseEvent('click'));

    waitFor(() => {
      const currentButton = getByText(container, '5');

      expect(currentButton).toHaveAttribute('disabled');
    });
  });

  test('다음 범위 버튼을 클릭하면, 다음 범위의 첫 페이지를 보여준다.', () => {
    const { prevButton, container } = setUp();
    fireEvent(prevButton!, new MouseEvent('click'));

    waitFor(() => {
      const currentButton = getByText(container, '6');

      expect(currentButton).toHaveAttribute('disabled');
    });
  });
});
