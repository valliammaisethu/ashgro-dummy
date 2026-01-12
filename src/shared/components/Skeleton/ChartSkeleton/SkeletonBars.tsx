import React from "react";

import styles from "./chartSkeleton.module.scss";

interface BarChartSkeletonProps {
  bars?: number;
}

const SkeletonBars: React.FC<BarChartSkeletonProps> = ({ bars = 10 }) => {
  return (
    <div className={styles.chartSkeleton}>
      <div className={styles.chartArea}>
        {Array.from({ length: bars }).map((_, index) => (
          <div key={index} className={styles.barWrapper}>
            <div
              className={styles.bar}
              style={{ height: `${40 + (index % 5) * 12}%` }}
            />
            <div className={styles.label} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonBars;
