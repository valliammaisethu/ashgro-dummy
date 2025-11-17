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
import { stopPropagation } from "src/shared/utils/eventUtils";
import ClubForm from "../ClubForm";
import { CLUB_LABELS, clubStatusField, ClubStatusOptions } from "./constants";
import { ClubService } from "src/services/ClubService/club.service";
import { Colors } from "src/enums/colors.enum";

import styles from "./individualClub.module.scss";

const IndividualClub = () => {
  const { id = "" } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { getClubProfile } = ClubService();

  const {
    data: clubData,
    isPending,
    isSuccess,
    isFetching,
  } = useQuery(getClubProfile(id));

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleChatbotQuestions = () => {
    // TODO: Need to do integration
  };

  const handleStatusChange = async () => {};

  return (
    <div className={styles.individualClub}>
      <Header onChatbotQuestions={handleChatbotQuestions} />
      <ConditionalRender
        isPending={isPending}
        isSuccess={isSuccess}
        isFetching={isFetching}
        records={[clubData?.club]}
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
                  checked={clubData?.club?.chatbotEnabled}
                  className={styles.statusSwitch}
                />
                <div onClick={stopPropagation} className={styles.statusCol}>
                  <Select
                    value={clubData?.club?.status}
                    className={styles.statusSelect}
                    style={{ width: 140 }}
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
              <ClubInfo data={clubData?.club} />
              <ContactDetails data={clubData?.club} />
            </div>
          </div>
          <div className={styles.rightSide}>
            <NotesSection data={clubData?.club} />
          </div>
        </Card>
      </ConditionalRender>
      <ClubForm
        onClose={handleCloseEditModal}
        open={isEditModalOpen}
        clubId={id}
      />
    </div>
  );
};

export default IndividualClub;
