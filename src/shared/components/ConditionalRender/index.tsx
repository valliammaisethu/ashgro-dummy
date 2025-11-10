import { Empty, Skeleton, SkeletonProps, Row, Col } from "antd";
import React, { ReactNode } from "react";

import Loader from "../Loader";
import { noDataFound } from "src/constants/sharedComponents";

import styles from "./conditionalRender.module.scss";

interface ConditionalRenderProps<T> {
  isPending: boolean;
  isFetching?: boolean;
  isSuccess: boolean;
  records?: T[];
  children: ReactNode;
  emptyDescription?: string;
  className?: string;
  showLoader?: boolean;
  useSkeleton?: boolean;
  skeletonProps?: SkeletonProps;
  useGridSkeleton?: boolean;
  skeletonRows?: number;
  skeletonCols?: number;
  skipEmptyState?: boolean;
}

const ConditionalRender = <T,>(props: ConditionalRenderProps<T>) => {
  const {
    records = [],
    isPending,
    isFetching,
    isSuccess,
    children,
    emptyDescription = noDataFound,
    className,
    showLoader = true,
    useSkeleton = false,
    skeletonProps,
    useGridSkeleton = false,
    skeletonRows = 6,
    skeletonCols = 2,
    skipEmptyState = false,
  } = props;

  const isDataEmpty = isSuccess && records.length <= 0 && !skipEmptyState;
  const wrapperClass = className ?? styles.centerWrapper;

  if ((isPending || isFetching) && showLoader) {
    if (useGridSkeleton) {
      const totalItems = skeletonRows * skeletonCols;
      return (
        <div className={styles.skeletonWrapper}>
          <Row gutter={[20, 20]}>
            {Array.from({ length: totalItems }).map((_, index) => (
              <Col span={24 / skeletonCols} key={index}>
                <div className={styles.skeletonBox} />
              </Col>
            ))}
          </Row>
        </div>
      );
    }

    if (useSkeleton) {
      return <Skeleton active {...skeletonProps} />;
    }

    return (
      <div className={wrapperClass}>
        <Loader />
      </div>
    );
  }

  if (isDataEmpty) {
    return (
      <div className={wrapperClass}>
        <Empty description={emptyDescription} />
      </div>
    );
  }

  return <>{children}</>;
};

export default ConditionalRender;
