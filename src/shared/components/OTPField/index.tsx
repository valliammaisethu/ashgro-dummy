import React from "react";
import OtpInput, { OTPInputProps } from "react-otp-input";
import { ErrorMessage, Field, useField } from "formik";
import Error from "../Error";

import styles from "./otpField.module.scss";

interface OTPFieldProps extends Omit<OTPInputProps, "numInputs"> {
  numInputs?: number;
}

interface OTPFieldFormikProps extends Partial<OTPFieldProps> {
  name: string;
}

const OTPField = ({ numInputs = 6, ...props }: OTPFieldProps) => (
  <div className={styles["otp__container"]}>
    <OtpInput
      inputStyle={styles["otp-field"]}
      containerStyle={styles["otp__container"]}
      numInputs={numInputs}
      {...props}
    />
  </div>
);

const OTPFieldWithFormik = ({ name, ...props }: OTPFieldFormikProps) => {
  const [{ value }, , { setValue }] = useField<string>(name);

  return (
    <>
      <Field as={OTPField} onChange={setValue} value={value} {...props} />
      <ErrorMessage name={name}>
        {(msg) => <Error message={msg} />}
      </ErrorMessage>
    </>
  );
};

OTPField.Formik = OTPFieldWithFormik;

export default OTPField;
