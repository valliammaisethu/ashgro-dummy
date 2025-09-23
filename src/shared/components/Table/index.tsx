import React from "react";
import { Table as AntTable, PaginationProps, TableProps } from "antd";
import { useSearchParams } from "react-router-dom";
import { parseNumber } from "../../utils/parser";

import styles from "./table.module.scss";

const Table = <T extends object>({ pagination, ...props }: TableProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const current = parseNumber(searchParams.get("page") || 1);

  const pageSize = parseNumber(searchParams.get("pageSize") || 1);

  const handlePageChange: PaginationProps["onChange"] = (page, pageSize) =>
    setSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

  return (
    <div className={styles.table}>
      <AntTable
        pagination={
          pagination !== false && {
            current,
            onChange: handlePageChange,
            pageSize,
            showSizeChanger: false,
            ...pagination,
          }
        }
        {...props}
      />
    </div>
  );
};

export default Table;
