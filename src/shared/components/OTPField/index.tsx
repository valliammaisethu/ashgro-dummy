import React from "react";
import OtpInput, { OtpInputProps } from "react-otp-input";
import { ErrorMessage, Field, useField } from "formik";
import Error from "../Error";

import styles from "./otpField.module.scss";

interface OTPFieldProps extends Omit<OtpInputProps, "numInputs"> {
  numInputs?: number;
}

interface OTPFieldFormikProps extends Partial<OTPFieldProps> {
  name: string;
}

const OTPField = ({ numInputs = 6, ...props }: OTPFieldProps) => (
  <div className={styles["otp__container"]}>
    <OtpInput
      className={styles["otp-field"]}
      numInputs={numInputs}
      {...props}
    />
  </div>
);

const OTPFieldWithFormik = ({ name, ...props }: OTPFieldFormikProps) => {
  const [{ value }, , { setValue }] = useField<string>(name);

  return (
    <>
      <Field name={name}>
        {() => (
          <OTPField
            value={value}
            onChange={setValue}
            {...props}
          />
        )}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => <Error message={msg} />}
      </ErrorMessage>
    </>
  );
};

OTPField.Formik = OTPFieldWithFormik;

export default OTPField;
