import React from "react";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import { imageAlts } from "src/constants/imageAlts";
import { forgotPasswordConstants } from "./constants";
import { fields, labels, placeholders } from "../LoginForm/constants";
import logo from "src/assets/images/logo.webp";
import { validationSchema } from "./validation";
import Button from "src/shared/components/Button";
import Form from "src/shared/components/Form";
import InputField from "src/shared/components/InputField";
import { INPUT_TYPE } from "src/enums/inputType";
import { Buttons, HtmlButtonType } from "src/enums/buttons.enum";
import { AuthService } from "src/services/AuthService/auth.service";
import useRedirect from "src/shared/hooks/useRedirect";

import styles from "./forgotPassword.module.scss";

const { email: emailLabel } = labels;
const { email: emailPlaceholder } = placeholders;
const { title } = forgotPasswordConstants;
const { email } = fields;
const { EMAIL } = INPUT_TYPE;
const { SUBMIT } = HtmlButtonType;
const { CONFIRM_EMAIL } = Buttons;
const { loginLogo } = imageAlts;

const ForgotPassword = () => {
  const { navigateToLogin } = useRedirect();

  const { forgotPassword } = AuthService();

  const { mutateAsync, isPending } = useMutation(forgotPassword());

  const handleSubmit = (values: FieldValues) =>
    mutateAsync(values, { onSuccess: navigateToLogin });

  return (
    <div className={styles.forgotPasswordContainer}>
      <img className={styles.loginLogo} alt={loginLogo} src={logo} />
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <Form
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          className={styles.form}
        >
          <div className={styles.formFields}>
            <InputField
              placeholder={emailPlaceholder}
              name={email}
              label={emailLabel}
              type={EMAIL}
            />
          </div>
          <div className={styles.footer}>
            <Button
              htmlType={SUBMIT}
              className={styles.submitButton}
              loading={isPending}
            >
              {CONFIRM_EMAIL}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
