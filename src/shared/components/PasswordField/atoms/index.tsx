import React from "react";
import { MouseEventHandler } from "react";
import { IconEye, IconEyeOff } from "obra-icons-react";

import styles from "../../InputField/inputField.module.scss";

export const passwordSuffix = (
  showPassword: boolean,
  togglePasswordVisibility: MouseEventHandler,
) => (
  <span className={styles.passwordIcon} onClick={togglePasswordVisibility}>
    {showPassword ? <IconEye /> : <IconEyeOff />}
  </span>
);
