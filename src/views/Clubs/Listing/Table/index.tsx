import React, { useState, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  clubHeaderColumnGrid,
  clubListingHeaders,
  membersText,
} from "../../constants";
import {
  chatbotKnowledgeBaseConstants,
  ClubStatusOptions,
} from "../../IndividualClub/constants";
import ImportModal from "src/views/ImportModal";
import ListHeader from "src/shared/components/atoms/Table/Profile/ListHeader";
import Profile from "src/shared/components/atoms/Table/Profile";
import Badge from "src/shared/components/atoms/Badge";
import { Colors } from "src/enums/colors.enum";
import { ImportModes } from "src/enums/importModes.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import Switch from "src/shared/components/Switch";
import ConditionalRender from "src/shared/components/ConditionalRender";
import Actions from "src/shared/components/atoms/Table/Actions";
import Notification from "src/shared/components/Notification";
import Pagination from "src/shared/components/Pagination";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { ClubListingTableProps } from "src/shared/types/clubs.type";
import { ClubService } from "src/services/ClubService/club.service";
import { extractNameParts } from "src/shared/utils/parser";
import useRedirect from "src/shared/hooks/useRedirect";
import useDrawer from "src/shared/hooks/useDrawer";
import { stopPropagation } from "src/shared/utils/eventUtils";

import styles from "../../clubs.module.scss";

const ClubListingTable = ({
  onEditClub,
  queryParams,
  setQueryParams,
}: ClubListingTableProps) => {
  const { getClubs, updateStatus } = ClubService();
  const [updatingClubId, setUpdatingClubId] = useState<string>("");
  const { navigateToInvidualClub } = useRedirect();
  const {
    toggleVisibility: handleChatbotQuestionsModal,
    visible: isChatbotModalOpen,
    hide,
  } = useDrawer();
  const {
    data: clubsData,
    isPending,
    isSuccess,
  } = useQuery(getClubs(queryParams));
  const [pendingEnableClubId, setPendingEnableClubId] = useState<string>("");

  const handlePageChange = (page: number) =>
    setQueryParams((prev) => ({ ...prev, page }));

  const {
    mutateAsync: updateChatbotStatusMutate,
    isPending: isChatbotUpdatePending,
  } = useMutation(updateStatus());

  const {
    mutateAsync: updateClubStatusMutate,
    isPending: isStatusUpdatePending,
  } = useMutation(updateStatus());

  // const handleChatbotStatusChange = async (clubId = "", value: boolean) => {
  //   setUpdatingClubId(clubId);

  //   await updateChatbotStatusMutate(
  //     { chatbotEnabled: value, id: clubId },
  //     {
  //       onSuccess: () => {
  //         setUpdatingClubId("");
  //       },
  //       onError: () => {
  //         setUpdatingClubId("");
  //       },
  //     },
  //   );
  // };

  const handleStatusChange = async (clubId = "", value: string) => {
    setUpdatingClubId(clubId);
    await updateClubStatusMutate(
      { status: value, id: clubId },
      {
        onSuccess: () => {
          setUpdatingClubId("");
        },
        onError: () => {
          setUpdatingClubId("");
        },
      },
    );
  };
  const handleEditClick = useCallback((clubId?: string) => {
    return () => {
      if (!clubId) return;
      onEditClub(clubId);
    };
  }, []);

  const handleRowClick = (clubId = "", e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigateToInvidualClub(clubId);
  };

  const handleChatbotStatusChange = async (clubId = "", value: boolean) => {
    const club = clubsData?.clubs?.find((c) => c.id === clubId);
    const currentlyEnabled = club?.chatbotEnabled;

    if (!currentlyEnabled && value) {
      Notification({
        title: chatbotKnowledgeBaseConstants.requiredError,
        description: chatbotKnowledgeBaseConstants.requiredDescription,
        type: NotificationTypes.WARNING,
      });

      setPendingEnableClubId(clubId);

      handleChatbotQuestionsModal();

      return;
    }

    if (currentlyEnabled && !value) {
      Notification({
        title: chatbotKnowledgeBaseConstants.disabledError,
        description: chatbotKnowledgeBaseConstants.disabledDescription,
        type: NotificationTypes.WARNING,
      });
    }

    setUpdatingClubId(clubId);

    await updateChatbotStatusMutate(
      { chatbotEnabled: value, id: clubId },
      {
        onSuccess: () => setUpdatingClubId(""),
        onError: () => setUpdatingClubId(""),
      },
    );
  };

  const handleImportSuccess = async (clubId: string) => {
    handleChatbotQuestionsModal();
    hide();

    setUpdatingClubId(clubId);

    await updateChatbotStatusMutate(
      { chatbotEnabled: true, id: clubId },
      {
        onSuccess: () => {
          handleChatbotQuestionsModal();
          setUpdatingClubId("");
        },
        onError: () => {
          setUpdatingClubId("");
        },
      },
    );
  };

  return (
    <div className={styles.tableContainer}>
      <ConditionalRenderComponent hideFallback visible={!isPending}>
        <ListHeader
          columnTemplate={clubHeaderColumnGrid}
          headers={clubListingHeaders}
        />
      </ConditionalRenderComponent>
      <div className={styles.tableBody}>
        <ConditionalRender
          isPending={isPending}
          isSuccess={isSuccess}
          records={clubsData?.clubs}
        >
          {clubsData?.clubs?.map((club, index) => (
            <div
              onClick={(e) => handleRowClick(club.id, e)}
              key={club?.id}
              className={styles.rowContainer}
            >
              <Profile
                address={club.address}
                firstName={extractNameParts(club.name).firstName}
                lastName={extractNameParts(club.name).lastName}
                profilePictureUrl={club?.logoUrl}
              />

              <Badge
                text={membersText(club.numberOfMembers)}
                color={Colors.DARK_GOLD}
                backgroundColor={Colors.LIGHT_GOLD}
                className={styles.badge}
              />

              <div className={styles.switchCol} onClick={stopPropagation}>
                <Switch
                  checked={club.chatbotEnabled}
                  className={styles.switch}
                  name={`switch-${index}`}
                  onChange={(value) =>
                    handleChatbotStatusChange(club.id, value)
                  }
                  loading={isChatbotUpdatePending && updatingClubId === club.id}
                />
              </div>

              <Actions
                options={ClubStatusOptions}
                onSelectChange={(value) => handleStatusChange(club.id, value)}
                onEditClick={handleEditClick(club.id)}
                selectWidth={140}
                selectedValue={club.status}
                selectLoading={
                  isStatusUpdatePending && updatingClubId === club.id
                }
              />
            </div>
          ))}
        </ConditionalRender>
      </div>
      <Pagination
        currentPage={queryParams?.page ?? clubsData?.pagination?.currentPage}
        totalPages={clubsData?.pagination?.overallPages}
        onPageChange={handlePageChange}
        hasData={!!clubsData?.clubs && clubsData.clubs.length > 0}
      />
      <ImportModal
        visible={isChatbotModalOpen}
        onClose={handleChatbotQuestionsModal}
        importMode={ImportModes.CHATBOT_KNOWLEDGE_BASE}
        onImport={() => handleImportSuccess(pendingEnableClubId)}
        clubId={pendingEnableClubId}
      />
    </div>
  );
};

export default ClubListingTable;
