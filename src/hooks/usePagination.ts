import { useEffect, useMemo, useState } from 'react';

interface Props {
  count: number;
  range: number;
  defaultPage: number;
}

const getRangeNumber = (page: number, range: number): number => {
  const currentRange = page % range === 0 ? page - 1 : page;

  return Math.floor(currentRange / range) + 1;
};

const usePagination = ({ count, range, defaultPage }: Props) => {
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const pages = useMemo(() => {
    const currentRange = getRangeNumber(currentPage, range);
    const pages = [];

    for (let i = 1; i <= range; i++) {
      const page = i + (currentRange - 1) * range;
      pages.push(page);
      if (page >= count) return pages;
    }

    return pages;
  }, [currentPage, count, range]);

  const hasPrevPage = getRangeNumber(currentPage, range) > 1;
  const hasNextPage = getRangeNumber(currentPage, range) < getRangeNumber(count, range);

  const changePage = (page: number) => {
    if (page === currentPage) return;

    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    const currentRange = getRangeNumber(currentPage, range);
    const page = currentRange * range - range;

    setCurrentPage(page);
  };

  const goToNextPage = () => {
    const currentRange = getRangeNumber(currentPage, range);
    const page = currentRange * range + 1;

    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(defaultPage);
  }, [defaultPage]);

  return { pages, currentPage, hasPrevPage, hasNextPage, changePage, goToPrevPage, goToNextPage };
};

export default usePagination;
