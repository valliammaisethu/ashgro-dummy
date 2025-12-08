import { QueryKey } from "@tanstack/react-query";

import { Pagination } from "src/models/pagination.model";

export interface PaginatedResponse<T> {
  data: T[];
  meta: Pagination;
}

export interface UsePaginatedQueryProps<T, P> {
  queryKey: QueryKey;
  fetchPage: (params: P & { page: number }) => Promise<PaginatedResponse<T>>;
  params?: P;
}

export interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  thresholdPercentage?: number;
}
