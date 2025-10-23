import React from "react";
import { IconAdd, IconMessage } from "obra-icons-react";

import Card from "src/shared/components/Card";
import Button from "src/shared/components/Button";
import { headerConstants, PROSPECT_LABELS } from "../constants";

import styles from "../individualProspect.module.scss";
import { ActivityDetails } from "src/models/viewProspect.model";
import { formatDate } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";

interface ActivitySectionProps {
  activities: ActivityDetails[];
  activityCount: number;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({
  activities,
  activityCount,
}) => {
  return (
    <div className={styles.activityContainer}>
      <div className={styles.header}>
        <div className={styles.activity}>
          {PROSPECT_LABELS.activity} ({activityCount})
        </div>
        <div className={styles.buttons}>
          <Button
            tooltip={{
              title: headerConstants.viewTranscripts,
            }}
            className={styles.messageButton}
          >
            <IconMessage />
          </Button>
          <Button className={styles.addButton}>
            <IconAdd />
          </Button>
        </div>
      </div>
      {activities?.map((activity) => (
        <Card key={activity.id} className={styles.activityCard}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>{activity.activityType}</div>
            <div className={styles.date}>
              {formatDate(activity.createdAt, DateFormats.HH_MM_A__DD_MMM_YYYY)}
            </div>
          </div>
          <div className={styles.content}>{activity.description}</div>
        </Card>
      ))}
    </div>
  );
};

export default ActivitySection;
