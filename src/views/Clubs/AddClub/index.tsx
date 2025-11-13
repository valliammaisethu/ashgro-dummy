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
import { convertDateToDisplayFormat } from "src/shared/utils/dateUtils";
import { Buttons } from "src/enums/buttons.enum";

const AddClub = (props: AddClubModalProps) => {
  const { onClose, open, clubData } = props;

  const handleSubmit = () => {
    // TODO: Add API call to save club data
  };

  const defaultValues = {
    ...clubData,
    onboardingDate: convertDateToDisplayFormat(clubData?.onboardingDate),
  };

  return (
    <Modal
      rootClassName={styles.addClubModal}
      title={clubData ? titles.editTitle : titles.modalTitle}
      visible={open}
      cancelButtonProps={{
        className: "d-none",
      }}
      onCancel={onClose}
      okText={Buttons.ADD_CLUB}
      onOk={handleSubmit}
      styles={{
        body: { height: 650 },
        content: { height: 730 },
      }}
    >
      <Form
        onSubmit={handleSubmit}
        validationSchema={clubFormValidationSchema}
        defaultValues={defaultValues}
      >
        <ProfilePictureInput isClubUpload name={fields.profilePicture} />
        <Divider />
        <div className={styles.chatbot}>
          <span className={styles.sectionTitle}>
            {titles.misc.chatbotStatus}
          </span>
          <Switch name={fields.chatbotSwitch} />
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
              name={fields.clubEmail}
              placeholder={placeholders.clubEmail}
            />
          </Col>

          <Col span={12}>
            <PhoneNumberField
              label={labels.clubPhone}
              placeholder={placeholders.phone}
              name={fields.clubPhoneNumber}
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
              name={fields.notesDescription}
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
