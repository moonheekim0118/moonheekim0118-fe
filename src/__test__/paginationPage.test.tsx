import { fireEvent, getByText, waitFor } from '@testing-library/react';
import Pagination from '../pages/pagination';
import '@testing-library/jest-dom';
import { customRender } from './customRender';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const changePageQuery = (page: string) => {
  useRouter.mockImplementationOnce(() => ({
    query: { page },
  }));
};

const setUp = (page?: string) => {
  changePageQuery(page ? page : '1');
  const utils = customRender(<Pagination />);
  return utils;
};

describe('상품 목록 조회 페이지 (페이지네이션)', () => {
  it('한 페이지 당 10개의 상품을 보여준다.', async () => {
    const { container } = setUp();
    waitFor(() => {
      const productItems = container.querySelectorAll('a');

      expect(productItems.length).toBe(10);
    });
  });

  test('상품을 클릭하면 상품 상세(/product/id) 로 이동한다.', async () => {
    const { container } = setUp();
    waitFor(() => {
      const firstItem = container.querySelector('a')!;

      expect(firstItem).toHaveAttribute('href', '/products/1');
    });
  });

  test('존재하지 않는 페이지 일 경우, 에러 메시지를 보여준다.', async () => {
    const { container } = setUp('9999');
    waitFor(() => {
      getByText(container, '존재하지 않는 페이지 입니다.');
      expect(getByText(container, '존재하지 않는 페이지 입니다.')).toBeInTheDocument();
    });
  });
});
