import React, { ComponentProps } from "react";
import { Radio, Space } from "antd";
import { Field } from "formik";

import styles from "./radio.module.scss";

interface RadioButtonProps {
  label?: string;
}

export type Props = RadioButtonProps & ComponentProps<typeof Radio.Group>;

const RadioButton = ({ label, ...props }: Props) => (
  <Space className={styles["radio-component"]}>
    {label && <span className={styles["radio-component__label"]}>{label}</span>}
    <Radio.Group {...props} />
  </Space>
);

const RadioButtonWithFormik = ({ name, ...props }: Props) => (
  <Field name={name} as={RadioButton} {...props} />
);

RadioButton.Formik = RadioButtonWithFormik;

export default RadioButton;
