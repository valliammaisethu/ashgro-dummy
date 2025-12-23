import React, { useEffect } from "react";
import { Col, Divider, Row } from "antd";
import { FieldValues } from "react-hook-form";

import { fields, labels, myProfileConstants, placeholders } from "../constants";
import { EditProfileProps } from "src/shared/types/myProfile.type";
import Form from "src/shared/components/Form";
import ProfilePictureInput from "src/shared/components/ProfilePictureInput";
import Modal from "src/shared/components/Modal";
import InputField from "src/shared/components/InputField";
import PhoneNumberField from "src/shared/components/PhoneNumberInput";
import useForm from "src/shared/components/UseForm";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { Buttons } from "src/enums/buttons.enum";
import { INPUT_TYPE } from "src/enums/inputType";
import { useMutation } from "@tanstack/react-query";
import { ClubService } from "src/services/ClubService/club.service";
import { stripPhoneCode } from "src/shared/utils/parser";
import { editProfileValidation } from "./validation";
import { ProfileDetails } from "src/models/profile.model";

const { editProfile } = myProfileConstants;

const { email, firstName, lastName, phoneNumber } = labels;
const {
  email: emailPlaceholder,
  firstName: firstNamePlaceholder,
  lastName: lastNamePlaceholder,
  phoneNumber: phoneNumberPlaceholder,
} = placeholders;
const {
  email: emailName,
  firstName: firstNameName,
  lastName: lastNameName,
  phoneNumber: phoneNumberName,
  attachmentId,
} = fields;

const EditProfile = (props: EditProfileProps) => {
  const { onClose, visible } = props;

  const user = localStorageHelper.getItem(LocalStorageKeys.USER);

  const { updateClubProfile } = ClubService();

  const { mutateAsync: updateProfileMutate, isPending: isUpdatePending } =
    useMutation(updateClubProfile());

  const methods = useForm({
    validationSchema: editProfileValidation,
  });

  const {
    handleSubmit: formSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const handleCloseForm = () => {
    methods.reset({});
    onClose();
  };

  const handleSubmit = (values: FieldValues) => {
    const updatedValues = {
      ...values,
      attachmentId: values.attachmentId,
      contactNumber: stripPhoneCode(values.contactNumber) ?? "",
      id: user?.id,
    };
    updateProfileMutate(updatedValues as ProfileDetails, {
      onSuccess: handleCloseForm,
    });
  };

  const defaultValues = () => {
    if (user?.id && visible) {
      methods.reset({
        [firstNameName]: user?.firstName,
        [lastNameName]: user?.lastName,
        [emailName]: user?.email,
        [phoneNumberName]: user?.contactNumber,
        [attachmentId]: user?.attachmentId,
      });
    } else {
      methods.reset({});
    }
  };

  // TODO: Revamp Form component to handle default values and remove useEffect

  useEffect(() => {
    defaultValues();
  }, [user?.id, visible]);

  return (
    <Modal
      title={editProfile}
      closeModal={onClose}
      visible={visible}
      onCancel={onClose}
      handleOk={formSubmit(handleSubmit)}
      okText={Buttons.SAVE_CHANGES}
      okButtonProps={{
        loading: isUpdatePending,
        disabled: !isDirty || !isValid,
      }}
      cancelButtonProps={{
        className: "d-none",
      }}
      destroyOnHidden
      destroyOnClose
    >
      <Form methods={methods}>
        <ProfilePictureInput name={attachmentId} />
        <Divider />
        <Row gutter={[24, 16]}>
          <Col span={12}>
            <InputField
              label={firstName}
              required
              name={firstNameName}
              placeholder={firstNamePlaceholder}
            />
          </Col>
          <Col span={12}>
            <InputField
              placeholder={lastNamePlaceholder}
              label={lastName}
              required
              name={lastNameName}
            />
          </Col>
          <Col span={12}>
            <InputField
              placeholder={emailPlaceholder}
              type={INPUT_TYPE.EMAIL}
              label={email}
              name={emailName}
              disabled
            />
          </Col>
          <Col span={12}>
            <PhoneNumberField
              name={phoneNumberName}
              label={phoneNumber}
              placeholder={phoneNumberPlaceholder}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditProfile;
