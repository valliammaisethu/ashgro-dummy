import React from "react";
import { IconEmail } from "obra-icons-react";

import Button from "../../../Button";
import { Buttons } from "src/enums/buttons.enum";
import { BulkMailButtonProps } from "src/shared/types/sharedComponents.type";

import styles from "./bulkMailButton.module.scss";

const BulkMailButton = (props: BulkMailButtonProps) => {
  const { onClick, disabled, loading } = props;

  return (
    <Button
      icon={<IconEmail className={styles.bulkMailIcon} size={20} />}
      className={styles.bulkMailButton}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      {Buttons.BULK_MAIL}
    </Button>
  );
};

export default BulkMailButton;
