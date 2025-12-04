import { useInfiniteQuery } from "@tanstack/react-query";

import {
  PaginatedResponse,
  UsePaginatedQueryProps,
} from "src/shared/types/pagination.type";

export const usePaginatedQuery = <T, P extends object>({
  queryKey,
  fetchPage,
  params,
}: UsePaginatedQueryProps<T, P>) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isSuccess,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery<PaginatedResponse<T>>({
    queryKey: [...queryKey, params],
    queryFn: ({ pageParam = 1 }) =>
      fetchPage({
        ...(params || {}),
        page: pageParam,
      } as P & { page: number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.meta?.nextPage,
    getPreviousPageParam: (firstPage) => firstPage?.meta?.previousPage,
  });

  const response = data?.pages?.flatMap((page) => page?.data) || [];

  return {
    items: response,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    isSuccess,
    isLoading,
  };
};
