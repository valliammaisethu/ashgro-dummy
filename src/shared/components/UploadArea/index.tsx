import React, { useRef, useState } from "react";
import {
  IconCircleExclamationFill,
  IconDelete,
  IconDocumentAltFill,
} from "obra-icons-react";
import clsx from "clsx";
import { RcFile } from "antd/es/upload";

import {
  defaultUploadPlaceholder,
  fileSizeError,
  fileTypeError,
  maxText,
  retry,
  reupload,
  uploading,
  uploadFailedError,
} from "./constants";
import { isValidFileType } from "./utils";
import { imageAlts } from "src/constants/imageAlts";
import { INPUT_TYPE } from "src/enums/inputType";
import { Colors } from "src/enums/colors.enum";
import { AttachmentTypes } from "src/enums/attachmentTypes.enum";
import {
  UploadAreaProps,
  UploadAreaState,
} from "src/shared/types/sharedComponents.type";
import { stopEventPropagation } from "src/shared/utils/eventUtils";
import { AttachmentService } from "src/services/AttachmentService/attachment.service";
import { AttachmentPayload } from "src/models/attachment.model";
import renewIcon from "src/assets/images/autorenew_20dp_5F6368_FILL1_wght300_GRAD0_opsz20 1.webp";
import loaderIcon from "src/assets/images/loader.webp";

import styles from "./uploadArea.module.scss";

const UploadArea: React.FC<UploadAreaProps> = ({
  onFileUploaded,
  attachmentType = AttachmentTypes.EMAIL_ATTACHMENT,
  maxSizeMB = 5,
  mainText = defaultUploadPlaceholder,
  subText,
  existingFileS3Key,
  existingFileName,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileState, setFileState] = useState<UploadAreaState>({
    isUploading: false,
    uploadingFileName: existingFileName || "",
    isUploaded: !!existingFileS3Key,
    isError: false,
    fileId: existingFileS3Key || "",
  });

  const { uploadFile, deleteFile } = AttachmentService();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) handleFile(files[0]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const setErrorState = (errorText: string) => {
    setFileState({
      isUploading: false,
      isUploaded: false,
      uploadingFileName: "",
      isError: true,
      errorText,
      fileId: "",
    });
  };

  const resetFileState = async () => {
    setFileState((prev) => ({
      ...prev,
      isUploading: false,
      isUploaded: false,
      isError: false,
      uploadingFileName: "",
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFile = async (file: File) => {
    if (!isValidFileType(file)) {
      setErrorState(fileTypeError);
      return;
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setErrorState(fileSizeError(maxSizeMB));
      return;
    }

    setFileState((prev) => ({
      ...prev,
      isUploading: true,
      isUploaded: false,
      isError: false,
      uploadingFileName: file.name,
    }));

    try {
      const attachmentPayload: AttachmentPayload = {
        file: file as RcFile,
        attachmentType: attachmentType as AttachmentTypes,
      };

      const result = await uploadFile.mutateAsync(attachmentPayload);

      if (result?.id) {
        setFileState((prev) => ({
          ...prev,
          isUploading: false,
          isUploaded: true,
          fileId: result.id,
        }));
        onFileUploaded?.(result.id, file.name);
      }
    } catch {
      setErrorState(uploadFailedError);
    }
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleFileDelete = async (e: React.MouseEvent) => {
    stopEventPropagation(e);
    resetFileState();
    await deleteFile.mutateAsync(fileState.fileId);
  };

  const handleFileReupload = (e: React.MouseEvent) => {
    stopEventPropagation(e);
    resetFileState();
    fileInputRef.current?.click();
  };

  const handleFileRetry = (e: React.MouseEvent) => {
    stopEventPropagation(e);
    resetFileState();
    fileInputRef.current?.click();
  };

  return (
    <div
      className={clsx(styles.uploadArea, {
        [styles.uploadingArea]:
          fileState.isUploading || fileState.isUploaded || fileState.isError,
      })}
      onDragOver={stopEventPropagation}
      onDrop={handleDrop}
      onClick={!fileState.isUploading ? handleClick : undefined}
    >
      {fileState.isUploading && fileState.uploadingFileName ? (
        <div className={styles.uploadingContent}>
          <IconDocumentAltFill color={Colors.MODAL_CLOSE_ICON} size={24} />
          <p className={styles.fileName}>{fileState.uploadingFileName}</p>
          <div className={styles.uploadingText}>
            <img
              alt={imageAlts.renewIcon}
              src={renewIcon}
              className={styles.renewIcon}
            />
            <span>{uploading}</span>
          </div>
        </div>
      ) : fileState.isUploaded ? (
        <div className={styles.uploadedContent}>
          <IconDocumentAltFill color={Colors.ASHGRO_NAVY} size={24} />
          <div className={styles.uploadedText}>
            <p className={styles.fileName}>{fileState.uploadingFileName}</p>
            <IconDelete
              onClick={handleFileDelete}
              size={20}
              color={Colors.MODAL_CLOSE_ICON}
            />
          </div>
          <div onClick={handleFileReupload} className={styles.loaderDiv}>
            <img
              alt={imageAlts.loaderIcon}
              className={styles.loader}
              src={loaderIcon}
            />
            <span className={styles.reupload}>{reupload}</span>
          </div>
        </div>
      ) : fileState.isError ? (
        <div className={styles.errorContainer}>
          <IconCircleExclamationFill
            color={Colors.ERROR_NOTIFICATION}
            size={20}
          />
          <div className={styles.errorText}>{fileState.errorText}</div>
          <div
            onClick={handleFileRetry}
            className={clsx(styles.loaderDiv, styles.retryDiv)}
          >
            <img
              alt={imageAlts.loaderIcon}
              className={styles.loader}
              src={loaderIcon}
            />
            <span className={styles.reupload}>{retry}</span>
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <p className={styles.mainText}>{mainText}</p>
          <p className={styles.subText}>{subText || maxText(maxSizeMB)}</p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type={INPUT_TYPE.FILE}
        onChange={handleFileInput}
        className={styles.hiddenInput}
      />
    </div>
  );
};

export default UploadArea;
