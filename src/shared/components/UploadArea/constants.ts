export const defaultUploadPlaceholder =
  "Drag & drop or browse to upload .doc (or) .pdf file (or) .xls (or) .xlsx file";

export const acceptedDocFormats =
  ".xls,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export const maxText = (size: number) => `Maximum file size ${size} MB`;

export const sizeLimitText = (size: number) =>
  `File size should not exceed ${size} MB`;

export const fileSizeError = (size: number) =>
  `Oops! File size exceeds ${size} MB`;

export const uploadFailed = "Failed to upload file";

export const uploading = "Uploading";

export const reupload = "Re-upload";

export const retry = "Retry";

export const errorText = "Oops! Upload failed, please try again later";

export const uploadFailedError = "Oops! Upload failed, please try again";

export const fileTypeError = "Oops! This file type is not supported";

export const allowedFileExtensions = [".pdf", ".doc", ".docx", ".xls", ".xlsx"];

export const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
