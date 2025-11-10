import { IconClub } from "obra-icons-react";
import React from "react";

import { Buttons } from "src/enums/buttons.enum";
import Button from "src/shared/components/Button";
import SearchField from "src/shared/components/SearchField";
import plusIcon from "src/assets/images/plusIcon.webp";

import styles from "../../clubs.module.scss";

const ClubListingHeader = () => {
  return (
    <div className={styles.header}>
      <SearchField onSearch={() => {}} />
      <div className={styles.addClub}>
        <img className={styles.plusIcon} src={plusIcon} />
        <Button className={styles.addClubButton} icon={<IconClub size={20} />}>
          {Buttons.ADD_CLUB}
        </Button>
      </div>
    </div>
  );
};

export default ClubListingHeader;
