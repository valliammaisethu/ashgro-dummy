import React from "react";
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
    defaultValues: {
      [firstNameName]: user?.firstName,
      [lastNameName]: user?.lastName,
      [emailName]: user?.email,
      [phoneNumberName]: user?.phoneNumber,
      [attachmentId]: user?.attachmentId,
    },
    validationSchema: editProfileValidation,
  });

  const {
    handleSubmit: formSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const handleSubmit = (values: FieldValues) => {
    updateProfileMutate(
      {
        ...values,
        attachmentId: values.attachmentId,
        emailId: values.emailId,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        phoneNumber: stripPhoneCode(values.phoneNumber),
        id: user?.id,
        email: "",
        profilePicture: "",
        contactNumber: "",
      },
      {
        onSuccess: onClose,
      },
    );
  };

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
