import { CheckboxChangeEvent, Select } from "antd";
import React, { Fragment } from "react";

import { ProspectsList } from "src/models/prospects.model";
import { formatDate } from "src/shared/utils/dateUtils";
import { toTitleCase } from "src/shared/utils/parser";
import { fillEmptyData, getFullName } from "src/shared/utils/helpers";
import AvatarFallback from "src/shared/components/AvatarFallback";
import Checkbox from "src/shared/components/Checkbox";
import { DateFormats } from "src/enums/dateFormats.enum";
import StatusTag from "../../Atoms/StatusTag";

import styles from "./prospectRow.module.scss";
import { LeadStatus } from "src/models/meta.model";

interface ProspectRowProps {
  prospect: ProspectsList;
  isSelected: boolean;
  leadStatusOptions?: LeadStatus[];
  onSelectChange: (id: string, checked: boolean) => void;
  onClick: () => void;
}

const ProspectRow: React.FC<ProspectRowProps> = ({
  prospect,
  isSelected,
  leadStatusOptions = [],
  onSelectChange,
  onClick,
}) => {
  const {
    id = "",
    leadStatus,
    attachmentId,
    firstName,
    lastName,
    email,
    countryCode,
    contactNumber,
    followUpDate,
    leadSource,
  } = prospect;

  const handleCheckboxChange = (e?: CheckboxChangeEvent) => {
    e?.stopPropagation();
    onSelectChange(id, e?.target?.checked ?? false);
  };

  const handleSelectClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div onClick={onClick} className={styles.tableRow}>
      <div className={styles.checkboxCol}>
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
      </div>

      <div className={styles.prospectCol}>
        <div className={styles.prospectInfo}>
          <AvatarFallback
            src={attachmentId}
            name={getFullName(firstName, lastName)}
            size={40}
            className={styles.avatar}
          />
          <div className={styles.details}>
            <div className={styles.name}>
              {getFullName(firstName, lastName)}
            </div>
            <div className={styles.contact}>
              <span className={styles.email}>{email}</span>
              {contactNumber && (
                <Fragment>
                  <span className={styles.dot}>•</span>
                  <span
                    className={styles.phone}
                  >{`${countryCode} ${contactNumber}`}</span>
                </Fragment>
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
          >
            {leadStatusOptions?.map(({ id, statusName = "" }) => (
              <Select.Option key={id} value={statusName}>
                <StatusTag label={statusName} color={"red"} />
              </Select.Option>
            ))}
          </Select>
        </div>
      ) : (
        "N/A"
      )}
    </div>
  );
};

export default ProspectRow;
