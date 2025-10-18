import React, { MouseEventHandler } from "react";
import {
  IconEye,
  IconEyeClose,
  IconEyeFill,
  IconEyeOff,
} from "obra-icons-react";

import { INPUT_TYPE } from "src/enums/inputType";
import { HandlePasswordChangeParams } from "src/shared/types/sharedComponents.type";
import { passwordAsterisk } from "src/constants/sharedComponents";

const { TEXT, PASSWORD } = INPUT_TYPE;

export const inputType = (showPassword: boolean) =>
  showPassword ? TEXT : PASSWORD;

export const iconClass = (showPassword: boolean) =>
  showPassword ? <IconEyeFill /> : <IconEyeClose />;

export const passwordSuffix = (
  showPassword: boolean,
  togglePasswordVisibility: MouseEventHandler,
) => (
  <span onClick={togglePasswordVisibility}>
    {showPassword ? <IconEye /> : <IconEyeOff />}
  </span>
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
