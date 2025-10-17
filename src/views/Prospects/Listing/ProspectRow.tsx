import { CheckboxChangeEvent, Select } from "antd";
import React from "react";

import Checkbox from "src/shared/components/Checkbox";
import { LeadStatusOption } from "./constants";
import StatusTag from "./StatusTag";
import { getStatusValue } from "./utils";

import { ProspectsList } from "src/models/prospects.model";
import { formatDate } from "src/shared/utils/dateUtils";
import styles from "./listing.module.scss";
import { DateFormats } from "src/enums/dateFormats.enum";
import { toTitleCase } from "src/shared/utils/parser";

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
  const handleCheckboxChange = (e?: CheckboxChangeEvent) =>
    onSelectChange(prospect.id!, e?.target?.checked ?? false);

  const handleStatusSelectChange = (value: string) =>
    onStatusChange(prospect.id!, value);

  const currentStatusValue = getStatusValue(
    prospect?.leadStatus ?? "",
    leadStatusOptions,
  );

  return (
    <div className={styles.tableRow}>
      <div className={styles.checkboxCol}>
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
      </div>

      <div className={styles.prospectCol}>
        <div className={styles.prospectInfo}>
          <img src={prospect.attachmentId} className={styles.avatar} />
          <div className={styles.details}>
            <div className={styles.name}>{prospect.firstName}</div>
            <div className={styles.contact}>
              <span className={styles.email}>{prospect.email}</span>
              <span className={styles.dot}>•</span>
              <span
                className={styles.phone}
              >{`${prospect?.countryCode} ${prospect.contactNumber}`}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dateColValue}>
        {formatDate(prospect.followUpDate, DateFormats.DD_MMM__YYYY)}
      </div>

      <div className={styles.sourceColValue}>
        {toTitleCase(prospect.leadSource)}
      </div>

      <div className={styles.statusCol}>
        <Select
          value={currentStatusValue}
          onChange={handleStatusSelectChange}
          className={styles.statusSelect}
        >
          {leadStatusOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              <StatusTag label={option.label} color={option.color} />
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default ProspectRow;
