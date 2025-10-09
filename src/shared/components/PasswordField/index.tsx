import React, { FC, useState } from "react";
import { Input, InputProps } from "antd";
import { useFormContext, useController, FieldValues } from "react-hook-form";

import { InputStatus } from "src/enums/inputStatus.enum";
import Error from "../Error";
import Label from "../Label";

import styles from "src/shared/components/InputField/inputField.module.scss";
import { inputType, passwordSuffix } from "./atoms";

interface PasswordFieldProps extends InputProps {
  name: string;
  label?: string;
}

const PasswordField: FC<PasswordFieldProps> = ({ name, label, ...rest }) => {
  const { control } = useFormContext<FieldValues>();
  const {
    field: { value, onChange, onBlur },
    fieldState,
  } = useController({ name, control });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className={styles.inputWrapper}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
        type={inputType(showPassword)}
        status={fieldState.error ? InputStatus.ERROR : undefined}
        suffix={passwordSuffix(showPassword, togglePasswordVisibility)}
      />

      {fieldState.error && <Error message={fieldState.error.message} />}
    </div>
  );
};

export default PasswordField;
