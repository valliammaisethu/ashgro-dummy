import React, { FC, useState } from "react";
import { Input } from "antd";
import { useFormContext, useController, FieldValues } from "react-hook-form";
import clsx from "clsx";

import { InputStatus } from "src/enums/inputStatus.enum";
import { INPUT_TYPE } from "src/enums/inputType";
import { PasswordFieldProps } from "src/shared/types/sharedComponents.type";
import { passwordSuffix } from "./atoms";
import Error from "../Error";
import Label from "../Label";

import styles from "src/shared/components/InputField/inputField.module.scss";

const PasswordField: FC<PasswordFieldProps> = ({
  name,
  label,
  className,
  suffix,
  ...rest
}) => {
  const { control } = useFormContext<FieldValues>();
  const {
    field: { onChange, onBlur, value },
    fieldState,
  } = useController({ name, control });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className={clsx(styles.inputWrapper, styles.passwordInput, className)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
        type={showPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
        status={fieldState.error ? InputStatus.ERROR : undefined}
        suffix={
          suffix || passwordSuffix(showPassword, togglePasswordVisibility)
        }
        spellCheck={false}
      />

      {fieldState.error && <Error message={fieldState.error.message} />}
    </div>
  );
};

export default PasswordField;
