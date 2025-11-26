import React from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { IconChevronDown } from "obra-icons-react";
import styles from "./statusDropdown.module.scss";
import { Trigger } from "src/enums/trigger.enum";
import { StatusDropdownProps } from "src/shared/types/sharedComponents.type";
import { getStatusTagBackgroundColor } from "src/shared/utils/helpers";
import Button from "../Button";
import { selectStatus } from "src/constants/sharedComponents";
import clsx from "clsx";

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  value,
  options,
  onChange,
  onClick = (e) => e.stopPropagation(),
  loading = false,
}) => {
  const selectedOption = options.find(
    (option) => option.id === value || option.statusName === value,
  );

  const menuItems: MenuProps["items"] = options.map((option) => ({
    key: option.id || option.statusName || "",
    label: (
      <div className={styles.menuItem}>
        <div
          className={styles.dot}
          style={{
            border: `2px solid ${getStatusTagBackgroundColor(option.color)}`,
            color: option.color,
          }}
        >
          <div style={{ color: option.color }} className={styles.innerDot}>
            .
          </div>
        </div>
        <span className={styles.label} style={{ color: option.color }}>
          {option.statusName}
        </span>
      </div>
    ),
    onClick: () => onChange(option.id || option.statusName || ""),
  }));

  return (
    <div onClick={onClick}>
      <Dropdown
        menu={{ items: menuItems }}
        trigger={[Trigger.CLICK]}
        disabled={loading}
        overlayClassName={styles.dropdownOverlay}
      >
        <Button
          className={styles.dropdownButton}
          loading={loading}
          style={{
            backgroundColor: getStatusTagBackgroundColor(selectedOption?.color),
          }}
        >
          <div className={styles.buttonContent}>
            {selectedOption && (
              <>
                <div
                  className={styles.dot}
                  style={{
                    border: `2px solid ${getStatusTagBackgroundColor(selectedOption.color)}`,
                    color: selectedOption.color,
                  }}
                >
                  <div className={clsx(styles.innerDot, styles.optionInnerDot)}>
                    .
                  </div>
                </div>
                <span
                  className={styles.label}
                  style={{ color: selectedOption.color }}
                >
                  {selectedOption.statusName}
                </span>
              </>
            )}
            {!selectedOption && (
              <span className={styles.placeholder}>{selectStatus}</span>
            )}
          </div>
          <IconChevronDown
            className={styles.chevron}
            color={selectedOption?.color}
          />
        </Button>
      </Dropdown>
    </div>
  );
};

export default StatusDropdown;
