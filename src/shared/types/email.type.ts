import { SelectedEmailModel } from "src/models/email.model";
import { EmailModalEnum } from "src/views/Email/TemplateModal/constants";

export interface EmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggleEmailModal: (type: EmailModalEnum) => void;
}

export interface SelectedEmail {
  id: string;
  email: string;
  name: string;
}

export interface NewEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  isTemplate?: boolean;
  selectedEmails?: SelectedEmailModel[];
}
