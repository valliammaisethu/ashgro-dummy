import React from "react";
import { IconEdit, IconDelete } from "obra-icons-react";
import clsx from "clsx";
import { Select } from "antd";

import { Colors } from "src/enums/colors.enum";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { hoverActionBtnClass } from "./constants";
import {
  selectStatus,
  selectStatusClassName,
} from "src/constants/sharedComponents";
import { ClubStatusOptions } from "src/views/Clubs/IndividualClub/constants";

import styles from "./actions.module.scss";

export interface Option {
  label?: string;
  value?: string;
  color?: string;
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
      {showSelect && (
        <div onClick={stopPropagation} className={styles.statusCol}>
          <Select
            value={selectedValue}
            options={ClubStatusOptions}
            onChange={handleSelectChange}
            loading={selectLoading}
            className={selectStatusClassName}
            onClick={stopPropagation}
            placeholder={selectStatus}
          />
        </div>
      )}
      <div className={clsx(styles.actions, hoverActionBtnClass)}>
        {onEditClick && (
          <IconEdit
            onClick={handleEditClick}
            size={20}
            color={Colors.MODAL_CLOSE_ICON}
            className={styles.icon}
          />
        )}
        {onDeleteClick && (
          <IconDelete
            onClick={handleDeleteClick}
            size={20}
            color={Colors.MODAL_CLOSE_ICON}
            className={styles.icon}
          />
        )}
      </div>
    </div>
  );
};

export default Actions;
