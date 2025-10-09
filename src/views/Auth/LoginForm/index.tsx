import React from "react";
import styles from "./loginForm.module.scss";
import { fields, labels, loginFormConstants, placeholders } from "./constants";
import Form from "src/shared/components/Form";
import InputField from "src/shared/components/InputField";
import { INPUT_TYPE } from "src/enums/inputType";
import CheckboxField from "src/shared/components/CheckboxField";
import Button from "src/shared/components/Button";
import { Buttons } from "src/enums/buttons.enum";
import logo from "src/assets/images/logo.webp";
import { imageAlts } from "src/constants/imageAlts";
import { validationSchema } from "./LoginValidation";

const LoginForm = () => {
  return (
    <div className={styles.loginFormContainer}>
      <img alt={imageAlts.loginLogo} src={logo} />
      <div className={styles.container}>
        <h1>{loginFormConstants.title}</h1>
        <Form validationSchema={validationSchema} className={styles.form}>
          <div className={styles.formFields}>
            <InputField
              placeholder={placeholders.email}
              name={fields.email}
              label={labels.email}
              type={INPUT_TYPE.EMAIL}
            />
            <InputField
              placeholder={placeholders.password}
              name={fields.password}
              label={labels.password}
              type={INPUT_TYPE.PASSWORD}
              className={styles.passwordInput}
            />
          </div>
          <div className={styles.footer}>
            <CheckboxField name={fields.rememberMe} label={labels.rememberMe} />
            <span>{loginFormConstants.forgotPassword}</span>
          </div>
          <Button className={styles.loginButton}>{Buttons.LOGIN}</Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
