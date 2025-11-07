import { SelectedEmailModel } from "src/models/email.model";
import { EmailModalEnum } from "src/views/Email/TemplateModal/constants";
import { EmailTemplate } from "src/models/meta.model";

export interface EmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggleEmailModal: (type: EmailModalEnum, template?: EmailTemplate) => void;
}

export interface SelectedEmail {
  id: string;
  email: string;
  name: string;
}

export interface NewEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEmails?: SelectedEmailModel[];
  selectedTemplate?: EmailTemplate;
}
