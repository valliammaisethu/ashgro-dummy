import React, { useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  clubHeaderColumnGrid,
  clubListingHeaders,
  membersText,
} from "../../constants";
import { ClubStatusOptions } from "../../IndividualClub/constants";
import ListHeader from "src/shared/components/atoms/Table/Profile/ListHeader";
import Profile from "src/shared/components/atoms/Table/Profile";
import Badge from "src/shared/components/atoms/Badge";
import { Colors } from "src/enums/colors.enum";
import Switch from "src/shared/components/Switch";
import ConditionalRender from "src/shared/components/ConditionalRender";
import Actions from "src/shared/components/atoms/Table/Actions";
import Pagination from "src/shared/components/Pagination";
import { ClubListingTableProps } from "src/shared/types/clubs.type";
import { ClubService } from "src/services/ClubService/club.service";
import { extractNameParts } from "src/shared/utils/parser";
import useRedirect from "src/shared/hooks/useRedirect";
import { stopPropagation } from "src/shared/utils/eventUtils";

import styles from "../../clubs.module.scss";
import { QueryKeys } from "src/enums/cacheEvict.enum";

const ClubListingTable = ({ onEditClub }: ClubListingTableProps) => {
  const { getClubs, updateStatus } = ClubService();
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingClubId, setUpdatingClubId] = useState<string>("");
  const { navigateToInvidualClub } = useRedirect();
  const queryClient = useQueryClient();

  const {
    data: clubsData,
    isPending,
    isSuccess,
    isFetching,
  } = useQuery(getClubs());

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const { mutateAsync, isPending: isUpdatePending } =
    useMutation(updateStatus());

  const handleChatbotStatusChange = async (clubId = "", value: boolean) => {
    setUpdatingClubId(clubId);

    await mutateAsync(
      { chatbotEnabled: value, id: clubId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.GET_CLUBS],
          });
          setUpdatingClubId("");
        },
        onError: () => {
          setUpdatingClubId("");
        },
      },
    );
  };

  const handleStatusChange = async (clubId = "", value: string) => {
    setUpdatingClubId(clubId);
    await mutateAsync(
      { status: value, id: clubId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.GET_CLUBS],
          });
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

  return (
    <div className={styles.tableContainer}>
      <ListHeader
        columnTemplate={clubHeaderColumnGrid}
        headers={clubListingHeaders}
      />
      <div className={styles.tableBody}>
        <ConditionalRender
          isFetching={isFetching}
          isPending={isPending}
          isSuccess={isSuccess}
          records={clubsData?.clubs}
        >
          {clubsData?.clubs?.map((club, index) => (
            <div
              onClick={(e) => handleRowClick(club.id, e)}
              key={index}
              className={styles.rowContainer}
            >
              <Profile
                address={club.address}
                firstName={extractNameParts(club.name).firstName}
                lastName={extractNameParts(club.name).lastName}
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
                  loading={isUpdatePending && updatingClubId === club.id}
                />
              </div>

              <Actions
                options={ClubStatusOptions}
                onSelectChange={(value) => handleStatusChange(club.id, value)}
                onEditClick={handleEditClick(club.id)}
                selectWidth={140}
                selectedValue={club.status}
                selectLoading={isUpdatePending && updatingClubId === club.id}
              />
            </div>
          ))}
        </ConditionalRender>
      </div>
      <Pagination
        currentPage={currentPage ?? clubsData?.pagination?.currentPage}
        totalPages={clubsData?.pagination?.overallPages}
        onPageChange={handlePageChange}
        hasData={!!clubsData?.clubs && clubsData.clubs.length > 0}
      />
    </div>
  );
};

export default ClubListingTable;
