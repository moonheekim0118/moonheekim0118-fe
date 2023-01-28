import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  count: number;
  range: number;
  defaultPage: number;
}

const getCurrentRage = (currentPage: number, range: number): number => {
  const criteria = currentPage % range === 0 ? currentPage - 1 : currentPage;

  return Math.floor(criteria / range) + 1;
};

const usePagination = ({ count, range, defaultPage }: Props) => {
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const pages = useMemo(() => {
    const currentRange = getCurrentRage(currentPage, range);
    const pages = [];

    for (let i = 1; i <= range; i++) {
      const page = i + (currentRange - 1) * range;
      pages.push(page);
      if (page >= count) return pages;
    }

    return pages;
  }, [currentPage, count, range]);

  const hasPrevPage = getCurrentRage(currentPage, range) > 1;
  const hasNextPage = getCurrentRage(currentPage, range) < getCurrentRage(count, range);

  const changePage = (page: number) => {
    if (page === currentPage) return;
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    const currentRange = getCurrentRage(currentPage, range);
    const page = currentRange * range - range;

    setCurrentPage(page);
  };

  const goToNextPage = () => {
    const currentRange = getCurrentRage(currentPage, range);
    const page = currentRange * range + 1;

    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(defaultPage);
  }, [defaultPage]);

  return { pages, currentPage, hasPrevPage, hasNextPage, changePage, goToPrevPage, goToNextPage };
};

export default usePagination;
