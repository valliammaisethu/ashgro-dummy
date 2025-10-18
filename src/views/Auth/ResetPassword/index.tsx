import React from "react";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import logo from "src/assets/images/logo.webp";
import { imageAlts } from "src/constants/imageAlts";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import Form from "src/shared/components/Form";
import PasswordField from "src/shared/components/PasswordField";
import Button from "src/shared/components/Button";
import useForm from "src/shared/components/UseForm";
import useRedirect from "src/shared/hooks/useRedirect";
import { AuthService } from "src/services/AuthService/auth.service";
import {
  fields,
  labels,
  placeholders,
  resetPasswordConstants,
} from "./constants";
import { validationSchema } from "./validation";
import PasswordValidation from "./PasswordValidation";

import styles from "./resetPassword.module.scss";

const { confirmPassword, newPassword } = fields;
const { newPassword: newPasswordPlaceholder } = placeholders;
const { newPassword: newPasswordLabel, confirmPassword: confirmPasswordLabel } =
  labels;
const { BACK_TO_LOGIN, RESET_PASSWORD } = Buttons;

const ResetPassword = () => {
  const methods = useForm({
    validationSchema: validationSchema,
  });

  const {
    formState: { isDirty, isValid },
  } = methods;

  const password = methods.watch("newPassword");

  const { navigateToLogin } = useRedirect();
  const { resetPassword } = AuthService();

  const { mutateAsync, isPending } = useMutation(resetPassword());

  const handleSubmit = (values: FieldValues) =>
    mutateAsync(values, {
      onSuccess: navigateToLogin,
    });

  return (
    <div className={styles.resetPasswordContainer}>
      <img className={styles.loginLogo} alt={imageAlts.loginLogo} src={logo} />
      <div className={styles.container}>
        <h1 className={styles.title}>{resetPasswordConstants.title}</h1>
        <Form
          methods={methods}
          validationSchema={validationSchema}
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.formFields}>
            <PasswordField
              placeholder={newPasswordPlaceholder}
              name={newPassword}
              label={newPasswordLabel}
            />
            <PasswordValidation password={password || ""} />
            <PasswordField
              placeholder={newPasswordPlaceholder}
              name={confirmPassword}
              label={confirmPasswordLabel}
            />
          </div>
          <div className={styles.footer}>
            <Button
              className={styles.backButton}
              type={ButtonTypes.SECONDARY_TWO}
              onClick={navigateToLogin}
            >
              {BACK_TO_LOGIN}
            </Button>
            <Button
              htmlType={HtmlButtonType.SUBMIT}
              className={styles.submitButton}
              disabled={!isValid || !isDirty}
              loading={isPending}
            >
              {RESET_PASSWORD}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
