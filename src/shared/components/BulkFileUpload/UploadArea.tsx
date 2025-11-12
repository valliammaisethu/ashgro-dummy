import React, { Fragment, MouseEvent } from "react";
import { IconDocumentUpload } from "obra-icons-react";

import Button from "src/shared/components/Button";
import { Buttons } from "src/enums/buttons.enum";
import { Colors } from "src/enums/colors.enum";
import excelIcon from "src/assets/images/excelIcon.webp";

import styles from "./bulkFileUpload.module.scss";

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
      {!isUploading && !uploadedFile && (
        <Fragment>
          <Button
            className={styles.documentUploadBtn}
            icon={
              <IconDocumentUpload
                color={Colors.MODAL_CLOSE_ICON}
                strokeWidth={1.5}
                size={20}
              />
            }
          />
          <div>{inputPlaceholder}</div>
        </Fragment>
      )}

      {isUploading && currentFileName && (
        <Fragment>
          <div className={uploadingClassName}>
            <div>
              <img src={excelIcon} alt="Excel" />
              <span>{currentFileName}</span>
            </div>
            <div>
              <div style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
          <div>
            <Button onClick={handleCancelUpload}>
              {Buttons.CANCEL_UPLOAD}
            </Button>
          </div>
        </Fragment>
      )}

      {uploadedFile && !isUploading && (
        <div className={uploadedClassName}>
          <img src={excelIcon} alt="Excel" />
          <div>{uploadedFile.name}</div>
          <Button onClick={handleChangeFile}>{Buttons.CHANGE}</Button>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
