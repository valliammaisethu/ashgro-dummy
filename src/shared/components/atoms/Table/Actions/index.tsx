import React from "react";
import { Select } from "antd";
import { IconEdit, IconDelete } from "obra-icons-react";

import { Colors } from "src/enums/colors.enum";
import { stopPropagation } from "src/shared/utils/eventUtils";

import styles from "./actions.module.scss";

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
}

const Actions: React.FC<ActionsProps> = ({
  selectedValue,
  options = [],
  onSelectChange,
  onEditClick,
  onDeleteClick,
  showSelect = true,
  selectPlaceholder = "Select an option",
  selectWidth = 200,
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
      {showSelect && (
        <div onClick={stopPropagation}>
          <Select
            style={{ width: selectWidth }}
            placeholder={selectPlaceholder}
            value={selectedValue}
            onChange={handleSelectChange}
            options={options}
          />
        </div>
      )}

      <div className={styles.actions}>
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
