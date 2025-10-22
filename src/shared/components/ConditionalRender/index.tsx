import { Empty } from "antd";
import React, { ReactNode } from "react";

import Loader from "../Loader";
import { noDataFound } from "src/constants/sharedComponents";

import styles from "./conditionalRender.module.scss";

interface ConditionalRenderProps<T> {
  isFetching: boolean;
  isFetched: boolean;
  records?: T[];
  children: ReactNode;
  emptyDescription?: string;
  className?: string;
  showLoader?: boolean;
}

const ConditionalRender = <T,>(props: ConditionalRenderProps<T>) => {
  const {
    records = [],
    isFetched,
    isFetching,
    children,
    emptyDescription = noDataFound,
    className,
    showLoader = true,
  } = props;

  const isDataEmpty = isFetched && records.length <= 0;

  const wrapperClass = className ?? styles.centerWrapper;

  if (isFetching && showLoader)
    return (
      <div className={wrapperClass}>
        <Loader />
      </div>
    );

  if (isDataEmpty)
    return (
      <div className={wrapperClass}>
        <Empty description={emptyDescription} />
      </div>
    );

  return <>{children}</>;
};

export default ConditionalRender;
