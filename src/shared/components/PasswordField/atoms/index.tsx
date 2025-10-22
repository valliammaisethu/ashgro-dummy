import React from "react";
import { MouseEventHandler } from "react";
import { IconEye, IconEyeOff } from "obra-icons-react";

export const passwordSuffix = (
  showPassword: boolean,
  togglePasswordVisibility: MouseEventHandler,
) => (
  <span onClick={togglePasswordVisibility}>
    {showPassword ? <IconEye /> : <IconEyeOff />}
  </span>
);
