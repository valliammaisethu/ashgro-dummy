import React from "react";
import { Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

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
import Button from "src/shared/components/Button";
import useForm from "src/shared/components/UseForm";
import { SelectModes } from "src/enums/selectModes.enum";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { maxFileSizeTextDescription } from "src/constants/sharedComponents";
import { generateSelectOptions } from "../utils";
import { addEmailValidation } from "./validation";
import { EmailService } from "src/services/EmailService/email.service";

import styles from "../email.module.scss";
import { SelectedEmailModel } from "src/models/email.model";

const NewEmailModal = (props: NewEmailModalProps) => {
  const { isOpen, onClose, isTemplate = false, selectedEmails = [] } = props;

  const methods = useForm({
    validationSchema: addEmailValidation,
    values: {
      to: selectedEmails.map((e) => e.email),
      subject: "",
      emailBody: "",
      cc: "",
      bcc: "",
    },
  });

  const { sendEmail } = EmailService();

  const { mutateAsync } = useMutation(sendEmail());

  const handleSubmit = (values: FieldValues) => {
    const recipients =
      selectedEmails && selectedEmails.length > 0
        ? selectedEmails
        : values.recipients || [];

    const formattedRecipients = recipients.map(
      (recipient: SelectedEmailModel) => ({
        email: recipient.email,
        firstName: recipient.name,
      }),
    );

    mutateAsync({
      bcc: values.bcc ? [values.bcc] : [],
      cc: values.cc ? [values.cc] : [],
      body: values.emailBody,
      subject: values.subject,
      to: formattedRecipients,
      attachmentIds: values.attachmentIds,
    });
  };

  return (
    <Modal
      title={
        !isTemplate
          ? newEmailModalConstants.newTemplateTitle
          : newEmailModalConstants.newEmailTitle
      }
      visible={isOpen}
      closeModal={onClose}
      destroyOnHidden
      destroyOnClose
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
      <Form onSubmit={handleSubmit} methods={methods}>
        <Row gutter={[16, 16]}>
          {!isTemplate && (
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
              label={labels.to}
              name={fields.to}
              mode={SelectModes.MULTIPLE}
              required
              options={generateSelectOptions(
                selectedEmails?.map((e) => e.email ?? "") ?? [],
              )}
              defaultValue={
                selectedEmails?.length > 1 ? selectedEmails : selectedEmails[0]
              }
              placeholder={placeholders.to}
              allowCustomOption
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
          <Button
            htmlType={HtmlButtonType.SUBMIT}
            type={ButtonTypes.DEFAULT}
            className={styles.okButton}
          >
            {Buttons.SEND_EMAIL}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default NewEmailModal;
