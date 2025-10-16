import React, { MouseEventHandler } from "react";
import { INPUT_TYPE } from "src/enums/inputType";
import {
  IconEye,
  IconEyeClose,
  IconEyeFill,
  IconEyeOff,
} from "obra-icons-react";

export const inputType = (showPassword: boolean) =>
  showPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD;

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
