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

  const handleToggleVisibility = () => setIsActivityModalOpen((prev) => !prev);

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
            <ActivityCard key={activity?.id} activity={activity} />
          ))}
        </ConditionalRender>
      </div>

      <AddActivity
        onClose={handleToggleVisibility}
        isOpen={isActivityModalOpen}
        handleRefetch={refetch}
      />
    </div>
  );
};

export default ActivitySection;
