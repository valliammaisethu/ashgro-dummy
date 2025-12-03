import React, { useState } from "react";
import { IconEdit } from "obra-icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import Notification from "src/shared/components/Notification";
import { stopPropagation } from "src/shared/utils/eventUtils";
import ClubForm from "../ClubForm";
import ChatbotQuestionsModal from "../ChatbotQuestionsModal";
import UnlockClubModal from "./components/UnlockClubModal";
import {
  chatbotKnowledgeBaseConstants,
  CLUB_LABELS,
  clubStatusField,
  ClubStatusOptions,
} from "./constants";
import StatusDropdown from "src/shared/components/StatusDropdown";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { ClubService } from "src/services/ClubService/club.service";
import { Colors } from "src/enums/colors.enum";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import { ClubSettingsTypes } from "src/enums/clubSettingsTypes.enum";
import { ImportModes } from "src/enums/importModes.enum";
import {
  ClubSettingsState,
  GeneralSettingsData,
} from "src/shared/types/clubs.type";
import ImportModal from "src/views/ImportModal";
import WarningModal from "./components/WarningModal";

import styles from "./individualClub.module.scss";

const IndividualClub = () => {
  const { id = "" } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<ClubSettingsState>({
    modalOpen: false,
    settingsOpen: false,
    unlockModalOpen: false,
  });
  const [pendingChatbotEnable, setPendingChatbotEnable] = useState(false);
  const queryClient = useQueryClient();
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

  const handleChatbotStatusChange = async (value: boolean) => {
    const currentlyEnabled = clubData?.club?.chatbotEnabled;

    if (!currentlyEnabled && value) {
      Notification({
        title: chatbotKnowledgeBaseConstants.requiredError,
        description: chatbotKnowledgeBaseConstants.requiredDescription,
        type: NotificationTypes.WARNING,
      });
      setPendingChatbotEnable(true);
      setIsChatbotModalOpen(true);
      return;
    }

    if (currentlyEnabled && !value) {
      Notification({
        title: chatbotKnowledgeBaseConstants.disabledError,
        description: chatbotKnowledgeBaseConstants.disabledDescription,
        type: NotificationTypes.WARNING,
      });
    }

    await updateChatbotStatusMutate({ chatbotEnabled: value, id });
  };

  const handleImportSuccess = async () => {
    if (pendingChatbotEnable) {
      await updateChatbotStatusMutate({ chatbotEnabled: true, id });
      setPendingChatbotEnable(false);
    }

    setIsChatbotModalOpen(false);
  };

  const handleEditModal = () => setIsEditModalOpen((prev) => !prev);

  const handleSettings = () => {
    setIsSettingsOpen((prev) => ({
      ...prev,
      modalOpen: !prev.settingsOpen,
    }));
  };

  const handleModalClose = () => {
    setIsSettingsOpen((prev) => ({
      ...prev,
      modalOpen: !prev.modalOpen,
    }));
  };

  const handleUnlockModal = () => {
    setIsSettingsOpen((prev) => ({
      ...prev,
      unlockModalOpen: !prev.unlockModalOpen,
    }));
  };

  const handleSaveSettings = async (data: GeneralSettingsData) => {
    if (!id) return;
    await updateGeneralSettingsMutate(
      { ...data, clubId: id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.GET_CLUB_PROFILE],
          });
          handleSettings();
        },
      },
    );
  };

  const handleChatbotQuestionsModal = () =>
    setIsChatbotModalOpen((prev) => !prev);

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
      <ConditionalRenderComponent hideFallback visible={isEditModalOpen}>
        <ClubForm
          onClose={handleEditModal}
          open={isEditModalOpen}
          clubId={id}
        />
      </ConditionalRenderComponent>

      <ConditionalRenderComponent
        hideFallback
        visible={isSettingsOpen.settingsOpen}
      >
        <GeneralSettingsDrawer
          open={isSettingsOpen.settingsOpen}
          onClose={handleSettings}
          clubId={id}
          webFormsEnabled={clubData?.club?.webFormsEnabled}
          bulkEmailEnabled={clubData?.club?.bulkEmailEnabled}
          emailTemplatesAllowed={clubData?.club?.emailTemplatesAllowed}
          customChartsAllowed={clubData?.club?.customChartsAllowed}
          onSave={handleSaveSettings}
          isLoading={isSettingsUpdatePending}
        />
      </ConditionalRenderComponent>

      <ConditionalRenderComponent
        hideFallback
        visible={isSettingsOpen.modalOpen}
      >
        <WarningModal
          open={isSettingsOpen.modalOpen}
          onClose={handleModalClose}
          onSave={() => {}}
          type={ClubSettingsTypes.TEMPLATES}
        />
      </ConditionalRenderComponent>
      <ConditionalRenderComponent hideFallback visible={isChatbotModalOpen}>
        <ChatbotQuestionsModal
          open={isChatbotModalOpen}
          onClose={handleChatbotQuestionsModal}
        />
      </ConditionalRenderComponent>
      <ConditionalRenderComponent
        visible={isSettingsOpen.unlockModalOpen}
        hideFallback
      >
        <UnlockClubModal
          onClose={handleUnlockModal}
          open={isSettingsOpen.unlockModalOpen}
          isLoading={isUnlockPending}
          onSave={unlockClubMutate}
          clubName={clubData?.club?.name}
        />
      </ConditionalRenderComponent>
      <ImportModal
        visible={isChatbotModalOpen}
        onClose={handleChatbotQuestionsModal}
        importMode={ImportModes.CHATBOT_KNOWLEDGE_BASE}
        onImport={handleImportSuccess}
      />
    </div>
  );
};

export default IndividualClub;
