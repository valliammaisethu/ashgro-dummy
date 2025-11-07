import React from "react";
import Modal from "src/shared/components/Modal";
import { EmailTemplateFormModalProps } from "src/shared/types/settings.type";
import EmailTemplateForm from "../Form";
import { EMAIL_TEMPLATE_CONSTANTS } from "../../constants";

const EmailTemplateModal = (props: EmailTemplateFormModalProps) => {
  const { ADD_TITLE, EDIT_TITLE } = EMAIL_TEMPLATE_CONSTANTS;
  const { open, onClose, selectedTemplate } = props;
  const isEditMode = !!selectedTemplate;

  return (
    <Modal
      footer={[]}
      title={isEditMode ? EDIT_TITLE : ADD_TITLE}
      visible={open}
      closeModal={onClose}
    >
      <EmailTemplateForm
        onClose={onClose}
        selectedTemplate={selectedTemplate}
      />
    </Modal>
  );
};

export default EmailTemplateModal;
