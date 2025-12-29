import React, { useState, useMemo } from "react";
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { debounce } from "lodash";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { QueryParams } from "src/models/queryParams.model";
import { DEBOUNCE_TIME } from "src/constants/common";
import { BaseSettingsModel } from "src/models/common.model";
import { Pagination } from "src/models/pagination.model";
import { DropDownProps } from "src/shared/types/sharedComponents.type";
import SelectField from "../SelectField";

interface Response<T> {
  data: T[];
  meta: Pagination;
}

interface PaginatedDropdownProps<T>
  extends Omit<DropDownProps, "options">,
    Pick<UseInfiniteQueryOptions<Response<T>>, "queryKey" | "enabled"> {
  onPageUpdate: (params: Partial<QueryParams>) => Promise<Response<T>>;
  params?: Partial<QueryParams>;
}

const PaginatedDropdown = <T extends BaseSettingsModel>({
  enabled,
  onPageUpdate,
  queryKey,
  params,
  onSearch,
  value,
  disabled,
  ...props
}: PaginatedDropdownProps<T>) => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data, isFetching, isFetchingNextPage, fetchNextPage, refetch } =
    useInfiniteQuery<Response<T>>({
      enabled: !disabled,
      initialPageParam: 1,
      queryKey: [...queryKey, search, params],
      queryFn: async ({ pageParam }) =>
        onPageUpdate({
          search,
          ...(params || {}),
          page: pageParam as number,
        }),
      getNextPageParam: (lastPage) => lastPage?.meta?.nextPage,
      getPreviousPageParam: (firstPage) => firstPage?.meta?.previousPage,
      staleTime: 0,
    });

  const options = data?.pages?.flatMap((page) => page?.data) || [];

  const displayValue = useMemo(() => {
    if (!value) return null;

    const hasValueInOptions = options.some((option) => option?.id === value);
    return hasValueInOptions ? value : undefined;
  }, [value, options]);

  const handleOptionsScroll: PaginatedDropdownProps<T>["onPopupScroll"] = (
    event,
  ) => {
    if (isFetching || isFetchingNextPage) return;

    const target = event?.target as HTMLDivElement;

    if (target.scrollTop + target.offsetHeight === target.scrollHeight)
      fetchNextPage();
  };

  const handleSearch: PaginatedDropdownProps<T>["onSearch"] = debounce(
    (search) => {
      (onSearch || setSearch)(search);
    },
    DEBOUNCE_TIME,
  );

  const handleClear = () => {
    onSearch?.("");
    setSearch("");
    refetch();
  };

  const showLoading =
    isFetching || ((value && !displayValue && !search) as boolean);

  return (
    <SelectField
      filterOption={false}
      loading={showLoading}
      onClear={handleClear}
      onPopupScroll={handleOptionsScroll}
      onSearch={handleSearch}
      options={options}
      showSearch
      value={displayValue}
      paginatedMode
      disabled={disabled}
      suffixIcon={
        <span>{isFetching && <Spin indicator={<LoadingOutlined />} />}</span>
      }
      {...(!showLoading && { allowClear: true })}
      {...props}
    />
  );
};

export default PaginatedDropdown;
