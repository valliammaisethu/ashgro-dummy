import { BulkModes } from "src/enums/bulkModes";

export interface BulkImportModalProps {
  visible: boolean;
  onClose: () => void;
  importMode: BulkModes;
  onImport: () => void;
}

export interface BulkInProgressModalProps {
  visible: boolean;
}
