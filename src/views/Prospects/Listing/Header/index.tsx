import React from "react";

import { Buttons } from "src/enums/buttons.enum";
import SearchField from "src/shared/components/SearchField";
import BulkImportButton from "src/shared/components/atoms/Buttons/BulkImportButton";
import BulkMailButton from "src/shared/components/atoms/Buttons/BulkMailButton";
import ClearSelectionButton from "src/shared/components/atoms/Buttons/ClearSelectionButton";
import AddUserButton from "src/shared/components/atoms/Buttons/AddUserButton";
import { ProspectListingHeaderProps } from "src/shared/types/prospects.type";
import { bulkImportProspects } from "../constants";

import styles from "../listing.module.scss";

const Header = ({
  onAddProspect,
  onSearch,
  onFilter,
  onClear,
  onBulkImport,
  onBulkMail,
  filtersActive,
  selectedEmails,
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
        {Boolean(selectedEmails) && <ClearSelectionButton onClick={onClear} />}
        {!selectedEmails && (
          <BulkImportButton
            onClick={onBulkImport}
            tooltip={bulkImportProspects}
          />
        )}
        <BulkMailButton onClick={onBulkMail} disabled={!selectedEmails} />
        {!selectedEmails && (
          <AddUserButton onClick={onAddProspect} label={Buttons.ADD_PROSPECT} />
        )}
      </div>
    </div>
  );
};

export default Header;
