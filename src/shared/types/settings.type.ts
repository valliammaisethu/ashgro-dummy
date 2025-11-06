import { EmailTemplate } from "src/models/meta.model";

export interface EmailTemplateFormModalProps {
  open: boolean;
  onClose: () => void;
  selectedTemplate?: EmailTemplate;
}
