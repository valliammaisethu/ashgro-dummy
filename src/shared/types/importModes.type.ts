import { ImportModes } from "src/enums/importModes.enum";

export interface FileData {
  id: string;
  name: string;
}

export interface ImportModalProps {
  visible: boolean;
  onClose: () => void;
  importMode: ImportModes;
  onImport?: () => void;
  clubId?: string;
  file?: FileData;
}

export interface BulkInProgressModalProps {
  visible: boolean;
}
