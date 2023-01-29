import { getByText, waitFor } from '@testing-library/react';
import Products from '../../pages/products/[id]';
import '@testing-library/jest-dom';
import { customRender } from '../customRender';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const changePageQuery = (id: string) => {
  useRouter.mockImplementationOnce(() => ({
    query: { id },
  }));
};

const setUp = (id?: string) => {
  changePageQuery(id ? id : '1');
  return customRender(<Products />);
};

describe('상품 상세 페이지', () => {
  test('존재하지 않는 페이지 일 경우, 에러 메시지를 보여준다.', async () => {
    const { container } = setUp('9999');

    waitFor(() => {
      getByText(container, '존재하지 않는 페이지 입니다.');
      expect(getByText(container, '존재하지 않는 페이지 입니다.')).toBeInTheDocument();
    });
  });
});
