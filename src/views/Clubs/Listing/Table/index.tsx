import React from "react";
import { useNavigate } from "react-router-dom";

import Actions from "src/shared/components/atoms/Table/Actions";
import Badge from "src/shared/components/atoms/Badge";
import ListHeader from "src/shared/components/atoms/Table/Profile/ListHeader";
import Profile from "src/shared/components/atoms/Table/Profile";
import Switch from "src/shared/components/Switch";
import { ClubListingTableProps } from "src/shared/types/clubs.type";
import {
  clubHeaderColumnGrid,
  clubListingHeaders,
  clubStatuses,
  mockClubs,
} from "../../constants";
import { NavigationRoutes } from "src/routes/routeConstants/appRoutes";
import { Colors } from "src/enums/colors.enum";

import styles from "../../clubs.module.scss";

const ClubListingTable = ({ onEditClub }: ClubListingTableProps) => {
  const navigate = useNavigate();

  const handleRowClick = (
    clubId: string | number,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    // Don't navigate if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest(".ant-switch") ||
      target.closest(".ant-select")
    ) {
      return;
    }
    navigate(NavigationRoutes.INDIVIDUAL_CLUB.replace(":id", String(clubId)));
  };

  const handleEditClick = (club: (typeof mockClubs)[0]) => {
    onEditClub(club);
  };

  return (
    <div className={styles.table}>
      <ListHeader
        columnTemplate={clubHeaderColumnGrid}
        headers={clubListingHeaders}
      />
      {mockClubs.map((club, index) => (
        <div
          key={index}
          className={styles.rowContainer}
          onClick={(e) => handleRowClick(club.id, e)}
        >
          <Profile
            address={club.clubAddress}
            firstName={club.clubName.split(" ")[0]}
            lastName={club.clubName.split(" ")[1]}
          />

          <Badge
            text="45 Members"
            color={Colors.DARK_GOLD}
            backgroundColor={Colors.LIGHT_GOLD}
            className={styles.badge}
          />

          <Switch className={styles.switch} name={`switch-${index}`} />

          <Actions
            options={clubStatuses}
            onEditClick={() => handleEditClick(club)}
            selectWidth={160}
          />
        </div>
      ))}
    </div>
  );
};

export default ClubListingTable;
