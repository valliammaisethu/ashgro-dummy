import React, { FC, ReactNode } from "react";
import clsx from "clsx";

import styles from "./label.module.scss";

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

const Label: FC<LabelProps> = ({
  htmlFor,
  children,
  required = false,
  className,
  disabled = false,
}) => {
  if (!children) return null;
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(styles.label, className, {
        [styles.required]: required,
        [styles.disabled]: disabled,
      })}
    >
      {children}
      {required && <span className={styles.asterisk}>*</span>}
    </label>
  );
};

export default Label;
