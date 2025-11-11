import React from "react";
import ListHeader from "src/shared/components/atoms/Table/Profile/ListHeader";
import { clubHeaderColumnGrid, clubListingHeaders } from "../../constants";

import styles from "../../clubs.module.scss";
import Profile from "src/shared/components/atoms/Table/Profile";
import Badge from "src/shared/components/atoms/Badge";
import { Colors } from "src/enums/colors.enum";
import Switch from "src/shared/components/Switch";
import Actions from "src/shared/components/atoms/Table/Actions";

const ClubListingTable = () => {
  return (
    <div className={styles.table}>
      <ListHeader
        columnTemplate={clubHeaderColumnGrid}
        headers={clubListingHeaders}
      />
      <div className={styles.rowContainer}>
        <Profile
          address="734 15th St NW, Washington, DC 20005, United States"
          firstName="The"
          lastName="Ned"
        />

        <Badge
          text="45 Members"
          color={Colors.DARK_GOLD}
          backgroundColor={Colors.LIGHT_GOLD}
          className={styles.badge}
        />

        <Switch className={styles.switch} name="switch" />

        <Actions onEditClick={() => {}} selectWidth={160} />
      </div>
      <div className={styles.rowContainer}>
        <Profile
          address="734 15th St NW, Washington, DC 20005, United States"
          firstName="The"
          lastName="Ned"
        />

        <Badge
          text="45 Members"
          color={Colors.DARK_GOLD}
          backgroundColor={Colors.LIGHT_GOLD}
          className={styles.badge}
        />

        <Switch className={styles.switch} name="switch" />

        <Actions onEditClick={() => {}} selectWidth={160} />
      </div>
    </div>
  );
};

export default ClubListingTable;
