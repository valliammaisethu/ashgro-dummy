import React from "react";
import Modal from "src/shared/components/Modal";
import styles from "./addProspect.module.scss";
import { Col, Divider, Row } from "antd";
import InputField from "src/shared/components/InputField";
import Form from "src/shared/components/Form";
import SelectField from "src/shared/components/SelectField";
import DatePicker from "src/shared/components/DatePicker";
import PhoneNumberField from "src/shared/components/PhoneNumberInput";
import TextArea from "src/shared/components/TextArea";
import { INPUT_TYPE } from "src/enums/inputType";
import ProfilePictureInput from "src/shared/components/ProfilePictureInput";
import { Buttons } from "src/enums/buttons.enum";
import { ADD_PROSPECT_CONSTANTS } from "./constants";

const {
  MODAL_TITLE,
  MODAL_WIDTH,
  SECTION_TITLES,
  LABELS,
  PLACEHOLDERS,
  FIELD_NAMES,
} = ADD_PROSPECT_CONSTANTS;

interface AddProspectProps {
  visible: boolean;
  onClose: () => void;
}

const AddProspect = ({ visible, onClose }: AddProspectProps) => {
  return (
    <div>
      <Modal
        cancelButtonProps={{
          className: "d-none",
        }}
        title={MODAL_TITLE}
        visible={visible}
        width={MODAL_WIDTH}
        okText={Buttons.ADD_PROSPECT}
        closeModal={onClose}
      >
        <Form>
          <div className={styles.profileContainer}>
            <ProfilePictureInput
              name={FIELD_NAMES.PROFILE_PICTURE}
              label={LABELS.PROFILE_PICTURE}
            />
          </div>
          <Divider />
          <Row gutter={[20, 20]} justify={"space-between"}>
            <Col span={12}>
              <InputField
                placeholder={PLACEHOLDERS.FIRST_NAME}
                label={LABELS.FIRST_NAME}
                name={FIELD_NAMES.FIRST_NAME}
                required
              />
            </Col>
            <Col span={12}>
              <InputField
                placeholder={PLACEHOLDERS.LAST_NAME}
                label={LABELS.LAST_NAME}
                name={FIELD_NAMES.LAST_NAME}
                required
              />
            </Col>
            <Col span={12}>
              <SelectField
                placeholder={PLACEHOLDERS.LEAD_STATUS}
                label={LABELS.LEAD_STATUS}
                name={FIELD_NAMES.LEAD_STATUS}
                options={[]}
              />
            </Col>
            <Col span={12}>
              <DatePicker
                placeholder={PLACEHOLDERS.FOLLOW_UP_DATE}
                label={LABELS.FOLLOW_UP_DATE}
                name={FIELD_NAMES.FOLLOW_UP_DATE}
              />
            </Col>
            <Col span={12}>
              <InputField
                placeholder={PLACEHOLDERS.EMAIL_ADDRESS}
                label={LABELS.EMAIL_ADDRESS}
                name={FIELD_NAMES.EMAIL_ADDRESS}
                type={INPUT_TYPE.EMAIL}
                required
              />
            </Col>
            <Col span={12}>
              <PhoneNumberField
                label={LABELS.PHONE_NUMBER}
                name={FIELD_NAMES.PHONE_NUMBER}
                phoneCodeName={FIELD_NAMES.PHONE_CODE}
                placeholder={PLACEHOLDERS.PHONE_NUMBER}
              />
            </Col>
          </Row>
          <Divider />
          <div className={styles.sectionTitle}>
            {SECTION_TITLES.LEAD_DETAILS}
          </div>
          <Row gutter={[20, 20]} justify={"space-between"}>
            <Col span={12}>
              <DatePicker
                placeholder={PLACEHOLDERS.INQUIRY_DATE}
                label={LABELS.INQUIRY_DATE}
                name={FIELD_NAMES.INQUIRY_DATE}
              />
            </Col>
            <Col span={12}>
              <SelectField
                placeholder={PLACEHOLDERS.LEAD_SOURCE}
                label={LABELS.LEAD_SOURCE}
                name={FIELD_NAMES.LEAD_SOURCE}
              />
            </Col>
            <Col span={12}>
              <SelectField
                placeholder={PLACEHOLDERS.MEMBERSHIP_CATEGORY}
                label={LABELS.MEMBERSHIP_CATEGORY}
                name={FIELD_NAMES.MEMBERSHIP_CATEGORY}
              />
            </Col>
          </Row>
          <Divider />
          <div className={styles.sectionTitle}>
            {SECTION_TITLES.FEES_AND_DUES}
          </div>
          <Row gutter={[20, 20]} justify={"space-between"}>
            <Col span={12}>
              <InputField
                placeholder={PLACEHOLDERS.MONTHLY_DUES}
                label={LABELS.MONTHLY_DUES}
                name={FIELD_NAMES.MONTHLY_DUES}
                type={INPUT_TYPE.NUMBER}
              />
            </Col>
            <Col span={12}>
              <InputField
                placeholder={PLACEHOLDERS.INITIATION_FEE}
                label={LABELS.INITIATION_FEE}
                name={FIELD_NAMES.INITIATION_FEE}
                type={INPUT_TYPE.NUMBER}
              />
            </Col>
          </Row>
          <Divider />
          <div className={styles.sectionTitle}>
            {SECTION_TITLES.ACTIVITY_DETAILS}
          </div>
          <Row gutter={[20, 20]} justify={"space-between"}>
            <Col span={12}>
              <InputField
                placeholder={PLACEHOLDERS.ACTIVITY_DATE_TIME}
                label={LABELS.ACTIVITY_DATE_TIME}
                name={FIELD_NAMES.ACTIVITY_DATE_TIME}
              />
            </Col>
            <Col span={12}>
              <SelectField
                placeholder={PLACEHOLDERS.ACTIVITY_TYPE}
                label={LABELS.ACTIVITY_TYPE}
                name={FIELD_NAMES.ACTIVITY_TYPE}
              />
            </Col>
            <Col span={24}>
              <TextArea
                placeholder={PLACEHOLDERS.ACTIVITY_DESCRIPTION}
                name={FIELD_NAMES.ACTIVITY_DESCRIPTION}
                label={LABELS.ACTIVITY_DESCRIPTION}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProspect;
