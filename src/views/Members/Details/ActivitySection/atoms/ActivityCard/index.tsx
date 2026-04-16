import React from "react";
import { IconEdit } from "obra-icons-react";

import { ActivityDetails } from "src/models/viewProspect.model";
import { formatDate } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import { Colors } from "src/enums/colors.enum";

import styles from "../../activitySection.module.scss";

interface ActivityCardProps {
  activity: ActivityDetails;
  onEdit: () => void;
}
const { HH_MM_A__DD_MMM_YYYY } = DateFormats;

// TODO: create common component for activity and use for prospects and members

const ActivityCard = ({ activity, onEdit }: ActivityCardProps) => {
  const { createdAt, activityType, description } = activity;
  return (
    <div className={styles.activityCard}>
      <div className={styles.header}>
        <p className={styles.activityType}>
          {activityType}
          <IconEdit
            size={17}
            color={Colors.MODAL_CLOSE_ICON}
            className={styles.icon}
            onClick={onEdit}
          />
        </p>
        <p className={styles.createdAt}>
          {formatDate(createdAt, HH_MM_A__DD_MMM_YYYY, true)}
        </p>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default ActivityCard;
