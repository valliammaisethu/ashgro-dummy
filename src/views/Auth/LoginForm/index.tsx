import React from "react";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import Form from "src/shared/components/Form";
import InputField from "src/shared/components/InputField";
import CheckboxField from "src/shared/components/CheckboxField";
import Button from "src/shared/components/Button";
import PasswordField from "src/shared/components/PasswordField";
import { INPUT_TYPE } from "src/enums/inputType";
import { Buttons, HtmlButtonType } from "src/enums/buttons.enum";

import { AuthService } from "src/services/AuthService/auth.service";

import logo from "src/assets/images/logo.webp";
import { imageAlts } from "src/constants/imageAlts";
import { fields, labels, loginFormConstants, placeholders } from "./constants";
import { validationSchema } from "./LoginValidation";

import styles from "./loginForm.module.scss";

const LoginForm = () => {
  const { email: emailPlaceholder, password: passwordPlaceholder } =
    placeholders;
  const {
    email: emailLabel,
    password: passwordLabel,
    rememberMe: rememberMeLabel,
  } = labels;
  const { email, password, rememberMe } = fields;
  const { loginUser } = AuthService();

  const { mutateAsync, isPending } = useMutation(loginUser());

  const handleSubmit = (values: FieldValues) =>
    mutateAsync({
      ...values,
      rememberMe: values.rememberMe ? true : false,
    });
  return (
    <div className={styles.loginFormContainer}>
      <img className={styles.loginLogo} alt={imageAlts.loginLogo} src={logo} />
      <div className={styles.container}>
        <h1 className={styles.title}>{loginFormConstants.title}</h1>
        <Form
          validationSchema={validationSchema}
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.formFields}>
            <InputField
              placeholder={emailPlaceholder}
              name={email}
              label={emailLabel}
              type={INPUT_TYPE.EMAIL}
            />
            <PasswordField
              name={password}
              label={passwordLabel}
              placeholder={passwordPlaceholder}
              className={styles.passwordInput}
            />
          </div>
          <div className={styles.footer}>
            <CheckboxField name={rememberMe} label={rememberMeLabel} />
            <span className={styles.forgotPassword}>
              {loginFormConstants.forgotPassword}
            </span>
          </div>
          <Button
            htmlType={HtmlButtonType.SUBMIT}
            className={styles.loginButton}
            loading={isPending}
          >
            {Buttons.LOGIN}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
