import React from "react";
import { IconEmail, IconUserAdd, IconClose } from "obra-icons-react";

import SearchField from "src/shared/components/SearchField";
import Button from "src/shared/components/Button";
import { importMembers } from "../constant";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";
import { Colors } from "src/enums/colors.enum";
import { MembersHeaderProps } from "src/shared/types/members.type";

import styles from "../members.module.scss";
import BulkImportButton from "src/shared/components/atoms/BulkImportButton";

const Header = ({
  onAddMember,
  onSearch,
  onFilter,
  onClear,
  onBulkMail,
  onBulkImport,
  selectedEmails,
  filtersActive,
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
        {Boolean(selectedEmails) && (
          <div onClick={onClear} className={styles.clearSelection}>
            <IconClose
              strokeWidth={1.75}
              color={Colors.ASHGRO_NAVY}
              size={20}
            />
            {Buttons.CLEAR_SELECTION}
          </div>
        )}
        {!selectedEmails && (
          <BulkImportButton onClick={onBulkImport} tooltip={importMembers} />
        )}
        <Button
          onClick={onBulkMail}
          className={styles.bulkUploadButton}
          icon={<IconEmail className={styles.bulkMailIcon} size={20} />}
          disabled={!selectedEmails}
        >
          {Buttons.BULK_MAIL}
        </Button>
        {!selectedEmails && (
          <Button
            className={styles.addMemberButton}
            type={ButtonTypes.SECONDARY}
            icon={<IconUserAdd size={20} />}
            onClick={onAddMember}
          >
            {Buttons.ADD_MEMBER}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
