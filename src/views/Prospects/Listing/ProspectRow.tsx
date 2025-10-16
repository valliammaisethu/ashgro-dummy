import React from "react";
import { CheckboxChangeEvent, Select } from "antd";

import Checkbox from "src/shared/components/Checkbox";
import { ProspectData } from "src/shared/types/sharedComponents.type";
import { LeadStatusOption } from "./constants";
import StatusTag from "./StatusTag";
import { getStatusValue } from "./utils";

import styles from "./listing.module.scss";

interface ProspectRowProps {
  prospect: ProspectData;
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
    onSelectChange(prospect.id, e?.target?.checked ?? false);

  const handleStatusSelectChange = (value: string) =>
    onStatusChange(prospect.id, value);

  const currentStatusValue = getStatusValue(
    prospect.leadStatus.label,
    leadStatusOptions,
  );

  return (
    <div className={styles.tableRow}>
      <div className={styles.checkboxCol}>
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
      </div>

      <div className={styles.prospectCol}>
        <div className={styles.prospectInfo}>
          <img
            src={prospect.avatar}
            alt={prospect.name}
            className={styles.avatar}
          />
          <div className={styles.details}>
            <div className={styles.name}>{prospect.name}</div>
            <div className={styles.contact}>
              <span className={styles.email}>{prospect.email}</span>
              <span className={styles.dot}>•</span>
              <span className={styles.phone}>{prospect.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dateColValue}>{prospect.followUpDate}</div>

      <div className={styles.sourceColValue}>{prospect.leadSource}</div>

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
