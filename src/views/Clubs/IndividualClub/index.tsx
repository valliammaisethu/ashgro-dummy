import React, { useState } from "react";
import { IconChevronDown, IconEdit } from "obra-icons-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Select } from "antd";

import Header from "./Header";
import ClubInfo from "./components/ClubInfo";
import ContactDetails from "./components/ContactDetails";
import NotesSection from "./components/NotesSection";
import Button from "src/shared/components/Button";
import Card from "src/shared/components/Card";
import ConditionalRender from "src/shared/components/ConditionalRender";
import Switch from "src/shared/components/Switch";
import StatusTag from "src/views/Prospects/Listing/Atoms/StatusTag";
import useDrawer from "src/shared/hooks/useDrawer";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { ClubProfile } from "src/models/club.model";
import {
  CLUB_LABELS,
  clubStatusField,
  ClubStatusOptions,
  mockClubData,
} from "./constants";
import { Colors } from "src/enums/colors.enum";
import { Statuses } from "src/enums/statuses.enum";

import styles from "./individualClub.module.scss";

const IndividualClub = () => {
  const { id = "" } = useParams();
  const [clubData] = useState<ClubProfile>(mockClubData);
  const [clubStatus, setClubStatus] = useState(mockClubData.chatbotStatus);

  // TODO: will remove while integration

  const { isPending, isSuccess, isFetching } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      return { club: mockClubData };
    },
    enabled: !!id,
  });

  const { toggleVisibility } = useDrawer();

  const handleEdit = () => {
    // TODO: Need to do integration
    toggleVisibility();
  };

  const handleChatbotQuestions = () => {
    // TODO: Need to do integration
  };

  const handleStatusChange = (value: string) => {
    setClubStatus(value);
    // TODO: Need to do integration
  };

  return (
    <div className={styles.individualClub}>
      <Header onChatbotQuestions={handleChatbotQuestions} />
      <ConditionalRender
        isPending={isPending}
        isSuccess={isSuccess}
        isFetching={isFetching}
        records={[clubData]}
        useGridSkeleton
        skeletonRows={16}
      >
        <Card className={styles.card}>
          <div className={styles.leftSide}>
            <div className={styles.header}>
              <div className={styles.chatbotStatusContainer}>
                <span className={styles.statusLabel}>
                  {CLUB_LABELS.chatbotStatus}
                </span>
                <Switch
                  name={clubStatusField}
                  checked={clubStatus === Statuses.ACTIVE}
                  className={styles.statusSwitch}
                />
                <div onClick={stopPropagation} className={styles.statusCol}>
                  <Select
                    value={clubStatus}
                    className={styles.statusSelect}
                    style={{ width: 160 }}
                    onChange={handleStatusChange}
                    suffixIcon={<IconChevronDown size={20} />}
                  >
                    {ClubStatusOptions?.map(({ value, label = "" }) => (
                      <Select.Option key={value} value={value}>
                        <StatusTag label={label} />
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className={styles.actionButtons}>
                <Button
                  onClick={handleEdit}
                  icon={
                    <IconEdit
                      color={Colors.MODAL_CLOSE_ICON}
                      size={20}
                      strokeWidth={1.75}
                    />
                  }
                  className={styles.editButton}
                />
              </div>
            </div>
            <div className={styles.content}>
              <ClubInfo data={clubData} />
              <ContactDetails data={clubData} />
            </div>
          </div>
          <div className={styles.rightSide}>
            <NotesSection notes={clubData.notes} />
          </div>
        </Card>
      </ConditionalRender>
    </div>
  );
};

export default IndividualClub;
