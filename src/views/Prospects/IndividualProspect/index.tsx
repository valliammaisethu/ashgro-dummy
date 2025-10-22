import React from "react";
import Header from "./Header";
import styles from "./individualProspect.module.scss";
import Card from "src/shared/components/Card";
import Button from "src/shared/components/Button";
import { IconDelete, IconEdit } from "obra-icons-react";
import ProspectInfo from "./components/ProspectInfo";
import DetailSection from "./components/DetailSection";
import ActivitySection from "./components/ActivitySection";
import { mockProspectData, mockActivities } from "./mockData";
import { PROSPECT_LABELS } from "./constants";

const IndividualProspect = () => {
  return (
    <div className={styles.individualProspect}>
      <Header />
      <Card className={styles.card}>
        <div className={styles.leftSide}>
          <div className={styles.header}>
            <Button className={styles.editButton}>
              <IconEdit strokeWidth={1.5} />
            </Button>
            <Button className={styles.deleteButton}>
              <IconDelete strokeWidth={1.5} />
            </Button>
          </div>
          <div className={styles.content}>
            <ProspectInfo
              name={mockProspectData.name}
              imageUrl={mockProspectData.imageUrl}
              followUpDate={mockProspectData.followUpDate}
              contactInfo={mockProspectData.contactInfo}
            />
            <div className={styles.bottom}>
              <DetailSection
                title={PROSPECT_LABELS.leadDetails}
                items={mockProspectData.leadDetails}
              />
              <DetailSection
                title={PROSPECT_LABELS.feesAndDues}
                items={mockProspectData.feesAndDues}
              />
            </div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <ActivitySection activities={mockActivities} activityCount={12} />
        </div>
      </Card>
    </div>
  );
};

export default IndividualProspect;
