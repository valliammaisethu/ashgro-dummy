import { allowedFileExtensions, allowedMimeTypes } from "./constants";

export const isValidFileType = (file: File): boolean => {
  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.substring(fileName.lastIndexOf("."));
  const hasValidExtension = allowedFileExtensions.includes(fileExtension);
  const hasValidMimeType = allowedMimeTypes.includes(file.type);
  return hasValidExtension || hasValidMimeType;
};
