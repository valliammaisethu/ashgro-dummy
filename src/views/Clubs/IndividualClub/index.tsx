import React, { useState } from "react";
import { IconChevronDown, IconEdit } from "obra-icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Select } from "antd";

import Header from "./Header";
import ClubInfo from "./components/ClubInfo";
import ContactDetails from "./components/ContactDetails";
import NotesSection from "./components/NotesSection";
import GeneralSettingsDrawer from "./components/GeneralSettingsDrawer";
import Button from "src/shared/components/Button";
import Card from "src/shared/components/Card";
import ConditionalRender from "src/shared/components/ConditionalRender";
import Switch from "src/shared/components/Switch";
import StatusTag from "src/views/Prospects/Listing/Atoms/StatusTag";
import { stopPropagation } from "src/shared/utils/eventUtils";
import ClubForm from "../ClubForm";
import ChatbotQuestionsModal from "../ChatbotQuestionsModal";
import { CLUB_LABELS, clubStatusField, ClubStatusOptions } from "./constants";
import { ClubService } from "src/services/ClubService/club.service";
import { Colors } from "src/enums/colors.enum";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import {
  ClubSettingsState,
  GeneralSettingsData,
} from "src/shared/types/clubs.type";

import styles from "./individualClub.module.scss";
import WarningModal from "./components/WarningModal";
import { ClubSettingsTypes } from "src/enums/clubSettingsTypes.enum";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

const IndividualClub = () => {
  const { id = "" } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<ClubSettingsState>({
    modalOpen: false,
    settingsOpen: false,
  });
  const queryClient = useQueryClient();
  const { getClubProfile, updateStatus, updateGeneralSettings } = ClubService();

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

  const {
    mutateAsync: updateGeneralSettingsMutate,
    isPending: isSettingsUpdatePending,
  } = useMutation(updateGeneralSettings());

  const handleChatbotStatusChange = async (value: boolean) =>
    await updateChatbotStatusMutate({ chatbotEnabled: value, id });

  const handleEditModal = () => setIsEditModalOpen((prev) => !prev);

  const handleSettings = () => {
    setIsSettingsOpen((prev) => ({
      ...prev,
      modalOpen: !prev,
    }));
  };

  const handleModalClose = () => {
    setIsSettingsOpen((prev) => ({
      ...prev,
      modalOpen: false,
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
    await updateClubStatusMutate(
      { status: value, id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.GET_CLUB_PROFILE],
          });
        },
      },
    );

  return (
    <div className={styles.individualClub}>
      <Header
        isFetching={isFetching}
        onSettings={handleSettings}
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
                  <Select
                    value={clubData?.club?.status}
                    className={styles.statusSelect}
                    style={{ width: 140 }}
                    onChange={handleStatusChange}
                    suffixIcon={<IconChevronDown size={20} />}
                    loading={isStatusUpdatePending}
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
    </div>
  );
};

export default IndividualClub;
