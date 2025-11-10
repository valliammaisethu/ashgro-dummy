import React from "react";
import ListHeader from "src/shared/components/atoms/Table/Profile/ListHeader";
import {
  clubHeaderColumnGrid,
  clubListingHeaders,
  clubStatuses,
} from "../../constants";

import styles from "../../clubs.module.scss";
import Profile from "src/shared/components/atoms/Table/Profile";
import Badge from "src/shared/components/atoms/Badge";
import { Colors } from "src/enums/colors.enum";
import Switch from "src/shared/components/Switch";
import { Select } from "antd";
import StatusTag from "src/views/Prospects/Listing/Atoms/StatusTag";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { IconChevronDown } from "obra-icons-react";

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

        <Select
          onClick={stopPropagation}
          value="active"
          className={styles.statusSelect}
          suffixIcon={<IconChevronDown size={20} />}
        >
          {clubStatuses?.map(({ value, label = "" }) => (
            <Select.Option key={value} value={value}>
              <StatusTag label={label} />
            </Select.Option>
          ))}
        </Select>
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

        <Select
          onClick={stopPropagation}
          value="active"
          className={styles.statusSelect}
          suffixIcon={<IconChevronDown size={20} />}
        >
          {clubStatuses?.map(({ value, label = "" }) => (
            <Select.Option key={value} value={value}>
              <StatusTag label={label} />
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default ClubListingTable;
