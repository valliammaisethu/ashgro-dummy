import { useCallback } from "react";
import throttle from "lodash/throttle";

import { UseInfiniteScrollProps } from "../types/pagination.type";

export const useInfiniteScroll = ({
  hasNextPage,
  isFetching,
  fetchNextPage,
  thresholdPercentage = 70,
}: UseInfiniteScrollProps) => {
  const handleScroll = useCallback(
    throttle((e: React.UIEvent<HTMLElement>) => {
      const target = e.target as HTMLElement;

      const { scrollTop, clientHeight, scrollHeight } = target;
      const scrollPosition = scrollTop + clientHeight;
      const currentScrollPercentage = (scrollPosition / scrollHeight) * 100;

      if (
        currentScrollPercentage >= thresholdPercentage &&
        hasNextPage &&
        !isFetching
      ) {
        fetchNextPage();
      }
    }, 200),
    [hasNextPage, isFetching, fetchNextPage, thresholdPercentage],
  );

  return {
    handleScroll,
  };
};
