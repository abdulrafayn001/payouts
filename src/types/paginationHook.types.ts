export interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  handlePageClick: (data: { selected: number }) => void;
  payouts: T[];
}

export interface PaginationHookResult<T> {
  currentPage: number;
  totalPages: number;
  handlePageClick: (data: { selected: number }) => void;
  data: T[];
}
