import React from "react";

import { ActivityDetails } from "src/models/viewProspect.model";
import { formatDateTime } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";

import styles from "../../activitySection.module.scss";

interface ActivityCardProps {
  activity: ActivityDetails;
}
const { HH_MM_A__DD_MMM_YYYY } = DateFormats;

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const { createdAt, activityType, description } = activity;
  return (
    <div className={styles.activityCard}>
      <div className={styles.header}>
        <p className={styles.activityType}>{activityType}</p>
        <p className={styles.createdAt}>
          {formatDateTime(createdAt, HH_MM_A__DD_MMM_YYYY)}
        </p>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default ActivityCard;
