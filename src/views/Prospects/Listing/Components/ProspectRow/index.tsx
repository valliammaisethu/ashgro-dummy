import React, { MouseEvent } from "react";
import { CheckboxChangeEvent, Select } from "antd";
import { IconDelete, IconEdit } from "obra-icons-react";

import { ProspectsList } from "src/models/prospects.model";
import { LeadStatus } from "src/models/meta.model";
import { formatDate } from "src/shared/utils/dateUtils";
import { toTitleCase } from "src/shared/utils/parser";
import { fillEmptyData, getFullName } from "src/shared/utils/helpers";
import AvatarFallback from "src/shared/components/AvatarFallback";
import Checkbox from "src/shared/components/Checkbox";
import { DateFormats } from "src/enums/dateFormats.enum";
import StatusTag from "../../Atoms/StatusTag";
import { empty } from "src/constants/sharedComponents";
import { Colors } from "src/enums/colors.enum";

import styles from "./prospectRow.module.scss";
import { stopPropagation } from "src/shared/utils/eventUtils";

interface ProspectRowProps {
  prospect: ProspectsList;
  isSelected: boolean;
  leadStatusOptions?: LeadStatus[];
  onSelectChange: (checked: boolean) => void;
  onClick: () => void;
  onEditClick: (data: ProspectsList) => void;
  onDeleteClick: (data: ProspectsList) => void;
  onStatusChange?: (prospectId: string, leadStatusId: string) => void;
  isUpdatingStatus?: boolean;
}

const ProspectRow: React.FC<ProspectRowProps> = ({
  prospect,
  isSelected,
  leadStatusOptions = [],
  onSelectChange,
  onClick,
  onEditClick,
  onDeleteClick,
  onStatusChange,
  isUpdatingStatus = false,
}) => {
  const {
    leadStatus,
    firstName,
    lastName,
    email,
    countryCode,
    contactNumber,
    followUpDate,
    leadSource,
    profilePictureUrl,
  } = prospect;

  const handleCheckboxChange = (e?: CheckboxChangeEvent) => {
    e?.stopPropagation();
    onSelectChange(e?.target?.checked || false);
  };

  const handleSelectClick = (e: React.MouseEvent) => e.stopPropagation();

  const handleEditClick = (e: React.MouseEvent, data: ProspectsList) => {
    e.stopPropagation();
    onEditClick(data);
  };

  const handleDeleteClick = (e: MouseEvent, data: ProspectsList) => {
    e.stopPropagation();
    onDeleteClick(data);
  };

  const handleStatusChange = (statusName: string) => {
    const selectedStatus = leadStatusOptions.find(
      (status) => status.statusName === statusName,
    );
    if (selectedStatus?.id && prospect.id && onStatusChange) {
      onStatusChange(prospect.id, selectedStatus.id);
    }
  };

  return (
    <div onClick={onClick} className={styles.tableRow}>
      <div className={styles.checkboxCol} onClick={stopPropagation}>
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
      </div>

      <div className={styles.prospectCol}>
        <div className={styles.prospectInfo}>
          <AvatarFallback
            src={profilePictureUrl}
            name={getFullName(firstName, lastName)}
            size={56}
            className={styles.avatar}
          />
          <div className={styles.details}>
            <div className={styles.name}>
              {getFullName(firstName, lastName)}
            </div>
            <div className={styles.contact}>
              <span className={styles.email}>{email}</span>
              {contactNumber && (
                <span
                  className={styles.phone}
                >{`${countryCode} ${contactNumber}`}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dateColValue}>
        {fillEmptyData(formatDate(followUpDate, DateFormats.DD_MMM__YYYY))}
      </div>

      <div className={styles.sourceColValue}>
        {fillEmptyData(toTitleCase(leadSource))}
      </div>
      {leadStatus ? (
        <div className={styles.statusCol}>
          <Select
            value={leadStatus}
            className={styles.statusSelect}
            onClick={handleSelectClick}
            onChange={handleStatusChange}
            loading={isUpdatingStatus}
          >
            {leadStatusOptions?.map(({ id, statusName = "" }) => (
              <Select.Option key={id} value={statusName}>
                <StatusTag label={statusName} />
              </Select.Option>
            ))}
          </Select>
        </div>
      ) : (
        <div className={styles.sourceColValue}>{empty}</div>
      )}
      <div className={styles.actions}>
        <IconEdit
          onClick={(e) => handleEditClick(e, prospect)}
          size={20}
          color={Colors.MODAL_CLOSE_ICON}
        />
        <IconDelete
          onClick={(e) => handleDeleteClick(e, prospect)}
          size={20}
          color={Colors.MODAL_CLOSE_ICON}
        />
      </div>
    </div>
  );
};

export default ProspectRow;
