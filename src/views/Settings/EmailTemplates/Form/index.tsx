import { Col, Row } from "antd";
import React, { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import FileUpload from "src/shared/components/FileUpload";
import Form from "src/shared/components/Form";
import InputField from "src/shared/components/InputField";
import TextArea from "src/shared/components/TextArea";
import { EMAIL_TEMPLATE_CONSTANTS } from "../../constants";
import styles from "../../settings.module.scss";
import Button from "src/shared/components/Button";
import { HtmlButtonType } from "src/enums/buttons.enum";
import { addEmailTemplateValidation } from "./validation";
import { maxFileSizeTextDescription } from "src/constants/sharedComponents";
import { EmailTemplateService } from "src/services/SettingsService/emailTemplate.service";
import { EmailTemplate } from "src/models/meta.model";
import useForm from "src/shared/components/UseForm";

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

  const { getEmailTemplate, emailTemplateOperations } = EmailTemplateService();

  // Fetch the full template data when editing
  const { data: templateDetail } = useQuery(
    getEmailTemplate(selectedTemplate?.id),
  );

  // Extract attachment IDs from the full attachment objects
  const attachmentIds = useMemo(() => {
    if (templateDetail?.attachments) {
      return templateDetail.attachments.map((att) => att.id || "");
    }
    return [];
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

  const { mutateAsync: saveTemplate, isPending } = useMutation(
    emailTemplateOperations(),
  );

  const handleSubmit = async (data: {
    title: string;
    subject: string;
    body: string;
    attachments: string[];
  }) => {
    await saveTemplate({
      type: "emailTemplate",
      id: selectedTemplate?.id,
      data,
    });
    onClose();
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
        <Col span={24}>
          <TextArea
            name={FIELDS.EMAIL_BODY}
            label={LABELS.EMAIL_BODY}
            placeholder={PLACEHOLDERS.EMAIL_BODY}
            required
            className={styles.emailBodyInput}
          />
        </Col>
        <Col span={24}>
          <FileUpload
            name={FIELDS.ATTACHMENTS}
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
