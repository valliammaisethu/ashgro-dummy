import React from "react";

import Button from "src/shared/components/Button";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";
import { ERROR_STATE_STRINGS } from "../../constants";

import styles from "./errorState.module.scss";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onReload?: () => void;
}

const { TITLE, DESCRIPTION } = ERROR_STATE_STRINGS;

const ErrorState: React.FC<ErrorStateProps> = ({
  title = TITLE,
  description = DESCRIPTION,
  onReload,
}) => {
  return (
    <div className={styles.errorStateContainer}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {onReload && (
        <Button
          className={styles.reloadBtn}
          onClick={onReload}
          type={ButtonTypes.TERTIARY}
        >
          {Buttons.RELOAD}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
