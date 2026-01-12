import React, { useMemo } from "react";
import { Skeleton } from "antd";
import { ColumnType } from "antd/es/table";

import { LoaderSizes } from "src/enums/LoaderSizes";
import { SKELETON_KEYS } from "../constants";
import { replaceString } from "src/shared/utils/commonHelpers";
import { UseTableSkeletonProps } from "src/shared/types/table.type";

import styles from "../table.module.scss";

const { SMALL, DEFAULT } = LoaderSizes;
const { NAME, STATUS, CIRCLE, SKELETON_KEY } = SKELETON_KEYS;

export const useTableSkeleton = <T extends object>({
  loading,
  columns,
  dataSource,
}: UseTableSkeletonProps<T>) => {
  return useMemo(() => {
    if (loading) {
      const skeletonDataSource = Array.from({ length: 10 }).map(
        (_, index) =>
          ({
            id: replaceString(SKELETON_KEY, String(index)),
          }) as T,
      );

      const skeletonColumns = columns.slice(0, -1).map((col) => {
        const key = String(
          col.key || (col as ColumnType<T>).dataIndex || "",
        ).toLowerCase();
        let renderSkeleton;

        if (key === NAME) {
          renderSkeleton = () => (
            <div className={styles.skeletonNameWrapper}>
              <Skeleton.Avatar active size={DEFAULT} shape={CIRCLE} />
              <Skeleton.Input
                active
                size={SMALL}
                className={styles.skeletonNameInput}
              />
            </div>
          );
        } else if (key.includes(STATUS)) {
          renderSkeleton = () => (
            <Skeleton.Button
              active
              size={SMALL}
              className={styles.skeletonStatusButton}
            />
          );
        } else {
          renderSkeleton = () => (
            <Skeleton.Input
              active
              size={SMALL}
              className={styles.skeletonGenericInput}
            />
          );
        }

        return {
          ...col,
          ellipsis: false,
          render: renderSkeleton,
        };
      });

      return {
        tableColumns: skeletonColumns,
        tableDataSource: skeletonDataSource,
      };
    }
    return { tableColumns: columns, tableDataSource: dataSource };
  }, [loading, columns, dataSource]);
};
