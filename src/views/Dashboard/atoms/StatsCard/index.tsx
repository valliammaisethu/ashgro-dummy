import React from "react";
import { DashboardStatsCardProps } from "src/shared/types/sharedComponents.type";

import styles from "./statsCard.module.scss";

const StatsCard = (props: DashboardStatsCardProps) => {
  const { title, value } = props;
  return (
    <div className={styles.statsCard}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <h1 className={styles.cardValue}>{value}</h1>
    </div>
  );
};

export default StatsCard;
