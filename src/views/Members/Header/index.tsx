import React from "react";
import { IconEmail, IconUserAdd, IconDocumentUpload } from "obra-icons-react";

import SearchField from "src/shared/components/SearchField";
import Button from "src/shared/components/Button";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";

import styles from "../members.module.scss";
import { MembersHeaderProps } from "src/shared/types/members.type";

const Header = ({
  onAddMember,
  onSearch,
  onFilter,
  filtersActive,
  onBulkMail,
  selectedEmails,
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
        <Button
          icon={<IconDocumentUpload size={20} />}
          className={styles.filterButton}
        />
        <div>
          <Button
            onClick={onBulkMail}
            className={styles.bulkUploadButton}
            icon={<IconEmail size={20} />}
            disabled={!selectedEmails}
          >
            {Buttons.BULK_MAIL}
          </Button>
        </div>
        <div>
          <Button
            className={styles.addMemberButton}
            type={ButtonTypes.SECONDARY}
            icon={<IconUserAdd size={20} />}
            onClick={onAddMember}
          >
            {Buttons.ADD_MEMBER}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
