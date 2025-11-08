import React, { useRef, useState } from "react";
import { RcFile } from "antd/es/upload";
import { useController, useFormContext } from "react-hook-form";
import { IconAttachment, IconCircleClose } from "obra-icons-react";

import Button from "src/shared/components/Button";
import { AttachmentService } from "src/services/AttachmentService/attachment.service";
import { AttachmentPayload } from "src/models/attachment.model";
import { AttachmentTypes } from "src/enums/attachmentTypes.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import { INPUT_TYPE } from "src/enums/inputType";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";
import { Colors } from "src/enums/colors.enum";
import { renderNotification } from "src/shared/utils/renderNotification";
import {
  DEFAULT_MAX_FILE_SIZE,
  DEFAULT_MAX_FILE_SIZE_PLACEHOLDER,
  fileDeletionError,
  getFileErrorMessage,
  maxFileSizeTextDescription,
} from "src/constants/sharedComponents";
import {
  FileUploadProps,
  UploadedFile,
} from "src/shared/types/sharedComponents.type";

import styles from "./fileUpload.module.scss";

const FileUpload = ({
  name,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  maxTotalSize = DEFAULT_MAX_FILE_SIZE,
  maxFileSizeText = maxFileSizeTextDescription,
  buttonText = Buttons.UPLOAD_FILES,
  attachmentType = AttachmentTypes.EMAIL_ATTACHMENT,
  accept,
  buttonClassName,
  containerClassName,
  maxFileSizeClassName,
  attachmentClassName,
  initialFiles = [],
}: FileUploadProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFiles, setUploadedFiles] =
    useState<UploadedFile[]>(initialFiles);
  const [isUploading, setIsUploading] = useState(false);

  const { uploadFile, deleteFile } = AttachmentService();

  const handleUploadClick = () => fileInputRef.current?.click();

  const getTotalSize = () =>
    uploadedFiles.reduce((total, file) => total + file.size, 0);

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

    const currentTotalSize = getTotalSize();
    const newTotalSize = currentTotalSize + file.size;

    if (newTotalSize > maxTotalSize) {
      renderNotification(
        DEFAULT_MAX_FILE_SIZE_PLACEHOLDER,
        "",
        NotificationTypes.ERROR,
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);

    try {
      const attachmentPayload: AttachmentPayload = {
        file: file as RcFile,
        attachmentType,
      };

      const result = await uploadFile.mutateAsync(attachmentPayload);

      if (result?.id) {
        const newFiles = [
          ...uploadedFiles,
          { id: result.id, name: file.name, size: file.size },
        ];
        setUploadedFiles(newFiles);
        field.onChange(newFiles.map((f) => f.id));
      }
    } catch {
      renderNotification(
        getFileErrorMessage(file.name),
        "",
        NotificationTypes.ERROR,
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      await deleteFile.mutateAsync(fileId);
      const newFiles = uploadedFiles.filter((file) => file.id !== fileId);
      setUploadedFiles(newFiles);
      field.onChange(newFiles.map((f) => f.id));
    } catch {
      renderNotification(fileDeletionError, "", NotificationTypes.ERROR);
    }
  };

  return (
    <>
      <div className={containerClassName || styles.uploadFileContainer}>
        <Button
          className={buttonClassName || styles.uploadFilesButton}
          onClick={handleUploadClick}
          loading={isUploading}
          type={ButtonTypes.DEFAULT}
        >
          {buttonText}
        </Button>
        <input
          ref={fileInputRef}
          type={INPUT_TYPE.FILE}
          onChange={handleFileChange}
          className="d-none"
          disabled={isUploading}
          accept={accept}
        />
        <div className={maxFileSizeClassName || styles.maxFileSize}>
          {maxFileSizeText}
        </div>
      </div>
      <div className={styles.uploadedFiles}>
        {uploadedFiles.map((file) => (
          <div
            key={file.id}
            className={attachmentClassName || styles.attachment}
          >
            <span className={styles.attachmentIcon}>
              <IconAttachment
                color={Colors.ASHGRO_GOLD}
                size={18}
                strokeWidth={1.25}
              />
            </span>
            <span className={styles.fileName}>{file.name}</span>
            <span
              className={styles.closeIcon}
              onClick={() => handleDeleteFile(file.id)}
            >
              <IconCircleClose
                strokeWidth={1.25}
                color={Colors.MODAL_CLOSE_ICON}
              />
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default FileUpload;
