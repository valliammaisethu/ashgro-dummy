import React, { useMemo, useRef } from "react";
import { Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import { NewEmailModalProps } from "src/shared/types/email.type";
import {
  fields,
  labels,
  nameTemplate,
  newEmailModalConstants,
  placeholders,
} from "./constants";
import Modal from "src/shared/components/Modal";
import Form from "src/shared/components/Form";
import SelectField from "src/shared/components/SelectField";
import InputField from "src/shared/components/InputField";
import Button from "src/shared/components/Button";
import TextArea from "src/shared/components/TextArea";
import FileUpload from "src/shared/components/FileUpload";
import useForm from "src/shared/components/UseForm";
import { SelectModes } from "src/enums/selectModes.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";
import { maxFileSizeTextDescription } from "src/constants/sharedComponents";
import { generateSelectOptions } from "../utils";
import { addEmailValidation } from "./validation";
import { EmailService } from "src/services/EmailService/email.service";
import { EmailTemplateService } from "src/services/SettingsService/emailTemplate.service";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { ValidateEmail } from "src/shared/utils/helpers";

import styles from "../email.module.scss";

const NewEmailModal = (props: NewEmailModalProps) => {
  const {
    isOpen,
    onClose,
    selectedEmails = [],
    selectedTemplate,
    isBulkEmail = false,
    handleEmailComplete,
  } = props;

  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  const { getEmailTemplate } = EmailTemplateService();

  const { data: templateDetails } = useQuery({
    ...getEmailTemplate(selectedTemplate?.id),
    enabled: !!selectedTemplate?.id && isOpen,
  });

  const initialAttachments = useMemo(
    () =>
      templateDetails?.attachments?.map((attachment) => ({
        id: attachment.id || "",
        name: attachment.fileName || "",
        size: attachment.fileSize || 0,
      })) || [],
    [templateDetails],
  );

  const methods = useForm({
    validationSchema: addEmailValidation,
    values: {
      to: selectedEmails.map((e) => e.email),
      subject: selectedTemplate?.subject || "",
      body: selectedTemplate?.body || "",
      title: selectedTemplate?.title || "",
      cc: [],
      bcc: [],
      clubId,
      attachmentIds: initialAttachments.map((a) => a.id),
    },
  });

  const { reset, setValue, getValues } = methods;

  const { sendEmail } = EmailService();

  const { mutateAsync, isPending } = useMutation(sendEmail());

  const handleClose = () => {
    onClose();
    reset();
  };

  const onAddNameMouseDown = (e: React.MouseEvent) => e.preventDefault();

  const handleAddName = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textarea = bodyRef.current;
    if (!textarea) return;

    const currentValue = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const emailBody =
      currentValue.substring(0, start) +
      nameTemplate +
      currentValue.substring(end);

    setValue("body", emailBody, {
      shouldValidate: true,
      shouldDirty: true,
    });

    requestAnimationFrame(() => {
      const pos = start + nameTemplate.length;
      textarea.setSelectionRange(pos, pos);
      textarea.focus();
    });
  };

  const handleSubmit = async (values: FieldValues) => {
    const toEmails = values.to || [];

    const formattedRecipients = toEmails.map((email: string) => {
      const matchedRecipient = selectedEmails.find((e) => e.email === email);

      return {
        email,
        firstName: matchedRecipient?.name,
        id: matchedRecipient?.id || undefined,
      };
    });

    await mutateAsync(
      {
        ...values,
        to: formattedRecipients,
      },
      {
        onSuccess: () => {
          handleClose();
          handleEmailComplete?.();
        },
      },
    );
  };

  return (
    <Modal
      title={
        selectedTemplate
          ? newEmailModalConstants.newTemplateTitle
          : newEmailModalConstants.newEmailTitle
      }
      visible={isOpen}
      closeModal={handleClose}
      destroyOnHidden
      destroyOnClose
      okText={Buttons.SEND_EMAIL}
      handleOk={methods.handleSubmit(handleSubmit)}
      okButtonProps={{
        loading: isPending,
      }}
      cancelButtonProps={{ className: "d-none" }}
      rootClassName={styles.addEmailModal}
      styles={{
        body: {
          height: 650,
        },
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
          {selectedTemplate && (
            <Col span={24}>
              <InputField
                label={labels.title}
                name={fields.title}
                required
                placeholder={placeholders.title}
                disabled
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
              validateCustomInput={ValidateEmail}
            />
          </Col>
          {!isBulkEmail && (
            <>
              <Col span={24}>
                <SelectField
                  placeholder={placeholders.cc}
                  name={fields.cc}
                  label={labels.cc}
                  notFoundContent={null}
                  mode={SelectModes.MULTIPLE}
                  options={[]}
                  allowCustomOption
                  validateCustomInput={ValidateEmail}
                />
              </Col>
              <Col span={24}>
                <SelectField
                  placeholder={placeholders.bcc}
                  name={fields.bcc}
                  label={labels.bcc}
                  notFoundContent={null}
                  mode={SelectModes.MULTIPLE}
                  options={[]}
                  allowCustomOption
                  validateCustomInput={ValidateEmail}
                />
              </Col>
            </>
          )}
          <Col span={24}>
            <InputField
              placeholder={placeholders.subject}
              required
              name={fields.subject}
              label={labels.subject}
            />
          </Col>
          <Col className={styles.emailBodyContainer} span={24}>
            <Col className={styles.addNameContainer}>
              <Button
                onMouseDown={onAddNameMouseDown}
                type={ButtonTypes.LINK}
                onClick={(e) => handleAddName(e)}
              >
                {Buttons.ADD_NAME}
              </Button>
            </Col>
            <Col span={24}>
              <TextArea
                required
                name={fields.body}
                label={labels.emailBody}
                placeholder={placeholders.emailBody}
                className={styles.emailBodyInput}
                ref={bodyRef}
              />
            </Col>
          </Col>
          <Col className={styles.fileUploadContainer} span={24}>
            <FileUpload
              key={selectedTemplate?.id || "new"}
              name={fields.attachmentIds}
              maxFileSizeText={maxFileSizeTextDescription}
              containerClassName={styles.uploadFileContainer}
              buttonClassName={styles.uploadFilesButton}
              maxFileSizeClassName={styles.maxFileSize}
              attachmentClassName={styles.attachment}
              initialFiles={initialAttachments}
              deleteOnRemove={false}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewEmailModal;
