import React, { MouseEvent } from "react";
import { IconDocumentUpload } from "obra-icons-react";

import Button from "src/shared/components/Button";
import { Buttons } from "src/enums/buttons.enum";
import { Colors } from "src/enums/colors.enum";
import excelIcon from "src/assets/images/excelIcon.webp";

import styles from "../../../views/BulkImport/bulkImport.module.scss";
import ConditionalRenderComponent from "../ConditionalRenderComponent";
import { imageAlts } from "src/constants/imageAlts";

export interface UploadAreaProps {
  onClick: () => void;
  isUploading: boolean;
  uploadProgress: number;
  uploadedFile: { id: string; name: string } | null;
  currentFileName: string | null;
  onCancelUpload: () => void;
  onChangeFile: () => void;
  inputPlaceholder?: string;
  className?: string;
  uploadingClassName?: string;
  uploadedClassName?: string;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  onClick,
  isUploading,
  uploadProgress,
  uploadedFile,
  currentFileName,
  onCancelUpload,
  onChangeFile,
  inputPlaceholder = "Upload file",
  className,
  uploadingClassName,
  uploadedClassName,
}) => {
  const handleCancelUpload = (e: MouseEvent) => {
    e.stopPropagation();
    onCancelUpload();
  };

  const handleChangeFile = (e: MouseEvent) => {
    e.stopPropagation();
    onChangeFile();
  };

  return (
    <div
      className={className}
      onClick={!isUploading && !uploadedFile ? onClick : undefined}
    >
      <ConditionalRenderComponent
        visible={!isUploading && !uploadedFile}
        hideFallback
      >
        <Button
          className={styles.iconButton}
          icon={
            <IconDocumentUpload
              color={Colors.MODAL_CLOSE_ICON}
              strokeWidth={1.5}
              size={20}
            />
          }
        />
        <div className={styles.uploadText}>{inputPlaceholder}</div>
      </ConditionalRenderComponent>

      <ConditionalRenderComponent
        visible={isUploading && !!currentFileName}
        hideFallback
      >
        <div className={uploadingClassName}>
          <div className={styles.uploadingFileInfo}>
            <img
              src={excelIcon}
              alt={imageAlts.excelIcon}
              className={styles.uploadingFileIcon}
            />
            <span className={styles.uploadingFileName}>{currentFileName}</span>
          </div>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
        <div className={styles.cancelButtonContainer}>
          <Button className={styles.cancelButton} onClick={handleCancelUpload}>
            {Buttons.CANCEL_UPLOAD}
          </Button>
        </div>
      </ConditionalRenderComponent>

      <ConditionalRenderComponent
        visible={Boolean(uploadedFile) && !isUploading}
        hideFallback
      >
        <div className={uploadedClassName}>
          <img
            className={styles.uploadingFileIcon}
            src={excelIcon}
            alt={imageAlts.excelIcon}
          />
          <div className={styles.fileName}>{uploadedFile?.name}</div>
          <Button className={styles.changeButton} onClick={handleChangeFile}>
            {Buttons.CHANGE}
          </Button>
        </div>
      </ConditionalRenderComponent>
    </div>
  );
};

export default UploadArea;
