export interface FetchDataResult<T> {
  data: T[];
  totalPages: number;
  error?: string;
}

export type FetchDataFunction<T> = (
  searchTerm: string,
  currentPage: number
) => Promise<FetchDataResult<T>>;
