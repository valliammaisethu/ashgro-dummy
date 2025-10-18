import React from "react";
import styles from "../individualProspect.module.scss";
import Card from "src/shared/components/Card";
import Button from "src/shared/components/Button";
import { IconAdd, IconMessage } from "obra-icons-react";
import { ActivityData } from "../types";
import { headerConstants, PROSPECT_LABELS } from "../constants";

interface ActivitySectionProps {
  activities: ActivityData[];
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
      {activities.map((activity) => (
        <Card key={activity.id} className={styles.activityCard}>
          <div className={styles.title}>{activity.title}</div>
          <div className={styles.content}>{activity.content}</div>
        </Card>
      ))}
    </div>
  );
};

export default ActivitySection;
