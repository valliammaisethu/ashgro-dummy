import React, { useState } from "react";
import { IconEdit } from "obra-icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Header from "./Header";
import ClubInfo from "./components/ClubInfo";
import ContactDetails from "./components/ContactDetails";
import ChatbotSection from "./components/ChatbotSection";
import NotesSection from "./components/NotesSection";
import GeneralSettingsDrawer from "./components/GeneralSettingsDrawer";
import Button from "src/shared/components/Button";
import Card from "src/shared/components/Card";
import ConditionalRender from "src/shared/components/ConditionalRender";
import Switch from "src/shared/components/Switch";
import { stopPropagation } from "src/shared/utils/eventUtils";
import ClubForm from "../ClubForm";
import ChatbotQuestionsModal from "../ChatbotQuestionsModal";
import UnlockClubModal from "./components/UnlockClubModal";
import { CLUB_LABELS, clubStatusField, ClubStatusOptions } from "./constants";
import StatusDropdown from "src/shared/components/StatusDropdown";
import { ClubService } from "src/services/ClubService/club.service";
import { Colors } from "src/enums/colors.enum";
import ImportModal from "src/views/ImportModal";
import { ImportModes } from "src/enums/importModes.enum";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

import styles from "./individualClub.module.scss";
import { ClubGeneralSettings } from "src/models/club.model";

const IndividualClub = () => {
  const { id = "" } = useParams();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);

  const { getClubProfile, updateStatus, updateGeneralSettings, unlockClub } =
    ClubService();

  const {
    data: clubData,
    isLoading: isPending,
    isSuccess,
  } = useQuery(getClubProfile(id));

  const {
    mutateAsync: updateChatbotStatusMutate,
    isPending: isChatbotUpdatePending,
  } = useMutation(updateStatus());

  const {
    mutateAsync: updateClubStatusMutate,
    isPending: isStatusUpdatePending,
  } = useMutation(updateStatus());

  const {
    mutateAsync: updateGeneralSettingsMutate,
    isPending: isSettingsUpdatePending,
  } = useMutation(updateGeneralSettings());

  const { mutateAsync: unlockClubMutate, isPending: isUnlockPending } =
    useMutation(unlockClub(id));

  const handleSaveSettings = (data: ClubGeneralSettings) => {
    updateGeneralSettingsMutate(
      {
        isBulkEmail: data.isBulkEmail,
        isLeadForms: data.isLeadForms,
        noOfCustomChartsAllowed: data.noOfCustomChartsAllowed,
        noOfEmailTemplatesAllowed: data.noOfEmailTemplatesAllowed,
        clubId: id,
      },
      {
        onSuccess: handleSettings,
      },
    );
  };

  const handleEditModal = () => setIsEditModalOpen((prev) => !prev);

  const handleSettings = () => setIsSettingsOpen((prev) => !prev);

  const handleUnlockModal = () => setIsUnlockModalOpen((prev) => !prev);

  const handleChatbotQuestionsModal = () =>
    setIsChatbotModalOpen((prev) => !prev);

  const handleChatbotStatusChange = async (value: boolean) =>
    await updateChatbotStatusMutate({ chatbotEnabled: value, id });

  const handleStatusChange = async (value: string) =>
    await updateClubStatusMutate({ status: value, id });

  return (
    <div className={styles.individualClub}>
      <Header
        isClubLocked={clubData?.club?.isClubLocked}
        isFetching={isPending}
        onSettings={handleSettings}
        onChatbotQuestions={handleChatbotQuestionsModal}
        onUnlockClub={handleUnlockModal}
      />

      <ConditionalRender
        isPending={isPending}
        isSuccess={isSuccess}
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
                    options={ClubStatusOptions.map((opt) => ({
                      statusName: opt.label,
                      id: opt.value,
                      color: opt.color,
                    }))}
                    onChange={handleStatusChange}
                    loading={isStatusUpdatePending}
                  />
                </div>
              </div>

              <div className={styles.actionButtons}>
                <Button
                  onClick={handleEditModal}
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
              {clubData?.club?.logoUrl && (
                <ChatbotSection
                  data={clubData?.club}
                  onEditKnowledgeBase={handleChatbotQuestionsModal}
                />
              )}
            </div>
          </div>

          <div className={styles.rightSide}>
            <NotesSection data={clubData?.club} />
          </div>
        </Card>
      </ConditionalRender>

      <ConditionalRenderComponent visible={isEditModalOpen} hideFallback>
        <ClubForm
          onClose={handleEditModal}
          open={isEditModalOpen}
          clubId={id}
        />
      </ConditionalRenderComponent>

      <ConditionalRenderComponent visible={isSettingsOpen} hideFallback>
        <GeneralSettingsDrawer
          open={isSettingsOpen}
          onClose={handleSettings}
          clubId={id}
          onSave={handleSaveSettings}
          isLoading={isSettingsUpdatePending}
          clubData={{
            isLeadForms: clubData?.club?.isLeadForms ?? false,
            isBulkEmail: clubData?.club?.isBulkEmail ?? false,
            noOfEmailTemplatesAllowed:
              clubData?.club?.noOfEmailTemplatesAllowed ?? 0,
            noOfCustomChartsAllowed:
              clubData?.club?.noOfCustomChartsAllowed ?? 0,
          }}
        />
      </ConditionalRenderComponent>

      <ConditionalRenderComponent visible={isChatbotModalOpen} hideFallback>
        <ChatbotQuestionsModal
          open={isChatbotModalOpen}
          onClose={handleChatbotQuestionsModal}
        />
      </ConditionalRenderComponent>

      <ConditionalRenderComponent visible={isUnlockModalOpen} hideFallback>
        <UnlockClubModal
          onClose={handleUnlockModal}
          open={isUnlockModalOpen}
          isLoading={isUnlockPending}
          onSave={unlockClubMutate}
          clubName={clubData?.club?.name}
        />
      </ConditionalRenderComponent>
      <ImportModal
        visible={isChatbotModalOpen}
        onClose={handleChatbotQuestionsModal}
        importMode={ImportModes.CHATBOT_KNOWLEDGE_BASE}
      />
    </div>
  );
};

export default IndividualClub;
