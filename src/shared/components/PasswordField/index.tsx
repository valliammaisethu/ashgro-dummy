import React, { FC, useState } from "react";
import { Input, InputProps } from "antd";
import { useFormContext, useController, FieldValues } from "react-hook-form";
import clsx from "clsx";

import { InputStatus } from "src/enums/inputStatus.enum";
import { INPUT_TYPE } from "src/enums/inputType";
import { handlePasswordChange, passwordSuffix } from "./atoms";
import Error from "../Error";
import Label from "../Label";

import styles from "src/shared/components/InputField/inputField.module.scss";

interface PasswordFieldProps extends InputProps {
  name: string;
  label?: string;
}

const PasswordField: FC<PasswordFieldProps> = ({ name, label, ...rest }) => {
  const { control } = useFormContext<FieldValues>();
  const {
    field: { onChange, onBlur },
    fieldState,
  } = useController({ name, control });

  const [passwordState, setPasswordState] = useState({
    showPassword: false,
    realValue: "",
    maskedValue: "",
  });

  const togglePasswordVisibility = () =>
    setPasswordState((prev) => ({ ...prev, showPassword: !prev.showPassword }));

  return (
    <div className={clsx(styles.inputWrapper, styles.passwordInput)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        id={name}
        value={
          passwordState.showPassword
            ? passwordState.realValue
            : passwordState.maskedValue
        }
        onChange={(e) =>
          handlePasswordChange({
            e,
            realValue: passwordState.realValue,
            setRealValue: (value: string) =>
              setPasswordState((prev) => ({ ...prev, realValue: value })),
            setMaskedValue: (value: string) =>
              setPasswordState((prev) => ({ ...prev, maskedValue: value })),
            onChange,
          })
        }
        onBlur={onBlur}
        {...rest}
        type={INPUT_TYPE.TEXT}
        status={fieldState.error ? InputStatus.ERROR : undefined}
        suffix={passwordSuffix(
          passwordState.showPassword,
          togglePasswordVisibility,
        )}
      />

      {fieldState.error && <Error message={fieldState.error.message} />}
    </div>
  );
};

export default PasswordField;
