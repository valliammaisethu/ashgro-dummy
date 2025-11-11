import React from "react";
import { Select } from "antd";
import { IconEdit, IconDelete } from "obra-icons-react";
import clsx from "clsx";

import { Colors } from "src/enums/colors.enum";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { hoverActionBtnClass } from "./constants";

import styles from "./actions.module.scss";
import { empty } from "src/constants/sharedComponents";
import StatusTag from "src/views/Prospects/Listing/Atoms/StatusTag";

interface Option {
  label?: string;
  value?: string;
}

interface ActionsProps {
  selectedValue?: string;
  options?: Option[];
  onSelectChange?: (value: string) => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  showSelect?: boolean;
  selectPlaceholder?: string;
  selectWidth?: number;
  selectLoading?: boolean;
}

const Actions: React.FC<ActionsProps> = ({
  selectedValue,
  options = [],
  onSelectChange,
  onEditClick,
  onDeleteClick,
  showSelect = true,
  selectPlaceholder = "Select an option",
  selectLoading = false,
}) => {
  const handleSelectChange = (value: string) => {
    onSelectChange?.(value);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    stopPropagation(e);
    onEditClick?.();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    stopPropagation(e);
    onDeleteClick?.();
  };

  return (
    <div className={styles.actionContainer}>
      {showSelect && selectedValue ? (
        <div onClick={stopPropagation} className={styles.statusCol}>
          <Select
            value={selectedValue}
            placeholder={selectPlaceholder}
            className={styles.statusSelect}
            onChange={handleSelectChange}
            loading={selectLoading}
          >
            {options?.map(({ value, label = "" }) => (
              <Select.Option key={value} value={value}>
                <StatusTag label={label} />
              </Select.Option>
            ))}
          </Select>
        </div>
      ) : (
        <div className={styles.sourceColValue}>{empty}</div>
      )}
      <div className={clsx(styles.actions, hoverActionBtnClass)}>
        {onEditClick && (
          <IconEdit
            onClick={handleEditClick}
            size={20}
            color={Colors.MODAL_CLOSE_ICON}
          />
        )}
        {onDeleteClick && (
          <IconDelete
            onClick={handleDeleteClick}
            size={20}
            color={Colors.MODAL_CLOSE_ICON}
          />
        )}
      </div>
    </div>
  );
};

export default Actions;
