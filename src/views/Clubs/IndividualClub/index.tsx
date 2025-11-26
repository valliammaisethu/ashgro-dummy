import React, { useState } from "react";
import { IconEdit } from "obra-icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Header from "./Header";
import ClubInfo from "./components/ClubInfo";
import ContactDetails from "./components/ContactDetails";
import NotesSection from "./components/NotesSection";
import ClubForm from "../ClubForm";
import ChatbotQuestionsModal from "../ChatbotQuestionsModal";
import { CLUB_LABELS, clubStatusField, ClubStatusOptions } from "./constants";
import Button from "src/shared/components/Button";
import Card from "src/shared/components/Card";
import StatusDropdown from "src/shared/components/StatusDropdown";
import ConditionalRender from "src/shared/components/ConditionalRender";
import Switch from "src/shared/components/Switch";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { ClubService } from "src/services/ClubService/club.service";
import { Colors } from "src/enums/colors.enum";
import { updateClubCache } from "src/shared/utils/cacheUtils";

import styles from "./individualClub.module.scss";

const IndividualClub = () => {
  const { id = "" } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { getClubProfile, updateStatus } = ClubService();

  const {
    data: clubData,
    isPending,
    isSuccess,
    isFetching,
  } = useQuery(getClubProfile(id));

  const {
    mutateAsync: updateChatbotStatusMutate,
    isPending: isChatbotUpdatePending,
  } = useMutation(updateStatus());

  const {
    mutateAsync: updateClubStatusMutate,
    isPending: isStatusUpdatePending,
  } = useMutation(updateStatus());

  const handleChatbotStatusChange = async (value: boolean) =>
    await updateChatbotStatusMutate(
      { chatbotEnabled: value, id },
      {
        onSuccess: () => {
          updateClubCache(queryClient, id, { chatbotEnabled: value });
        },
      },
    );

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleChatbotQuestionsModal = () =>
    setIsChatbotModalOpen((prev) => !prev);

  const handleStatusChange = async (value: string) => {
    await updateClubStatusMutate(
      { status: value, id },
      {
        onSuccess: () => {
          updateClubCache(queryClient, id, { status: value });
        },
      },
    );
  };

  return (
    <div className={styles.individualClub}>
      <Header
        isFetching={isFetching}
        onChatbotQuestions={handleChatbotQuestionsModal}
      />
      <ConditionalRender
        isPending={isPending}
        isSuccess={isSuccess}
        isFetching={isFetching}
        records={[clubData?.club]}
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
                  onChange={handleChatbotStatusChange}
                  loading={isChatbotUpdatePending}
                />
                <div onClick={stopPropagation} className={styles.statusCol}>
                  <StatusDropdown
                    value={clubData?.club?.status}
                    options={
                      ClubStatusOptions?.map((option) => ({
                        statusName: option.label,
                        id: option.value,
                        color: option.color,
                      })) || []
                    }
                    onChange={handleStatusChange}
                    loading={isStatusUpdatePending}
                  />
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
      <ChatbotQuestionsModal
        open={isChatbotModalOpen}
        onClose={handleChatbotQuestionsModal}
      />
    </div>
  );
};

export default IndividualClub;
