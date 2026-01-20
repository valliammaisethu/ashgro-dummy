import React, { useMemo } from "react";
import { Table as AntTable, Empty } from "antd";
import { ColumnsType } from "antd/es/table";

import Pagination from "../Pagination";
import { commonColumns, defaultTableProps } from "./constants";
import { useTableSkeleton } from "./hooks/useTableSkeleton";
import { BaseRecord, TableProps } from "src/shared/types/table.type";

import styles from "./table.module.scss";

const Table = <T extends BaseRecord>({
  columns,
  dataSource = [],
  currentPage,
  totalPages,
  onPageChange,
  hasData,
  paginationClassName,
  rowSelection,
  onRow,
  loading,
  noDataComponent = <Empty />,
  nameColWidth,
  emailColWidth,
  nameColTitle,
}: TableProps<T>) => {
  const updateColumns = useMemo(
    () =>
      [...commonColumns, ...(columns || [])]?.map((col) => ({
        ...col,
        width:
          (col.key === "name" && nameColWidth) ||
          (col.key === "email" && emailColWidth) ||
          col.width,
        title: (col.key === "name" && nameColTitle) || col.title,
        ellipsis: true,
      })) as ColumnsType<T>,
    [columns, nameColWidth, emailColWidth, nameColTitle],
  );

  const { tableColumns, tableDataSource } = useTableSkeleton({
    loading,
    columns: updateColumns,
    dataSource,
  });

  return (
    <div className={styles.tableContainer}>
      <AntTable<T>
        className={styles.customTable}
        columns={tableColumns}
        dataSource={tableDataSource}
        rowSelection={rowSelection}
        onRow={loading ? undefined : onRow}
        locale={{ emptyText: noDataComponent }}
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
    </div>
  );
};

export default Table;
