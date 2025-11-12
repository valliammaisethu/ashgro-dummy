import { BulkModes } from "src/enums/bulkModes";

export const modalTitles = {
  prospects: "Import Prospects",
};

export const importDescription = (type: BulkModes) =>
  `Import ${type} from XLS file`;

export const maxSizeDescription = "Upload a file with maximum size of 5MB";

export const inputPlaceholder = "Click to upload a XLS file";

export const inProgress = "Import In Progress";

export const inProgressDescription =
  " This should only take a few minutes, and we’ll notify you once it’s done.";
