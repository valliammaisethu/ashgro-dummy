import React from "react";
import { DashboardStatsCardProps } from "src/shared/types/sharedComponents.type";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import Loader from "src/shared/components/Loader";

import styles from "./statsCard.module.scss";

const StatsCard = (props: DashboardStatsCardProps) => {
  const { title, value } = props;
  return (
    <div className={styles.statsCard}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <ConditionalRenderComponent
        fallback={<Loader />}
        visible={Boolean(value)}
      >
        <h1 className={styles.cardValue}>{value}</h1>
      </ConditionalRenderComponent>
    </div>
  );
};

export default StatsCard;
