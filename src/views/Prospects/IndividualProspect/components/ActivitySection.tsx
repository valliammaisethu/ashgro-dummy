import React, { useState } from "react";
import { IconAdd, IconMessage, IconEdit } from "obra-icons-react";
import { useParams } from "react-router-dom";

import Card from "src/shared/components/Card";
import Button from "src/shared/components/Button";
import { headerConstants, PROSPECT_LABELS } from "../constants";
import { ActivityDetails } from "src/models/viewProspect.model";
import { formatDate } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import AddActivity from "./Activity/AddActivity";
import useDrawer from "src/shared/hooks/useDrawer";
import Transcripts from "../../Transcripts";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

import styles from "../individualProspect.module.scss";
import { Colors } from "src/enums/colors.enum";

interface ActivitySectionProps {
  activities?: ActivityDetails[];
  activityCount?: number;
  handleRefetch?: () => void;
}
// TODO: create common component for activity and use for prospects and members

const ActivitySection: React.FC<ActivitySectionProps> = ({
  activities = [],
  activityCount = 0,
  handleRefetch,
}) => {
  const { id = "" } = useParams();
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityDetails | null>(null);
  const { visible: transcriptsVisible, toggleVisibility: toggleTranscripts } =
    useDrawer();

  const handleToggleVisibility = () => setIsActivityModalOpen((prev) => !prev);

  const handleEditActivity = (activity: ActivityDetails) =>
    setSelectedActivity(activity);

  const getEditHandler = (activity: ActivityDetails) => () =>
    handleEditActivity(activity);

  const handleCloseModal = () => {
    setIsActivityModalOpen(false);
    setSelectedActivity(null);
  };
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
            onClick={toggleTranscripts}
          >
            <IconMessage />
          </Button>
          <Button className={styles.addButton} onClick={handleToggleVisibility}>
            <IconAdd />
          </Button>
        </div>
      </div>
      {activities?.map((activity) => (
        <Card key={activity.id} className={styles.activityCard}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              {activity.activityType}
              <IconEdit
                size={17}
                color={Colors.MODAL_CLOSE_ICON}
                className={styles.icon}
                onClick={getEditHandler(activity)}
              />
            </div>
            <div className={styles.date}>
              {formatDate(
                activity.createdAt,
                DateFormats.HH_MM_A__DD_MMM_YYYY,
                true,
              )}
            </div>
          </div>
          <div className={styles.content}>{activity.description}</div>
        </Card>
      ))}
      <AddActivity
        isOpen={isActivityModalOpen || !!selectedActivity}
        onClose={handleCloseModal}
        handleRefetch={handleRefetch}
        selectedActivity={selectedActivity}
      />
      <ConditionalRenderComponent visible={transcriptsVisible} hideFallback>
        <Transcripts
          visible={transcriptsVisible}
          onClose={toggleTranscripts}
          userId={id}
        />
      </ConditionalRenderComponent>
    </div>
  );
};

export default ActivitySection;
