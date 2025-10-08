import React, { FC } from "react";
import styles from "./error.module.scss";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.inputError}>
      <span>
        <i className="ri-error-warning-fill" />
      </span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
