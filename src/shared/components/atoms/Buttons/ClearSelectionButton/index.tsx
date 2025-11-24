import React from "react";
import { IconClose } from "obra-icons-react";

import { Buttons } from "src/enums/buttons.enum";
import { Colors } from "src/enums/colors.enum";
import { ClearSelectionButtonProps } from "src/shared/types/sharedComponents.type";

import styles from "./clearSelectionButton.module.scss";

const ClearSelectionButton = (props: ClearSelectionButtonProps) => {
  const { onClick } = props;

  return (
    <div onClick={onClick} className={styles.clearSelection}>
      <IconClose strokeWidth={1.75} color={Colors.ASHGRO_NAVY} size={20} />
      {Buttons.CLEAR_SELECTION}
    </div>
  );
};

export default ClearSelectionButton;
