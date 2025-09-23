import React from "react";
import { Switch as AntSwitch, SwitchProps as AntSwitchProps } from "antd";
import { ErrorMessage, Field, useField } from "formik";
import styles from "./switch.module.scss";
import Error from "../Error";

export interface SwitchProps extends AntSwitchProps {}

export interface SwitchFormikProps extends SwitchProps {
  name: string;
}

const Switch = (props: SwitchProps) => (
  <div className={styles["switch-component"]}>
    <AntSwitch {...props} />
  </div>
);

const SwitchWithFormik = ({ name, ...props }: SwitchFormikProps) => {
  const [{ value }, , { setValue }] = useField(name);

  return (
    <>
      <Field
        as={Switch}
        checked={value}
        name={name}
        onChange={setValue}
        {...props}
      />
      <ErrorMessage name={name}>
        {(msg) => <Error message={msg} />}
      </ErrorMessage>
    </>
  );
};

Switch.Formik = SwitchWithFormik;

export default Switch;
