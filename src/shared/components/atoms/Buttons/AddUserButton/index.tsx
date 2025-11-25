import React from "react";
import { IconUserAdd } from "obra-icons-react";

import Button from "../../../Button";
import { ButtonTypes } from "src/enums/buttons.enum";
import { AddUserButtonProps } from "src/shared/types/sharedComponents.type";

import styles from "./addUserButton.module.scss";

const AddUserButton = (props: AddUserButtonProps) => {
  const { onClick, label } = props;

  return (
    <Button
      className={styles.addUserButton}
      type={ButtonTypes.SECONDARY}
      icon={<IconUserAdd size={20} />}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default AddUserButton;
