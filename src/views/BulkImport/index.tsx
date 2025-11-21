import React, { useState } from "react";
import clsx from "clsx";
import { IconArrowRight, IconDownload } from "obra-icons-react";

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
import { BulkImportModalProps } from "src/shared/types/bulkImport.type";

import styles from "./bulkImport.module.scss";

const BulkImportModal = (props: BulkImportModalProps) => {
  const { importMode, onClose, visible, onImport } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileUploaded = () => setIsUploaded(true);

  const handleClose = () => {
    onClose();
    setIsUploading(false);
    setIsUploaded(false);
  };

  const handleChangeFile = () => {
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
                onChangeFile={handleChangeFile}
                inputPlaceholder={inputPlaceholder}
                className={styles.footerContent}
                isUploadingClassName={styles.isUploadingContent}
                isUploadedClassName={styles.uploadedFooter}
                uploadingClassName={styles.uploadingContainer}
                uploadedClassName={styles.uploadedFooterContent}
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
