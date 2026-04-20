import React, { useState } from "react";
import { IconAdd } from "obra-icons-react";

import Button from "src/shared/components/Button";
import AddActivity from "src/views/Prospects/IndividualProspect/components/Activity/AddActivity";
import ActivityCard from "./atoms/ActivityCard";
import { ActivityDetails } from "src/models/viewProspect.model";
import { detailsConstants } from "../constants";

import styles from "./activitySection.module.scss";
import ConditionalRender from "src/shared/components/ConditionalRender";

interface ActivitySectionProps {
  activityCount?: number;
  activities?: ActivityDetails[];
  refetch?: () => void;
  isPending: boolean;
  isSuccess: boolean;
}
const ActivitySection = ({
  activityCount = 0,
  activities,
  refetch,
  isPending,
  isSuccess,
}: ActivitySectionProps) => {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityDetails | null>(null);

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
    <div>
      <div className={styles.activityHeader}>
        <p className={styles.activityCount}>
          {detailsConstants.activityCount} ({activityCount})
        </p>
        <Button className={styles.addButton} onClick={handleToggleVisibility}>
          <IconAdd />
        </Button>
      </div>
      <div>
        <ConditionalRender
          isPending={isPending}
          isSuccess={isSuccess}
          records={activities}
        >
          {activities?.map((activity) => (
            <ActivityCard
              key={activity?.id}
              activity={activity}
              onEdit={getEditHandler(activity)}
            />
          ))}
        </ConditionalRender>
      </div>

      <AddActivity
        isOpen={isActivityModalOpen || !!selectedActivity}
        onClose={handleCloseModal}
        handleRefetch={refetch}
        selectedActivity={selectedActivity}
      />
    </div>
  );
};

export default ActivitySection;
