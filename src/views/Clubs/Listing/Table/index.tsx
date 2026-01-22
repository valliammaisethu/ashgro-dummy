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
import ClubListSkeleton from "src/shared/components/Skeleton/ClubListSkeleton/ClubListSkeleton";
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
import { ClubListData } from "src/models/club.model";

import styles from "../../clubs.module.scss";

const { requiredError, requiredDescription } = chatbotKnowledgeBaseConstants;

const ClubListingTable = ({
  onEditClub,
  queryParams,
  setQueryParams,
}: ClubListingTableProps) => {
  const { getClubs, updateStatus } = ClubService();
  const [updatingClubId, setUpdatingClubId] = useState<string | undefined>(
    undefined,
  );
  const { navigateToInvidualClub } = useRedirect();
  const { toggleVisibility: toggleUploadModal, visible: isChatbotModalOpen } =
    useDrawer();

  const {
    data: clubsData,
    isPending,
    isSuccess,
    refetch,
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

  // status
  const handleStatusChange = async (clubId = "", value: string) => {
    setUpdatingClubId(clubId);
    await updateClubStatusMutate({ status: value, id: clubId });
    setUpdatingClubId(undefined);
  };
  const handleEditClick = useCallback((clubId?: string) => {
    return () => {
      if (!clubId) return;
      onEditClub(clubId);
    };
  }, []);

  const handleRowClick = (clubId = "", e: React.MouseEvent<HTMLDivElement>) => {
    stopPropagation(e);
    navigateToInvidualClub(clubId);
  };

  const handleChatbotStatus = async (id: string, chatbotEnabled: boolean) => {
    if (!id) return;
    setUpdatingClubId(id);
    await updateChatbotStatusMutate({ chatbotEnabled, id });
    refetch();
    setUpdatingClubId(undefined);
  };

  const handleChatbotStatusChange =
    (selectedClub: ClubListData) => async (value: boolean) => {
      const { id, knowledgeBaseName, chatbotEnabled } = selectedClub || {};

      if (!id) return;

      if (!chatbotEnabled && !knowledgeBaseName) {
        Notification({
          title: requiredError,
          description: requiredDescription,
          type: NotificationTypes.WARNING,
        });
        // TODO: Need to remove setPendingEnableClubId during revamp
        setPendingEnableClubId(id);
        toggleUploadModal();
      } else {
        handleChatbotStatus(id, value);
      }
    };

  const handleImportSuccess = (clubId?: string) => async () => {
    if (!clubId) return;
    await handleChatbotStatus(clubId, true);
  };

  return (
    <div className={styles.tableContainer}>
      <ListHeader
        columnTemplate={clubHeaderColumnGrid}
        headers={clubListingHeaders}
        className={styles.listHeader}
      />

      <div className={styles.tableBody}>
        <ConditionalRender
          isPending={isPending}
          isSuccess={isSuccess}
          records={clubsData?.clubs}
          showLoader={false}
        >
          <ConditionalRenderComponent
            visible={!isPending}
            fallback={<ClubListSkeleton />}
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
                    onChange={handleChatbotStatusChange(club)}
                    loading={
                      isChatbotUpdatePending && updatingClubId === club.id
                    }
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
          </ConditionalRenderComponent>
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
        onClose={toggleUploadModal}
        importMode={ImportModes.CHATBOT_KNOWLEDGE_BASE}
        onImport={handleImportSuccess(pendingEnableClubId)}
        clubId={pendingEnableClubId}
      />
    </div>
  );
};

export default ClubListingTable;
