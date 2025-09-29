import React, { ComponentProps } from "react";
import { Select, SelectProps } from "antd";
import { Field, ErrorMessage, useField } from "formik";
import Error from "../Error";
import { BaseOptionType, DefaultOptionType } from "rc-select/lib/Select";

import styles from "./dropdownField.module.scss";

interface DropdownProps<
  ValueType,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends SelectProps<ValueType, OptionType> {
  name: string;
  title?: string;
}

const Dropdown = <
  ValueType,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>({
  title,
  ...props
}: DropdownProps<ValueType, OptionType>) => (
  <div className={styles["dropdown-field"]}>
    {title && <div className={styles["dropdown-field__title"]}>{title}</div>}
    <Select {...props} />
  </div>
);

const DropdownWithFormik = (props: ComponentProps<typeof Dropdown>) => {
  const [, , { setValue }] = useField(props.name);

  return (
    <>
      <Field component={Dropdown} onChange={setValue} {...props} />
      <ErrorMessage name={props.name}>
        {(message) => <Error message={message} />}
      </ErrorMessage>
    </>
  );
};

Dropdown.Formik = DropdownWithFormik;

export default Dropdown;
