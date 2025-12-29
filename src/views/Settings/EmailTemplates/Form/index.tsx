import { Col, Row } from "antd";
import React, { useMemo, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import FileUpload from "src/shared/components/FileUpload";
import Form from "src/shared/components/Form";
import InputField from "src/shared/components/InputField";
import TextArea from "src/shared/components/TextArea";
import { EMAIL_TEMPLATE_CONSTANTS } from "../../constants";
import styles from "../../settings.module.scss";
import emailStyles from "../../../Email/email.module.scss";
import Button from "src/shared/components/Button";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { addEmailTemplateValidation } from "./validation";
import { maxFileSizeTextDescription } from "src/constants/sharedComponents";
import { EmailTemplateService } from "src/services/SettingsService/emailTemplate.service";
import { EmailTemplate } from "src/models/meta.model";
import useForm from "src/shared/components/UseForm";
import { UploadedFile } from "src/shared/types/sharedComponents.type";
import { nameTemplate } from "src/views/Email/NewEmailModal/constants";
import { stopPropagation } from "src/shared/utils/eventUtils";

interface EmailTemplateFormProps {
  onClose: () => void;
  selectedTemplate?: EmailTemplate;
}

const EmailTemplateForm = ({
  onClose,
  selectedTemplate,
}: EmailTemplateFormProps) => {
  const { FIELDS, LABELS, PLACEHOLDERS, BUTTON_TEXT } =
    EMAIL_TEMPLATE_CONSTANTS;

  const isEditMode = !!selectedTemplate;

  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  const { getEmailTemplate, emailTemplateOperations } = EmailTemplateService();

  // Fetch the full template data when editing
  const { data: templateDetail, refetch } = useQuery(
    getEmailTemplate(selectedTemplate?.id),
  );

  const attachmentIds = useMemo(() => {
    if (templateDetail?.attachments) {
      return templateDetail.attachments.map((att) => att.id || "");
    }
    return [];
  }, [templateDetail?.attachments]);

  const initialFiles = useMemo(() => {
    if (!templateDetail?.attachments) return [];

    return templateDetail.attachments.map((att) => ({
      id: att.id || "",
      name: att.fileName || "",
      size: att.fileSize || 0,
      isInitial: true,
    })) as UploadedFile[];
  }, [templateDetail?.attachments]);

  const methods = useForm({
    validationSchema: addEmailTemplateValidation,
    values: {
      title: templateDetail?.title || "",
      subject: templateDetail?.subject || "",
      body: templateDetail?.body || "",
      attachments: attachmentIds,
    },
  });

  const { setValue } = methods;

  const { mutateAsync: saveTemplate, isPending } = useMutation(
    emailTemplateOperations(),
  );

  // TODO: TO optimize the funtion and use common function for template creation and template selection in Prospects and Members
  const onAddNameMouseDown = (e: React.MouseEvent) => e.preventDefault();

  const handleAddName = (e: React.MouseEvent) => {
    stopPropagation(e);
    const textarea = bodyRef.current;
    if (!textarea) return;

    const currentValue = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const body =
      currentValue.substring(0, start) +
      nameTemplate +
      currentValue.substring(end);

    setValue("body", body, {
      shouldValidate: true,
      shouldDirty: true,
    });

    requestAnimationFrame(() => {
      const pos = start + nameTemplate.length;
      textarea.setSelectionRange(pos, pos);
      textarea.focus();
    });
  };

  const handleSubmit = async (data: {
    title: string;
    subject: string;
    body: string;
    attachments: string[];
  }) => {
    await saveTemplate(
      {
        type: "emailTemplate",
        id: selectedTemplate?.id,
        data,
      },
      {
        onSuccess: () => {
          refetch();
          onClose();
        },
      },
    );
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <Row gutter={[20, 20]} className={styles.formRow}>
        <Col span={24}>
          <InputField
            name={FIELDS.TITLE}
            label={LABELS.TITLE}
            placeholder={PLACEHOLDERS.TITLE}
            required
          />
        </Col>
        <Col span={24}>
          <InputField
            placeholder={PLACEHOLDERS.SUBJECT}
            name={FIELDS.SUBJECT}
            label={LABELS.SUBJECT}
            required
          />
        </Col>
        <Col className={emailStyles.emailBodyContainer} span={24}>
          <Col className={emailStyles.addNameContainer}>
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
              name={FIELDS.EMAIL_BODY}
              label={LABELS.EMAIL_BODY}
              placeholder={PLACEHOLDERS.EMAIL_BODY}
              required
              className={styles.emailBodyInput}
              ref={bodyRef}
            />
          </Col>
        </Col>
        <Col span={24}>
          <FileUpload
            name={FIELDS.ATTACHMENTS}
            maxFileSizeText={maxFileSizeTextDescription}
            containerClassName={styles.uploadFileContainer}
            buttonClassName={styles.uploadFilesButton}
            maxFileSizeClassName={styles.maxFileSize}
            attachmentClassName={styles.attachment}
            initialFiles={initialFiles}
          />
        </Col>
      </Row>
      <div className={styles.modalFooter}>
        <Button
          className={styles.okButton}
          htmlType={HtmlButtonType.SUBMIT}
          loading={isPending}
        >
          {isEditMode ? BUTTON_TEXT.EDIT : BUTTON_TEXT.ADD}
        </Button>
      </div>
    </Form>
  );
};

export default EmailTemplateForm;
