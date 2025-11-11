import React from "react";

import ListHeader from "src/shared/components/atoms/Table/Profile/ListHeader";
import {
  clubHeaderColumnGrid,
  clubListingHeaders,
  clubStatuses,
  mockClubs,
} from "../../constants";

import Profile from "src/shared/components/atoms/Table/Profile";
import Badge from "src/shared/components/atoms/Badge";
import { Colors } from "src/enums/colors.enum";
import Switch from "src/shared/components/Switch";
import Actions from "src/shared/components/atoms/Table/Actions";
import { ClubListingTableProps } from "src/shared/types/clubs.type";

import styles from "../../clubs.module.scss";

const ClubListingTable = ({ onEditClub }: ClubListingTableProps) => {
  return (
    <div className={styles.table}>
      <ListHeader
        columnTemplate={clubHeaderColumnGrid}
        headers={clubListingHeaders}
      />
      {mockClubs.map((club, index) => (
        <div key={index} className={styles.rowContainer}>
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
            onEditClick={() => onEditClub(club)}
            selectWidth={160}
          />
        </div>
      ))}
    </div>
  );
};

export default ClubListingTable;
