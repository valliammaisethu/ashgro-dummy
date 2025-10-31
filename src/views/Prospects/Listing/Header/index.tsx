import React from "react";
import { IconEmail, IconUserAdd, IconDocumentUpload } from "obra-icons-react";

import SearchField from "src/shared/components/SearchField";
import Button from "src/shared/components/Button";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";

import styles from "../listing.module.scss";
import { ProspectListingHeaderProps } from "src/shared/types/prospects.type";

const Header = ({
  onAddProspect,
  onSearch,
  onFilter,
  filtersActive,
  onBulkMail,
}: ProspectListingHeaderProps) => {
  return (
    <div className={styles.header}>
      <SearchField
        onSearch={onSearch}
        onFilter={onFilter}
        className={styles.searchField}
        filtersActive={filtersActive}
      />
      <div className={styles.actions}>
        <Button
          icon={<IconDocumentUpload size={20} />}
          className={styles.filterButton}
        />
        <div>
          <Button
            onClick={onBulkMail}
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
