import React, { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { debounce } from "lodash";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
import { DEBOUNCE_TIME } from "src/constants/common";
import { validationSchema } from "./validation";

import styles from "./changePassword.module.scss";

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

  const {
    formState: { isDirty, isValid },
    setError,
    reset,
    setValue,
    clearErrors,
  } = methods;

  const password = methods.watch(newPassword);

  const { changePassword, validatePassword } = AuthService();
  const { mutateAsync, isPending } = useMutation(changePassword());
  const {
    mutateAsync: validatePasswordMutate,
    isPending: isValidatePasswordPending,
  } = useMutation(validatePassword());

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (values: FieldValues) => {
    mutateAsync(values.newPassword, {
      onSuccess: (response) => {
        const { title, description } = response;
        renderNotification(title, description);
        handleClose();
      },
    });
  };

  const debouncedValidatePassword = useMemo(
    () =>
      debounce(async (value: string) => {
        await validatePasswordMutate(value, {
          onError: (response) => {
            // TODO: Change api response and handle invalid error in 200 status code
            const errMsg = response?.response?.data?.error as string;
            setError(currentPassword, { type: "manual", message: errMsg });
          },
        });
      }, DEBOUNCE_TIME),
    [validatePasswordMutate],
  );

  const handleCurrentPassword = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value ?? "";
    clearErrors(currentPassword);
    setValue(currentPassword, value);
    if (value) {
      debouncedValidatePassword(value);
    }
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
            onChange={handleCurrentPassword}
            suffix={
              isValidatePasswordPending ? (
                <Spin indicator={<LoadingOutlined />} />
              ) : undefined
            }
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
