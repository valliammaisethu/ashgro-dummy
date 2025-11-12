import React, { useEffect, useRef, useState } from "react";
import { RcFile } from "antd/es/upload";

import { AttachmentService } from "src/services/AttachmentService/attachment.service";
import { AttachmentPayload } from "src/models/attachment.model";
import { AttachmentTypes } from "src/enums/attachmentTypes.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import { renderNotification } from "src/shared/utils/renderNotification";

import styles from "./bulkFileUpload.module.scss";
import { excelAccept, fiveMb } from "src/constants/sharedComponents";
import { uploadMessages } from "src/constants/notificationMessages";
import { INPUT_TYPE } from "src/enums/inputType";
import UploadArea, { UploadAreaProps } from "./UploadArea";

export { UploadArea };
export type { UploadAreaProps };

interface BulkFileUploadProps {
  onFileUploaded?: (fileId: string, fileName: string) => void;
  onUploadStateChange?: (isUploading: boolean) => void;
  maxFileSize?: number;
  accept?: string;
  validTypes?: string[];
  attachmentType?: AttachmentTypes;
  renderUploadArea: (
    props: Omit<
      UploadAreaProps,
      | "className"
      | "uploadingClassName"
      | "uploadedClassName"
      | "inputPlaceholder"
    >,
  ) => React.ReactNode;
}

const BulkFileUpload = ({
  onFileUploaded,
  onUploadStateChange,
  maxFileSize = fiveMb,
  accept = excelAccept,
  attachmentType = AttachmentTypes.EMAIL_ATTACHMENT,
  renderUploadArea,
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
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
        onFileUploaded?.(result.id, file.name);
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

  return (
    <div className={styles.bulkFileUpload}>
      {renderUploadArea({
        onClick: handleClick,
        isUploading,
        uploadProgress,
        uploadedFile,
        currentFileName,
        onCancelUpload: handleCancelUpload,
        onChangeFile: handleChangeFile,
      })}
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
