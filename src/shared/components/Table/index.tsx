import React from "react";
import { Table as AntTable, TableProps as AntTableProps } from "antd";
import { ColumnsType } from "antd/es/table";

import Pagination from "../Pagination";
import { commonColumns, defaultTableProps } from "./constants";

import styles from "./table.module.scss";

interface BaseRecord {
  id?: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  email?: string;
}

interface TableProps<T> {
  columns: ColumnsType<T>;
  dataSource: T[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  hasData?: boolean;
  paginationClassName?: string;
  rowSelection?: AntTableProps<T>["rowSelection"];
  onRow?: AntTableProps<T>["onRow"];
}

const Table = <T extends BaseRecord>({
  columns,
  dataSource,
  currentPage,
  totalPages,
  onPageChange,
  hasData,
  paginationClassName,
  rowSelection,
  onRow,
}: TableProps<T>) => {
  const updateColumns = [...commonColumns, ...(columns || [])]?.map((col) => ({
    ...col,
    ellipsis: true,
  })) as ColumnsType<T>;

  return (
    <>
      <AntTable<T>
        className={styles.customTable}
        columns={updateColumns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        onRow={onRow}
        {...defaultTableProps}
      />
      {onPageChange && (
        <Pagination
          className={paginationClassName}
          currentPage={currentPage || 1}
          totalPages={totalPages || 1}
          onPageChange={onPageChange}
          hasData={hasData}
        />
      )}
    </>
  );
};

export default Table;
