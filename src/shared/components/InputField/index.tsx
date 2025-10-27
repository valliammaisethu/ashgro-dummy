import React, { FC, ReactNode } from "react";
import { Input, InputProps } from "antd";
import { useFormContext, useController, FieldValues } from "react-hook-form";

import { INPUT_TYPE } from "src/enums/inputType";
import { InputStatus } from "src/enums/inputStatus.enum";
import Label from "../Label";
import Error from "../Error";

import styles from "./inputField.module.scss";

interface InputFieldProps extends InputProps {
  name: string;
  label?: string;
  type?: INPUT_TYPE;
  suffix?: ReactNode;
  required?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  name,
  label,
  type = INPUT_TYPE.TEXT,
  suffix,
  required = false,
  ...rest
}) => {
  const { control } = useFormContext<FieldValues>();
  const {
    field: { value, onChange, onBlur },
    fieldState,
  } = useController({ name, control });

  return (
    <div className={styles.inputWrapper}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <Input
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
        type={type}
        suffix={suffix}
        status={fieldState.error ? InputStatus.ERROR : undefined}
      />

      {fieldState.error && <Error message={fieldState.error.message} />}
    </div>
  );
};

export default InputField;
