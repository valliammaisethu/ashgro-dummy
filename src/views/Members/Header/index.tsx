import React from "react";

import SearchField from "src/shared/components/SearchField";
import BulkImportButton from "src/shared/components/atoms/Buttons/BulkImportButton";
import BulkMailButton from "src/shared/components/atoms/Buttons/BulkMailButton";
import ClearSelectionButton from "src/shared/components/atoms/Buttons/ClearSelectionButton";
import AddUserButton from "src/shared/components/atoms/Buttons/AddUserButton";
import { Buttons } from "src/enums/buttons.enum";
import { MembersHeaderProps } from "src/shared/types/members.type";
import { importMembers } from "../constant";

import styles from "../members.module.scss";

const Header = ({
  onAddMember,
  onSearch,
  onFilter,
  onClear,
  onBulkMail,
  onBulkImport,
  selectedEmails,
  filtersActive,
  isCheckingImportStatus,
}: MembersHeaderProps) => {
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
            tooltip={importMembers}
            loading={isCheckingImportStatus}
          />
        )}
        <BulkMailButton
          onClick={onBulkMail}
          disabled={!selectedEmails}
          loading={!!selectedEmails && isCheckingImportStatus}
        />
        {!selectedEmails && (
          <AddUserButton onClick={onAddMember} label={Buttons.ADD_MEMBER} />
        )}
      </div>
    </div>
  );
};

export default Header;
