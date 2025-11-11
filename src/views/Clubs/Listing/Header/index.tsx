import { IconAdd, IconClub } from "obra-icons-react";
import React from "react";

import { Buttons } from "src/enums/buttons.enum";
import Button from "src/shared/components/Button";
import SearchField from "src/shared/components/SearchField";
import { Colors } from "src/enums/colors.enum";

import styles from "../../clubs.module.scss";

const ClubListingHeader = () => {
  return (
    <div className={styles.header}>
      <SearchField onSearch={() => {}} />
      <div className={styles.addClub}>
        <IconAdd
          color={Colors.ASHGRO_WHITE}
          className={styles.plusIcon}
          size={12}
          strokeWidth={3}
        />
        <Button className={styles.addClubButton} icon={<IconClub size={20} />}>
          {Buttons.ADD_CLUB}
        </Button>
      </div>
    </div>
  );
};

export default ClubListingHeader;
