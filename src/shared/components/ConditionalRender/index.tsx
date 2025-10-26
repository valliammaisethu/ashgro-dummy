import { Empty, Skeleton, SkeletonProps } from "antd";
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
}

const ConditionalRender = <T,>(props: ConditionalRenderProps<T>) => {
  const {
    records = [],
    isPending,
    isSuccess,
    children,
    emptyDescription = noDataFound,
    className,
    showLoader = true,
    useSkeleton = false,
    skeletonProps,
    isFetching,
  } = props;

  const isDataEmpty = isSuccess && records.length <= 0;

  const wrapperClass = className ?? styles.centerWrapper;

  if ((isPending || isFetching) && showLoader) {
    if (useSkeleton) {
      return <Skeleton active {...skeletonProps} />;
    }

    if ((isPending || isFetching) && showLoader) {
      return (
        <div className={wrapperClass}>
          <Loader />
        </div>
      );
    }
  }

  if (isDataEmpty)
    return (
      <div className={wrapperClass}>
        <Empty description={emptyDescription} />
      </div>
    );

  return <>{children}</>;
};

export default ConditionalRender;
