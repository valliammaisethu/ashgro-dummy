import React from "react";
import { IconEmail, IconUserAdd, IconDocumentUpload } from "obra-icons-react";

import SearchField from "src/shared/components/SearchField";
import Button from "src/shared/components/Button";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";

import styles from "../listing.module.scss";

interface HeaderProps {
  onAddProspect: () => void;
}

const Header = ({ onAddProspect }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <SearchField
        onSearch={() => {}}
        onFilter={() => {}}
        className={styles.searchField}
      />
      <div className={styles.actions}>
        <Button
          icon={<IconDocumentUpload size={20} />}
          className={styles.filterButton}
        />
        <div>
          <Button
            className={styles.bulkUploadButton}
            icon={<IconEmail size={20} />}
          >
            {Buttons.BULK_MAIL}
          </Button>
        </div>
        <div>
          <Button
            className={styles.addProspectButton}
            type={ButtonTypes.SECONDARY}
            icon={<IconUserAdd size={20} />}
            onClick={onAddProspect}
          >
            {Buttons.ADD_PROSPECT}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
