import { EmailModalEnum } from "src/views/Email/TemplateModal/constants";

export interface EmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggleEmailModal: (type: EmailModalEnum) => void;
}

export interface NewEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  isTemplate?: boolean;
}
