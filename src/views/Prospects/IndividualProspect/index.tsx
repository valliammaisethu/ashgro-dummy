import React from "react";
import Header from "./Header";
import styles from "./individualProspect.module.scss";
import Card from "src/shared/components/Card";
import Button from "src/shared/components/Button";
import { IconDelete, IconEdit } from "obra-icons-react";
import ProspectInfo from "./components/ProspectInfo";
import DetailSection from "./components/DetailSection";
import ActivitySection from "./components/ActivitySection";
import { PROSPECT_LABELS, DetailSectionType } from "./constants";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ConditionalRender from "src/shared/components/ConditionalRender";

const IndividualProspect = () => {
  const { viewProspect } = ProspectsService();
  const { id = "" } = useParams();
  const { data, isPending, isSuccess } = useQuery(viewProspect(id));

  return (
    <div className={styles.individualProspect}>
      <Header />
      <ConditionalRender
        isPending={isPending}
        isSuccess={isSuccess}
        records={[data?.prospect]}
      >
        <Card className={styles.card}>
          <div className={styles.leftSide}>
            <div className={styles.header}>
              <Button
                icon={<IconEdit strokeWidth={1.5} />}
                className={styles.editButton}
              />
              <Button
                icon={<IconDelete strokeWidth={1.5} />}
                className={styles.deleteButton}
              />
            </div>
            <div className={styles.content}>
              <ProspectInfo data={data?.prospect} />
              <div className={styles.bottom}>
                <DetailSection
                  title={PROSPECT_LABELS.leadDetails}
                  data={data?.prospect}
                  type={DetailSectionType.LEAD_DETAILS}
                />
                <DetailSection
                  title={PROSPECT_LABELS.feesAndDues}
                  data={data?.prospect}
                  type={DetailSectionType.FEES_AND_DUES}
                />
              </div>
            </div>
          </div>
          <div className={styles.rightSide}>
            <ConditionalRender
              records={data?.prospect.activityDetails}
              isPending={isPending}
              isSuccess={isSuccess}
            >
              <ActivitySection
                activities={data?.prospect.activityDetails}
                activityCount={data?.prospect.activityDetails.length}
              />
            </ConditionalRender>
          </div>
        </Card>
      </ConditionalRender>
    </div>
  );
};

export default IndividualProspect;
