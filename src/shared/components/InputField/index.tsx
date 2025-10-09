import React, { FC, ReactNode, useState, useCallback } from "react";
import { Input, InputProps } from "antd";
import { useFormContext, useController, FieldValues } from "react-hook-form";
import Error from "../Error";
import { INPUT_TYPE } from "src/enums/inputType";
import styles from "./inputField.module.scss";
import { InputStatus } from "src/enums/inputStatus.enum";
import { Icons } from "src/enums/icons.enum";

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
  const [showPassword, setShowPassword] = useState(false);

  const { control } = useFormContext<FieldValues>();

  const {
    field: { value, onChange, onBlur, ref },
    fieldState,
  } = useController({
    name,
    control,
  });

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const isPasswordField = type === INPUT_TYPE.PASSWORD;
  const inputType = isPasswordField && showPassword ? INPUT_TYPE.TEXT : type;

  const renderSuffixIcon = () => {
    if (!isPasswordField) return suffixIcon;
    const iconClass = showPassword ? Icons.EYE_LINE : Icons.EYE_OFF_LINE;
    return <i className={iconClass} onClick={togglePasswordVisibility}></i>;
  };

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <Input
        id={name}
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
        type={inputType}
        status={fieldState.error ? InputStatus.ERROR : undefined}
        suffix={renderSuffixIcon()}
      />

      {fieldState.error && <Error message={fieldState.error.message} />}
    </div>
  );
};

export default InputField;
