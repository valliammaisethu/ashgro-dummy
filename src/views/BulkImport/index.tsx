import React, { MouseEvent, useState } from "react";
import clsx from "clsx";
import {
  IconArrowRight,
  IconDocumentUpload,
  IconDownload,
} from "obra-icons-react";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import BulkFileUpload from "src/shared/components/BulkFileUpload";
import {
  importDescription,
  inputPlaceholder,
  maxSizeDescription,
  modalTitles,
} from "./constants";
import excelIcon from "src/assets/images/excelIcon.webp";
import ashgroLogo from "src/assets/images/homeLogo.webp";
import { Buttons } from "src/enums/buttons.enum";
import { Colors } from "src/enums/colors.enum";
import { BulkImportModalProps } from "src/shared/types/bulkImport.type";

import styles from "./bulkImport.module.scss";

const BulkImportModal = (props: BulkImportModalProps) => {
  const { importMode, onClose, visible, onImport } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileUploaded = (_fileId: string, _fileName: string) =>
    setIsUploaded(true);

  const handleClose = () => {
    onClose();
    setIsUploading(false);
    setIsUploaded(false);
  };

  return (
    <div>
      <Modal
        rootClassName={styles.bulkImportModal}
        title={modalTitles.prospects}
        onCancel={handleClose}
        visible={visible}
        width={800}
        footer={[
          <div key={"modal-footer"} className={styles.modalFooter}>
            <div
              className={clsx(styles.innerFooter, {
                [styles.isUploadingFooter]: isUploading,
                [styles.uploadedFooter]: isUploaded && !isUploading,
              })}
            >
              <BulkFileUpload
                onFileUploaded={handleFileUploaded}
                onUploadStateChange={setIsUploading}
                renderUploadArea={({
                  onClick,
                  isUploading,
                  uploadProgress,
                  uploadedFile,
                  currentFileName,
                  onCancelUpload,
                  onChangeFile,
                }) => {
                  const cancelUpload = (e: MouseEvent) => {
                    e.stopPropagation();
                    onCancelUpload();
                  };

                  const handleChange = (e: MouseEvent) => {
                    e.stopPropagation();
                    onChangeFile();
                    setIsUploaded(false);
                  };
                  return (
                    <>
                      <div
                        className={clsx(styles.footerContent, {
                          [styles.isUploadingContent]: isUploading,
                          [styles.uploadedFooter]: uploadedFile,
                        })}
                        onClick={
                          !isUploading && !uploadedFile ? onClick : undefined
                        }
                      >
                        {!isUploading && !uploadedFile && (
                          <>
                            <Button
                              icon={
                                <IconDocumentUpload
                                  color={Colors.MODAL_CLOSE_ICON}
                                  strokeWidth={1.25}
                                  size={20}
                                />
                              }
                              className={styles.iconButton}
                            />
                            <div className={styles.uploadText}>
                              {inputPlaceholder}
                            </div>
                          </>
                        )}
                        {isUploading && currentFileName && (
                          <>
                            <div
                              className={clsx(styles.uploadingContainer, {
                                [styles.isUploadingContainer]: isUploading,
                              })}
                            >
                              <div className={styles.uploadingFileInfo}>
                                <img
                                  className={styles.excelIcon}
                                  src={excelIcon}
                                />
                                <span className={styles.uploadingFileName}>
                                  {currentFileName}
                                </span>
                              </div>
                              <div className={styles.progressBarContainer}>
                                <div
                                  className={styles.progressBar}
                                  style={{ width: `${uploadProgress}%` }}
                                />
                              </div>
                            </div>
                            <div className={styles.cancelButtonContainer}>
                              <Button
                                onClick={cancelUpload}
                                className={styles.cancelButton}
                              >
                                {Buttons.CANCEL_UPLOAD}
                              </Button>
                            </div>
                          </>
                        )}
                        {uploadedFile && !isUploading && (
                          <div
                            className={clsx(styles.uploadedFooterContent, {
                              [styles.uploadedFooterContent]:
                                uploadedFile && !isUploading,
                            })}
                          >
                            <img className={styles.excelIcon} src={excelIcon} />
                            <div className={styles.fileName}>
                              {uploadedFile.name}
                            </div>
                            <Button
                              onClick={handleChange}
                              className={styles.changeButton}
                            >
                              {Buttons.CHANGE}
                            </Button>
                          </div>
                        )}
                      </div>
                    </>
                  );
                }}
              />
            </div>
            {isUploaded && (
              <Button
                onClick={onImport}
                disabled={!isUploaded}
                className={styles.importButton}
              >
                {Buttons.IMPORT}
              </Button>
            )}
          </div>,
        ]}
      >
        <div className={styles.modalBody}>
          <div className={styles.iconsContainer}>
            <Button className={styles.iconButton}>
              <img src={excelIcon} className={styles.excelIcon} />
            </Button>
            <IconArrowRight />
            <Button className={styles.iconButton}>
              <img className={styles.excelIcon} src={ashgroLogo} />
            </Button>
          </div>
          <div className={styles.description}>
            <span className={styles.importDescription}>
              {importDescription(importMode)}
            </span>
            <span className={styles.uploadDescription}>
              {maxSizeDescription}
            </span>
          </div>
          <div className={styles.templateDownload}>
            <IconDownload />
            <span>{Buttons.DOWNLOAD_TEMPLATE}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BulkImportModal;
