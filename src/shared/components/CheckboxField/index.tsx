import React from "react";
import { Checkbox as AntCheckbox } from "antd";
import { useController } from "react-hook-form";
import Error from "../Error";
import styles from "./checkboxField.module.scss";
import { CheckboxFieldProps } from "../../types/sharedComponents.type";

const CheckboxField = ({ name, label, ...props }: CheckboxFieldProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });
  return (
    <div className={styles.container}>
      <AntCheckbox {...field} {...props} />
      {label && <label>{label}</label>}
      {error && <Error message={error.message || ""} />}
    </div>
  );
};

export default CheckboxField;
