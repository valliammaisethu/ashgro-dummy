import { CheckboxChangeEvent, Select } from "antd";
import React from "react";

import Checkbox from "src/shared/components/Checkbox";

import { ProspectsList } from "src/models/prospects.model";
import { formatDate } from "src/shared/utils/dateUtils";
import { toTitleCase } from "src/shared/utils/parser";
import { DateFormats } from "src/enums/dateFormats.enum";
import { LeadStatusOption } from "../../constants";
import { getStatusValue } from "../../helpers";
import StatusTag from "../../Atoms/StatusTag";

import styles from "./prospectRow.module.scss";

interface ProspectRowProps {
  prospect: ProspectsList;
  isSelected: boolean;
  leadStatusOptions: LeadStatusOption[];
  onSelectChange: (id: string, checked: boolean) => void;
  onStatusChange: (id: string, newStatus: string) => void;
}

const ProspectRow: React.FC<ProspectRowProps> = ({
  prospect,
  isSelected,
  leadStatusOptions,
  onSelectChange,
  onStatusChange,
}) => {
  const {
    id = "",
    leadStatus,
    attachmentId,
    firstName,
    email,
    countryCode,
    contactNumber,
    followUpDate,
    leadSource,
  } = prospect;

  const handleCheckboxChange = (e?: CheckboxChangeEvent) =>
    onSelectChange(id, e?.target?.checked ?? false);

  const handleStatusSelectChange = (value: string) => onStatusChange(id, value);

  const currentStatusValue = getStatusValue(
    leadStatus ?? "",
    leadStatusOptions,
  );

  return (
    <div className={styles.tableRow}>
      <div className={styles.checkboxCol}>
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
      </div>

      <div className={styles.prospectCol}>
        <div className={styles.prospectInfo}>
          <img src={attachmentId} className={styles.avatar} />
          <div className={styles.details}>
            <div className={styles.name}>{firstName}</div>
            <div className={styles.contact}>
              <span className={styles.email}>{email}</span>
              <span className={styles.dot}>•</span>
              <span
                className={styles.phone}
              >{`${countryCode} ${contactNumber}`}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dateColValue}>
        {formatDate(followUpDate, DateFormats.DD_MMM__YYYY)}
      </div>

      <div className={styles.sourceColValue}>{toTitleCase(leadSource)}</div>

      <div className={styles.statusCol}>
        <Select
          value={currentStatusValue}
          onChange={handleStatusSelectChange}
          className={styles.statusSelect}
        >
          {leadStatusOptions?.map(({ value, color }) => (
            <Select.Option key={value} value={value}>
              <StatusTag label={color} color={color} />
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default ProspectRow;
