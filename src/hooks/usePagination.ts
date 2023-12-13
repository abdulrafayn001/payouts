import { useState, useEffect } from "react";
import _ from "lodash";

import { PaginationHookResult } from "../types/paginationHook.types";
import { FetchDataFunction, FetchDataResult } from "../types";

const usePagination = <T>(
  searchTerm: string,
  fetchData: FetchDataFunction<T>
): PaginationHookResult<T> => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const fetchDataAndUpdate = _.debounce(async () => {
      const { data, totalPages, error }: FetchDataResult<T> = await fetchData(
        searchTerm,
        currentPage
      );
      const itemsPerPage = import.meta.env.VITE_ITEMS_PER_PAGE;

      if (!error) {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const payouts = searchTerm ? data.slice(start, end) : data;
        setData(payouts);
        setTotalPages(totalPages);
      } else {
        console.error("Error fetching data");
      }
    }, 500);

    fetchDataAndUpdate();
  }, [currentPage, searchTerm, fetchData]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return { currentPage, totalPages, handlePageClick, data };
};

export default usePagination;
