import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { RcFile } from "antd/es/upload";
import clsx from "clsx";

import { AttachmentService } from "src/services/AttachmentService/attachment.service";
import { AttachmentPayload } from "src/models/attachment.model";
import { AttachmentTypes } from "src/enums/attachmentTypes.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import { INPUT_TYPE } from "src/enums/inputType";
import { renderNotification } from "src/shared/utils/renderNotification";
import { excelAccept, fiveMb } from "src/constants/sharedComponents";
import { uploadMessages } from "src/constants/notificationMessages";
import UploadArea from "./UploadArea";

import styles from "./bulkFileUpload.module.scss";

interface BulkFileUploadProps {
  onFileUploaded?: (fileId: string, fileName: string, s3Key?: string) => void;
  onUploadStateChange?: (isUploading: boolean) => void;
  onChangeFile?: () => void;
  maxFileSize?: number;
  accept?: string;
  validTypes?: string[];
  attachmentType?: AttachmentTypes;
  inputPlaceholder?: string;
  className?: string;
  isUploadingClassName?: string;
  isUploadedClassName?: string;
  uploadingClassName?: string;
  uploadedClassName?: string;
}

const BulkFileUpload = ({
  onFileUploaded,
  onUploadStateChange,
  onChangeFile: onChangeFileProp,
  maxFileSize = fiveMb,
  accept = excelAccept,
  attachmentType = AttachmentTypes.BULK_IMPORT,
  inputPlaceholder,
  className,
  isUploadingClassName,
  isUploadedClassName,
  uploadingClassName,
  uploadedClassName,
}: BulkFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [currentFileName, setCurrentFileName] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { uploadFile } = AttachmentService();

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleCancelUpload = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setIsUploading(false);
    setUploadProgress(0);
    setCurrentFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleChangeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setCurrentFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChangeFileProp?.();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxFileSize) {
      renderNotification(
        `File size exceeds ${maxFileSize / (1024 * 1024)}MB`,
        "",
        NotificationTypes.ERROR,
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setCurrentFileName(file.name);

    try {
      progressIntervalRef.current = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
            }
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const attachmentPayload: AttachmentPayload = {
        file: file as RcFile,
        attachmentType,
      };

      const result = await uploadFile.mutateAsync(attachmentPayload);

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setUploadProgress(100);

      if (result?.id) {
        setUploadedFile({ id: result.id, name: file.name });
        onFileUploaded?.(result.id, file.name, result.s3Key);
      }
    } catch {
      renderNotification(
        uploadMessages.failedTitle,
        "",
        NotificationTypes.ERROR,
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    onUploadStateChange?.(isUploading);
  }, [isUploading, onUploadStateChange]);

  const computedClassName = clsx(className, {
    [isUploadingClassName || ""]: isUploading,
    [isUploadedClassName || ""]: uploadedFile !== null,
  });

  return (
    <div className={styles.bulkFileUpload}>
      <UploadArea
        onClick={handleClick}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        uploadedFile={uploadedFile}
        currentFileName={currentFileName}
        onCancelUpload={handleCancelUpload}
        onChangeFile={handleChangeFile}
        inputPlaceholder={inputPlaceholder}
        className={computedClassName}
        uploadingClassName={uploadingClassName}
        uploadedClassName={uploadedClassName}
      />
      <input
        ref={fileInputRef}
        type={INPUT_TYPE.FILE}
        accept={accept}
        onChange={handleFileChange}
        className="d-none"
      />
    </div>
  );
};

export default BulkFileUpload;
