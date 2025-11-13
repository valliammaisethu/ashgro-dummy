import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  clubHeaderColumnGrid,
  clubListingHeaders,
  clubStatuses,
  membersText,
} from "../../constants";
import ListHeader from "src/shared/components/atoms/Table/Profile/ListHeader";
import Profile from "src/shared/components/atoms/Table/Profile";
import Badge from "src/shared/components/atoms/Badge";
import { Colors } from "src/enums/colors.enum";
import Switch from "src/shared/components/Switch";
import Actions from "src/shared/components/atoms/Table/Actions";
import { ClubListingTableProps } from "src/shared/types/clubs.type";
import { ClubService } from "src/services/ClubService/club.service";
import Pagination from "src/shared/components/Pagination";
import styles from "../../clubs.module.scss";
import { extractNameParts } from "src/shared/utils/parser";

const ClubListingTable = ({ onEditClub }: ClubListingTableProps) => {
  const { getClubs } = ClubService();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: clubsData } = useQuery(getClubs());

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  return (
    <div className={styles.tableContainer}>
      <ListHeader
        columnTemplate={clubHeaderColumnGrid}
        headers={clubListingHeaders}
      />
      <div className={styles.tableBody}>
        {clubsData?.clubs?.map((club, index) => (
          <div key={index} className={styles.rowContainer}>
            <Profile
              address={club.clubAddress}
              firstName={extractNameParts(club.clubName).firstName}
              lastName={extractNameParts(club.clubName).lastName}
            />

            <Badge
              text={membersText(club.numberOfMembers)}
              color={Colors.DARK_GOLD}
              backgroundColor={Colors.LIGHT_GOLD}
              className={styles.badge}
            />

            <Switch
              checked={club.chatbotEnabled}
              className={styles.switch}
              name={`switch-${index}`}
            />

            <Actions
              options={clubStatuses}
              onEditClick={() => onEditClub(club)}
              selectWidth={140}
              selectedValue={club.status}
            />
          </div>
        ))}
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
