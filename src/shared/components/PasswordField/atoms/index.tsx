import React, { MouseEventHandler } from "react";
import { Icons } from "src/enums/icons.enum";
import { INPUT_TYPE } from "src/enums/inputType";

export const inputType = (showPassword: boolean) =>
  showPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD;

export const iconClass = (showPassword: boolean) =>
  showPassword ? Icons.EYE_LINE : Icons.EYE_OFF_LINE;

export const passwordSuffix = (
  showPassword: boolean,
  togglePasswordVisibility: MouseEventHandler,
) => (
  <i className={iconClass(showPassword)} onClick={togglePasswordVisibility}></i>
);
