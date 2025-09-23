import React, { ReactNode } from "react";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import styles from "./FileUpload.module.scss";
import { UploadFile } from "antd/lib/upload/interface";
import { FILE_STATUS } from "../../../enums/fileStatus.enum";
import {
  getFileErrorMessage,
  getFileSuccessMessage,
  SharedComponentsConstants
} from "../../../constants/sharedComponents";

interface FileUploadProps {
  children?: React.ReactNode;
  dragdrop?: boolean;
  uploadIcon?: ReactNode;
  uploadText?: ReactNode;
  uploadHint?: ReactNode;
  fileTypes?: string;
  actionURL?: string;
  multiple?: boolean;
  maxCount?: number;
  handleChange: (file: FileList | UploadFile<any>) => void;
}

// Props for generic upload with a button: child component
// Props for DragnDrop:dragdrop, uploadIcon, uploadText, uploadHint, fileTypes
const FileUpload = ({
  children,
  actionURL,
  dragdrop,
  uploadIcon,
  uploadText,
  uploadHint,
  fileTypes,
  multiple,
  maxCount,
  handleChange
}: FileUploadProps) => {
  const { Dragger } = Upload;
  const propsDragDrop: UploadProps = {
    name: SharedComponentsConstants.FILE_UPLOAD.name,
    multiple: multiple ? true : false,
    action: actionURL
      ? actionURL
      : SharedComponentsConstants.FILE_UPLOAD.mockUrl, //uploading URL
    headers: {
      authorization: SharedComponentsConstants.FILE_UPLOAD.authorization
    },
    accept: fileTypes,
    onChange(info) {
      if (info.file.status !== FILE_STATUS.UPLOADING) {
        handleChange(info.file);
      }
      if (info.file.status === FILE_STATUS.DONE) {
        message.success(getFileSuccessMessage(info.file.name));
      } else if (info.file.status === FILE_STATUS.ERROR) {
        message.error(getFileErrorMessage(info.file.name));
      }
    },
    onDrop(e) {
      handleChange(e.dataTransfer.files);
    }
  };
  const propsGeneric: UploadProps = {
    name: SharedComponentsConstants.FILE_UPLOAD.name,
    multiple: multiple ? true : false,
    action: actionURL
      ? actionURL
      : SharedComponentsConstants.FILE_UPLOAD.mockUrl, //uploading URL
    headers: {
      authorization: SharedComponentsConstants.FILE_UPLOAD.authorization
    },
    maxCount: maxCount,
    onChange(info) {
      if (info.file.status !== FILE_STATUS.UPLOADING) {
        handleChange(info.file);
      }
      if (info.file.status === FILE_STATUS.DONE) {
        message.success(getFileSuccessMessage(info.file.name));
      } else if (info.file.status === FILE_STATUS.ERROR) {
        message.error(getFileErrorMessage(info.file.name));
      }
    }
  };
  return (
    <div className={styles["file-upload-container"]}>
      {dragdrop ? (
        <Dragger {...propsDragDrop}>
          <p className={styles["ant-upload-drag-icon"]}>{uploadIcon}</p>
          <p className={styles["ant-upload-text"]}>{uploadText}</p>
          <p className={styles["ant-upload-hint"]}>{uploadHint}</p>
        </Dragger>
      ) : (
        <Upload {...propsGeneric} className={styles["file-upload"]}>
          {children}
        </Upload>
      )}
    </div>
  );
};

export default FileUpload;
