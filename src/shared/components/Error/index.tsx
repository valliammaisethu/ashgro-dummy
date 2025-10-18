import React, { FC } from "react";
import clsx from "clsx";
import CircleWarningFill from "node_modules/obra-icons-react/dist/icons/CircleWarningFill";

import styles from "./error.module.scss";

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, className }) => {
  if (!message) return null;
  return (
    <div className={clsx(styles.inputError, className)}>
      <span className={styles.icon}>
        <CircleWarningFill size={16} />
      </span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
