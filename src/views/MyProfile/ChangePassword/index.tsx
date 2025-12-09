import React from "react";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import Modal from "src/shared/components/Modal";
import Form from "src/shared/components/Form";
import PasswordField from "src/shared/components/PasswordField";
import useForm from "src/shared/components/UseForm";
import Button from "src/shared/components/Button";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { AuthService } from "src/services/AuthService/auth.service";
import { renderNotification } from "src/shared/utils/renderNotification";
import { ChangePasswordProps } from "src/shared/types/myProfile.type";
import PasswordValidation from "src/views/Auth/ResetPassword/PasswordValidation";
import {
  changePasswordConstants,
  fields,
  labels,
  placeholders,
} from "./constants";
import { validationSchema } from "./validation";

import styles from "./changePassword.module.scss";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";

const { currentPassword, newPassword, confirmPassword } = fields;
const {
  currentPassword: currentPasswordPlaceholder,
  newPassword: newPasswordPlaceholder,
  confirmPassword: confirmPasswordPlaceholder,
} = placeholders;
const {
  currentPassword: currentPasswordLabel,
  newPassword: newPasswordLabel,
  confirmPassword: confirmPasswordLabel,
} = labels;

const ChangePassword = (props: ChangePasswordProps) => {
  const { onClose, visible } = props;

  const methods = useForm({
    validationSchema: validationSchema,
  });

  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const {
    formState: { isDirty, isValid },
    reset,
  } = methods;

  const password = methods.watch(newPassword);

  const { changePassword } = AuthService();
  const { mutateAsync, isPending } = useMutation(changePassword());

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (values: FieldValues) => {
    mutateAsync(
      {
        oldPassword: values.currentPassword,
        id: clubId,
      },
      {
        onSuccess: (response) => {
          const { title, description } = response;
          renderNotification(title, description);
          handleClose();
        },
      },
    );
  };

  return (
    <Modal
      title={changePasswordConstants.title}
      closeModal={handleClose}
      visible={visible}
      renderHeader={false}
      rootClassName={styles.changePasswordModal}
      onCancel={handleClose}
      okText={Buttons.CHANGE_PASSWORD}
      footer={[]}
      width={480}
    >
      <div className={styles.header}>{changePasswordConstants.title}</div>
      <Form
        onSubmit={handleSubmit}
        methods={methods}
        validationSchema={validationSchema}
      >
        <div className={styles.formFields}>
          <PasswordField
            placeholder={currentPasswordPlaceholder}
            name={currentPassword}
            label={currentPasswordLabel}
          />
          <PasswordField
            placeholder={newPasswordPlaceholder}
            name={newPassword}
            label={newPasswordLabel}
            className="mt-5"
          />
          <PasswordValidation password={password} />
          <PasswordField
            placeholder={confirmPasswordPlaceholder}
            name={confirmPassword}
            label={confirmPasswordLabel}
          />
          <Button
            htmlType={HtmlButtonType.SUBMIT}
            className={styles.changePassword}
            type={ButtonTypes.PRIMARY}
            disabled={!isValid || !isDirty}
            loading={isPending}
          >
            {Buttons.CHANGE_PASSWORD}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePassword;
