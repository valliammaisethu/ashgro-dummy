import React from "react";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import { imageAlts } from "src/constants/imageAlts";
import { forgotPasswordConstants } from "./constants";
import { validationSchema } from "./validation";
import { fields, labels, placeholders } from "../LoginForm/constants";
import logo from "src/assets/images/logo.webp";
import Form from "src/shared/components/Form";
import InputField from "src/shared/components/InputField";
import Button from "src/shared/components/Button";
import { INPUT_TYPE } from "src/enums/inputType";
import { Buttons, HtmlButtonType } from "src/enums/buttons.enum";
import { AuthService } from "src/services/AuthService/auth.service";

import styles from "./forgotPassword.module.scss";

const { email: emailLabel } = labels;
const { email: emailPlaceholder } = placeholders;
const { email } = fields;

const ForgotPassword = () => {
  const { forgotPassword } = AuthService();

  const { mutateAsync, isPending } = useMutation(forgotPassword());

  const handleSubmit = (values: FieldValues) => mutateAsync(values);

  return (
    <div className={styles.forgotPasswordContainer}>
      <img className={styles.loginLogo} alt={imageAlts.loginLogo} src={logo} />
      <div className={styles.container}>
        <h1 className={styles.title}>{forgotPasswordConstants.title}</h1>
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
              type={INPUT_TYPE.EMAIL}
            />
          </div>
          <div className={styles.footer}>
            <Button
              htmlType={HtmlButtonType.SUBMIT}
              className={styles.submitButton}
              loading={isPending}
            >
              {Buttons.CONFIRM_EMAIL}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
