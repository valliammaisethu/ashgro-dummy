import { Col, Divider, Row } from "antd";
import React from "react";
import Form from "src/shared/components/Form";
import Modal from "src/shared/components/Modal";
import ProfilePictureInput from "src/shared/components/ProfilePictureInput";
import { AddClubModalProps } from "src/shared/types/clubs.type";
import { clubFormValidationSchema } from "src/views/Clubs/AddClub/clubFormValidation";

import styles from "./addClub.module.scss";
import Switch from "src/shared/components/Switch";
import InputField from "src/shared/components/InputField";
import DatePicker from "src/shared/components/DatePicker";
import PhoneNumberField from "src/shared/components/PhoneNumberInput";
import TextArea from "src/shared/components/TextArea";

import { fields, labels, placeholders, titles } from "./constants";
import { Align } from "src/enums/align.enum";
import {
  convertDateToApiFormat,
  convertDateToDisplayFormat,
} from "src/shared/utils/dateUtils";
import useForm from "src/shared/components/UseForm";
import { FieldValues } from "react-hook-form";
import { stripPhoneCode, addPhoneCode } from "src/shared/utils/parser";
import { DateFormats } from "src/enums/dateFormats.enum";
import { ClubService } from "src/services/ClubService/club.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Buttons } from "src/enums/buttons.enum";

const AddClub = (props: AddClubModalProps) => {
  const { onClose, open, clubId = "" } = props;

  const { addClub, getClubProfile, editClub } = ClubService();

  const { data: clubData } = useQuery({
    ...getClubProfile(clubId),
    enabled: !!clubId && open,
  });

  const clubProfile = clubData?.club;

  const values = clubProfile
    ? {
        ...clubProfile,
        contactNumber: stripPhoneCode(clubProfile.contactNumber),
        onboardingDate: convertDateToDisplayFormat(clubProfile.onboardingDate),
        clubCountryCode: clubProfile.clubCountryCode || "+1",
        adminDetails: {
          ...clubProfile.adminDetails,
          contactNumber: stripPhoneCode(clubProfile.adminDetails.contactNumber),
          countryCode: clubProfile.adminDetails.countryCode || "+1",
        },
      }
    : undefined;

  const defaultValues = {
    clubCountryCode: "+1",
    adminDetails: {
      countryCode: "+1",
    },
  };

  const methods = useForm({
    values: values,
    defaultValues: defaultValues,
    validationSchema: clubFormValidationSchema,
  });

  const { mutateAsync, isPending: isAdding } = useMutation(addClub());
  const { mutateAsync: editMutateAsync, isPending: isEditing } =
    useMutation(editClub());

  const formSubmit = async (values: FieldValues) => {
    const formValues = {
      ...values,
      onboardingDate: convertDateToApiFormat(
        values.onboardingDate,
        DateFormats.DD_MMM_YYYY,
      ),
      clubCountryCode: values.clubCountryCode,
      contactNumber: addPhoneCode(values.contactNumber, values.clubCountryCode),
      adminDetails: {
        ...values.adminDetails,
        countryCode: values.adminDetails.countryCode,
        contactNumber: addPhoneCode(
          values.adminDetails.contactNumber,
          values.adminDetails.countryCode,
        ),
      },
    };
    if (clubData?.club?.id) {
      await editMutateAsync(formValues, {
        onSuccess: onClose,
      });
    } else {
      await mutateAsync(formValues, {
        onSuccess: onClose,
      });
    }
  };

  return (
    <Modal
      rootClassName={styles.addClubModal}
      title={clubId ? titles.editTitle : titles.modalTitle}
      visible={open}
      cancelButtonProps={{
        className: "d-none",
      }}
      onCancel={onClose}
      okText={clubData?.club?.id ? Buttons.SAVE_CHANGES : Buttons.ADD_CLUB}
      okButtonProps={{
        loading: clubData?.club?.id ? isEditing : isAdding,
      }}
      handleOk={methods.handleSubmit(formSubmit)}
      styles={{
        body: { height: 650 },
        content: { height: 730 },
      }}
    >
      <Form methods={methods}>
        <ProfilePictureInput isClubUpload name={fields.profilePicture} />
        <Divider />
        <div className={styles.chatbot}>
          <span className={styles.sectionTitle}>
            {titles.misc.chatbotStatus}
          </span>
          <Switch name={fields.chatbotEnabled} />
        </div>
        <Divider />

        <Row
          align={Align.MIDDLE}
          gutter={[25, 20]}
          className={styles.clubDetails}
        >
          <Col span={12}>
            <InputField
              label={labels.clubName}
              placeholder={placeholders.clubName}
              name={fields.clubName}
              required
            />
          </Col>

          <Col span={12}>
            <DatePicker
              label={labels.onBoardingDate}
              name={fields.onboardingDate}
              placeholder={placeholders.onBoardingDate}
            />
          </Col>

          <Col span={12}>
            <InputField
              required
              label={labels.clubEmail}
              name={fields.email}
              placeholder={placeholders.clubEmail}
            />
          </Col>

          <Col span={12}>
            <PhoneNumberField
              label={labels.clubPhone}
              placeholder={placeholders.phone}
              name={fields.contactNumber}
              phoneCodeName={fields.clubPhoneCountryCode}
            />
          </Col>

          <Col span={24}>
            <TextArea
              required
              label={labels.clubAddress}
              name={fields.clubAddress}
              placeholder={placeholders.clubAddress}
              rootClassName={styles.clubAddressInput}
            />
          </Col>

          <Divider />
          <Col className={styles.sectionTitle} span={24}>
            {titles.sections.primaryContact}
          </Col>

          <Col span={12}>
            <InputField
              name={fields.primaryFirstName}
              label={labels.primaryFirstName}
              placeholder={placeholders.firstName}
              required
            />
          </Col>

          <Col span={12}>
            <InputField
              name={fields.primaryLastName}
              label={labels.primaryLastName}
              placeholder={placeholders.lastName}
              required
            />
          </Col>

          <Col span={12}>
            <InputField
              name={fields.primaryEmail}
              label={labels.primaryEmail}
              placeholder={placeholders.email}
              required
            />
          </Col>

          <Col span={12}>
            <PhoneNumberField
              label={labels.primaryPhone}
              placeholder={placeholders.phone}
              name={fields.primaryPhoneNumber}
              phoneCodeName={fields.primaryPhoneCountryCode}
            />
          </Col>

          <Divider />
          <Col className={styles.sectionTitle} span={24}>
            {titles.sections.notes}
          </Col>

          <Col span={24}>
            <TextArea
              label={labels.notesDescription}
              name={fields.notes}
              placeholder={placeholders.notesDescription}
              rootClassName={styles.notesInput}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddClub;
