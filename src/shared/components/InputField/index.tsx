import React, { FC, ReactNode } from "react";
import { Input, InputProps } from "antd";
import { useFormContext, useController, FieldValues } from "react-hook-form";

import { INPUT_TYPE } from "src/enums/inputType";
import { InputStatus } from "src/enums/inputStatus.enum";
import Label from "../Label";
import Error from "../Error";
import { dollarSymbol } from "src/constants/sharedComponents";

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

  const inputProps: InputProps = {
    id: name,
    value,
    onChange,
    onBlur,
    ...rest,
    status: fieldState.error ? InputStatus.ERROR : undefined,
  };

  if (type === INPUT_TYPE.CURRENCY) {
    inputProps.type = INPUT_TYPE.NUMBER;
    inputProps.prefix = dollarSymbol;
  } else inputProps.type = type;

  return (
    <div className={styles.inputWrapper}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <Input {...inputProps} suffix={suffix} />
      <Error message={fieldState?.error?.message} />
    </div>
  );
};

export default InputField;
