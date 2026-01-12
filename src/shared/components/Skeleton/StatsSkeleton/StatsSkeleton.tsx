import React from "react";
import { Skeleton } from "antd";
import styles from "./statsSkeleton.module.scss";

const { Input } = Skeleton;

const StatsSkeleton = () => {
  return (
    <div className={styles.statsContainer}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className={styles.statsCardSkeleton}>
          <Input active block />
          <Input active />
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;
