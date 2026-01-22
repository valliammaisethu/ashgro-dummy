import React from "react";
import { Dropdown, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { IconChevronDown } from "obra-icons-react";
import styles from "./statusDropdown.module.scss";
import { Trigger } from "src/enums/trigger.enum";
import { StatusDropdownProps } from "src/shared/types/sharedComponents.type";
import { getStatusTagBackgroundColor } from "src/shared/utils/helpers";
import Button from "../Button";
import { selectStatus } from "src/constants/sharedComponents";
import clsx from "clsx";
import { useEllipsisTooltip } from "src/shared/hooks/useEllipsisTooltip";

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  value,
  options,
  onChange,
  onClick,
  loading = false,
}) => {
  const selectedOption = options.find(
    (option) => option.id === value || option.statusName === value,
  );

  const menuItems: MenuProps["items"] = options?.map((option) => ({
    key: option.id ?? option.statusName ?? "",
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
        <span className={styles.label}>{option.statusName}</span>
      </div>
    ),
    onClick: () => {
      if (!option.id || !option.statusName) return;
      onChange(option.id ?? option.statusName);
    },
  }));

  const { ref: labelRef, isTruncated } = useEllipsisTooltip<HTMLSpanElement>([
    selectedOption?.statusName,
  ]);

  return (
    <div onClick={onClick}>
      {/* TODO: Change Dropdown to Select */}
      <Tooltip
        {...(isTruncated
          ? { title: selectedOption?.statusName }
          : { open: false })}
      >
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
              backgroundColor: getStatusTagBackgroundColor(
                selectedOption?.color,
              ),
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
                    <div
                      className={clsx(styles.innerDot, styles.optionInnerDot)}
                    >
                      .
                    </div>
                  </div>
                  <span
                    ref={labelRef}
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
      </Tooltip>
    </div>
  );
};

export default StatusDropdown;
