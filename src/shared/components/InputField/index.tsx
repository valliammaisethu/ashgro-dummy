import React, { FC, ReactNode } from "react";
import { Input, InputProps } from "antd";
import { useFormContext, useController, FieldValues } from "react-hook-form";
import Error from "../Error";
import { INPUT_TYPE } from "src/enums/inputType";
import styles from "./inputField.module.scss";
import { InputStatus } from "src/enums/inputStatus.enum";

interface InputFieldProps extends InputProps {
  name: string;
  label?: string;
  type?: INPUT_TYPE;
  suffixIcon?: ReactNode;
}

const InputField: FC<InputFieldProps> = ({
  name,
  label,
  type = INPUT_TYPE.TEXT,
  suffixIcon,
  ...rest
}) => {
  const { control } = useFormContext<FieldValues>();
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <div className={styles.inputWrapper}>
      {label && <label>{label}</label>}
      <Input
        {...field}
        {...rest}
        status={fieldState.error ? InputStatus.ERROR : undefined}
        type={type}
        suffix={suffixIcon}
      />
      {fieldState.error && <Error message={fieldState.error.message || ""} />}
    </div>
  );
};

export default InputField;
