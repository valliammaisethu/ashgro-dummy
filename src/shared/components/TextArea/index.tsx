import React, { FC } from "react";
import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import { useFormContext, useController, FieldValues } from "react-hook-form";

import { InputStatus } from "src/enums/inputStatus.enum";
import Label from "../Label";
import Error from "../Error";

import styles from "./textArea.module.scss";

const { TextArea: AntTextArea } = Input;

interface TextAreaFieldProps extends TextAreaProps {
  name: string;
  label?: string;
  required?: boolean;
}

const TextArea: FC<TextAreaFieldProps> = ({
  name,
  label,
  required = false,
  ...rest
}) => {
  const { control } = useFormContext<FieldValues>();
  const {
    field: { value, onChange, onBlur },
    fieldState,
  } = useController({ name, control });

  return (
    <div className={styles.textAreaWrapper}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <AntTextArea
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
        status={fieldState.error ? InputStatus.ERROR : undefined}
      />

      <Error message={fieldState?.error?.message} />
    </div>
  );
};

export default TextArea;
