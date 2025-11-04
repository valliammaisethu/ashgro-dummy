import React from "react";
import { Col, Row } from "antd";

import { NewEmailModalProps } from "src/shared/types/email.type";
import {
  fields,
  labels,
  newEmailModalConstants,
  placeholders,
} from "./constants";
import Modal from "src/shared/components/Modal";
import Form from "src/shared/components/Form";
import SelectField from "src/shared/components/SelectField";
import InputField from "src/shared/components/InputField";
import TextArea from "src/shared/components/TextArea";
import FileUpload from "src/shared/components/FileUpload";

import styles from "../email.module.scss";
import Button from "src/shared/components/Button";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";
import { maxFileSizeTextDescription } from "src/constants/sharedComponents";

const NewEmailModal = (props: NewEmailModalProps) => {
  const { isOpen, onClose, isTemplate = false } = props;

  return (
    <Modal
      title={
        isTemplate
          ? newEmailModalConstants.newTemplateTitle
          : newEmailModalConstants.newEmailTitle
      }
      visible={isOpen}
      closeModal={onClose}
      rootClassName={styles.addEmailModal}
      styles={{
        content: {
          height: 730,
        },
        wrapper: {
          top: 0,
        },
      }}
    >
      <Form>
        <Row gutter={[16, 16]}>
          {isTemplate && (
            <Col span={24}>
              <InputField
                label={labels.title}
                name={fields.title}
                required
                placeholder={placeholders.title}
              />
            </Col>
          )}
          <Col span={24}>
            <SelectField
              label={labels.recipients}
              name={fields.recipients}
              options={[]}
              required
              placeholder={placeholders.recipients}
            />
          </Col>
          <Col span={24}>
            <InputField
              placeholder={placeholders.cc}
              name={fields.cc}
              label={labels.cc}
            />
          </Col>
          <Col span={24}>
            <InputField
              placeholder={placeholders.bcc}
              name={fields.bcc}
              label={labels.bcc}
            />
          </Col>
          <Col span={24}>
            <InputField
              placeholder={placeholders.subject}
              required
              name={fields.subject}
              label={labels.subject}
            />
          </Col>
          <Col span={24}>
            <TextArea
              required
              name={fields.emailBody}
              label={labels.emailBody}
              placeholder={placeholders.emailBody}
              className={styles.emailBodyInput}
            />
          </Col>
          <Col className={styles.fileUploadContainer} span={24}>
            <FileUpload
              name={fields.attachmentIds}
              maxFileSizeText={maxFileSizeTextDescription}
              containerClassName={styles.uploadFileContainer}
              buttonClassName={styles.uploadFilesButton}
              maxFileSizeClassName={styles.maxFileSize}
              attachmentClassName={styles.attachment}
            />
          </Col>
        </Row>
        <div className={styles.modalFooter}>
          <Button type={ButtonTypes.DEFAULT} className={styles.okButton}>
            {Buttons.SEND_EMAIL}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default NewEmailModal;
