import clsx from "clsx";
import React, { MouseEventHandler } from "react";

import { Icons } from "src/enums/icons.enum";
import { INPUT_TYPE } from "src/enums/inputType";
import { HandlePasswordChangeParams } from "src/shared/types/sharedComponents.type";
import { passwordAsterisk } from "src/constants/sharedComponents";

import styles from "../../InputField/inputField.module.scss";

const { TEXT, PASSWORD } = INPUT_TYPE;
const { EYE_LINE, EYE_OFF_LINE } = Icons;

export const inputType = (showPassword: boolean) =>
  showPassword ? TEXT : PASSWORD;

export const iconClass = (showPassword: boolean) =>
  showPassword ? EYE_LINE : EYE_OFF_LINE;

export const passwordSuffix = (
  showPassword: boolean,
  togglePasswordVisibility: MouseEventHandler,
) => (
  <i
    className={clsx(iconClass(showPassword), styles.passwordSuffix)}
    onClick={togglePasswordVisibility}
  />
);

export const handlePasswordChange = ({
  e,
  realValue,
  setRealValue,
  setMaskedValue,
  onChange,
}: HandlePasswordChangeParams) => {
  const input = e.target.value;
  const newLen = input.length;
  const diff = newLen - realValue.length;

  if (diff > 0) {
    const newChars = input.slice(-diff);
    const updated = realValue + newChars;
    setRealValue(updated);
    onChange(updated);
  } else if (diff < 0) {
    const updated = realValue.slice(0, newLen);
    setRealValue(updated);
    onChange(updated);
  }

  setMaskedValue(passwordAsterisk.repeat(newLen));
};
