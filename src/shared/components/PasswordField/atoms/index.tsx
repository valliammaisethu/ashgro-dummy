import React from "react";
import { MouseEventHandler } from "react";
import { IconEye, IconEyeOff } from "obra-icons-react";

import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import styles from "../../InputField/inputField.module.scss";

export const passwordSuffix = (
  showPassword: boolean,
  togglePasswordVisibility: MouseEventHandler,
) => (
  <span className={styles.passwordIcon} onClick={togglePasswordVisibility}>
    <ConditionalRenderComponent
      visible={showPassword}
      fallback={<IconEyeOff size={20} />}
    >
      <IconEye size={20} />
    </ConditionalRenderComponent>
  </span>
);
