import { ImportModes } from "src/enums/importModes.enum";

export interface ImportModalProps {
  visible: boolean;
  onClose: () => void;
  importMode: ImportModes;
  onImport?: () => void;
  clubId?: string;
}

export interface BulkInProgressModalProps {
  visible: boolean;
}
