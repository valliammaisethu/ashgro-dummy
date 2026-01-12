import React from "react";
import { IconEdit, IconDelete } from "obra-icons-react";

import { Colors } from "src/enums/colors.enum";
import { stopPropagation } from "src/shared/utils/eventUtils";

import styles from "../../table.module.scss";

interface RowActionsProps<T> {
  item: T;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

const RowActions = <T,>({ item, onEdit, onDelete }: RowActionsProps<T>) => {
  const handleAction =
    (callback?: (item: T) => void) => (e: React.MouseEvent) => {
      stopPropagation(e);
      callback?.(item);
    };

  return (
    <div className={styles.actionsCell} onClick={stopPropagation}>
      <IconEdit
        size={20}
        color={Colors.MODAL_CLOSE_ICON}
        onClick={handleAction(onEdit)}
      />
      <IconDelete
        size={20}
        color={Colors.MODAL_CLOSE_ICON}
        onClick={handleAction(onDelete)}
      />
    </div>
  );
};

export default RowActions;
