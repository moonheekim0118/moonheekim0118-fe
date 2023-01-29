import styled from 'styled-components';
import { useEffect } from 'react';

import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import usePagination from '../hooks/usePagination';

interface Props {
  defaultPage: number;
  count: number;
  range: number;
  onChangePage: (value: number) => void;
}

const Pagination = ({ defaultPage, count, range, onChangePage }: Props) => {
  const { pages, currentPage, hasPrevPage, hasNextPage, changePage, goToPrevPage, goToNextPage } =
    usePagination({
      count,
      range,
      defaultPage,
    });

  useEffect(() => {
    onChangePage(currentPage);
  }, [currentPage]);

  return (
    <Container>
      <Button disabled={!hasPrevPage} onClick={goToPrevPage}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pages.map((page) => (
          <Page
            key={page}
            selected={page === currentPage}
            disabled={page === currentPage}
            onClick={() => changePage(page)}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={!hasNextPage} onClick={goToNextPage}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
