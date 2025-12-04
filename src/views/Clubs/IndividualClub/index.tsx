import React, { useState } from "react";
import { IconEdit } from "obra-icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Header from "./Header";
import ClubInfo from "./components/ClubInfo";
import ContactDetails from "./components/ContactDetails";
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
import { QueryKeys } from "src/enums/cacheEvict.enum";
import { ClubSettingsState } from "src/shared/types/clubs.type";
import { ClubGeneralSettings } from "src/models/club.model";
import WarningModal from "./components/WarningModal";
import { ClubSettingsTypes } from "src/enums/clubSettingsTypes.enum";

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
  const [formValues, setFormValues] = useState<ClubGeneralSettings | null>(
    null,
  );
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

  const handleChatbotStatusChange = async (value: boolean) =>
    await updateChatbotStatusMutate({ chatbotEnabled: value, id });

  const handleEditModal = () => setIsEditModalOpen((prev) => !prev);

  const handleSettings = () => {
    setIsSettingsOpen((prev) => ({
      ...prev,
      settingsOpen: !prev.settingsOpen,
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

  const updateGeneral = async (data: ClubGeneralSettings) => {
    await updateGeneralSettingsMutate(
      { ...data, clubId: id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.GET_CLUB_PROFILE],
          });
          handleSettings();
          setFormValues(null);
        },
      },
    );
  };

  const handleSaveSettings = async (data: ClubGeneralSettings) => {
    if (
      !clubData?.club?.noOfCustomChartsAllowed ||
      !clubData?.club?.noOfEmailTemplatesAllowed ||
      !id ||
      !data ||
      !data?.noOfCustomChartsAllowed ||
      !data?.noOfEmailTemplatesAllowed
    )
      return;

    const isReducingCharts =
      data?.noOfCustomChartsAllowed < clubData?.club?.noOfCustomChartsAllowed;

    const isReducingTemplates =
      data.noOfEmailTemplatesAllowed <
      clubData?.club?.noOfEmailTemplatesAllowed;

    setFormValues(data);

    if (isReducingCharts || isReducingTemplates) {
      setIsSettingsOpen((prev) => ({ ...prev, modalOpen: true }));
      return;
    }

    updateGeneral(data);
  };

  const handleOverrideSaveSettings = async () => {
    if (!formValues) return;
    await updateGeneral(formValues);
    setIsSettingsOpen((prev) => ({
      ...prev,
      modalOpen: false,
      settingsOpen: false,
    }));
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
            </div>
          </div>
          <div className={styles.rightSide}>
            <NotesSection data={clubData?.club} />
          </div>
        </Card>
      </ConditionalRender>
      <ClubForm onClose={handleEditModal} open={isEditModalOpen} clubId={id} />
      <GeneralSettingsDrawer
        open={isSettingsOpen.settingsOpen}
        onClose={handleSettings}
        clubId={id}
        onSave={handleSaveSettings}
        isLoading={isSettingsUpdatePending}
        clubData={clubData}
      />
      <WarningModal
        open={isSettingsOpen.modalOpen}
        onClose={handleModalClose}
        onSave={handleOverrideSaveSettings}
        type={ClubSettingsTypes.TEMPLATES}
        isLoading={isSettingsUpdatePending}
      />
      <ChatbotQuestionsModal
        open={isChatbotModalOpen}
        onClose={handleChatbotQuestionsModal}
      />
      <UnlockClubModal
        onClose={handleUnlockModal}
        open={isSettingsOpen.unlockModalOpen}
        isLoading={isUnlockPending}
        onSave={unlockClubMutate}
        clubName={clubData?.club?.name}
      />
    </div>
  );
};

export default IndividualClub;
