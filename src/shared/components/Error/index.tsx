import React, { FC } from "react";
import CircleWarningFill from "node_modules/obra-icons-react/dist/icons/CircleWarningFill";

import styles from "./error.module.scss";

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, className }) => {
  return (
    <div className={`${styles.inputError} ${className || ""}`}>
      <span>
        <CircleWarningFill size={16} />
      </span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
