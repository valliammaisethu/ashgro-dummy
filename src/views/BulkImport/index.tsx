import React, { MouseEvent, useState } from "react";
import clsx from "clsx";
import {
  IconArrowRight,
  IconDocumentUpload,
  IconDownload,
} from "obra-icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import BulkFileUpload from "src/shared/components/BulkFileUpload";
import {
  importDescription,
  inputPlaceholder,
  maxSizeDescription,
  importTitle,
} from "./constants";
import excelIcon from "src/assets/images/excelIcon.webp";
import ashgroLogo from "src/assets/images/homeLogo.webp";
import { Buttons } from "src/enums/buttons.enum";
import { Colors } from "src/enums/colors.enum";
import { BulkModes } from "src/enums/bulkModes";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { TemplateEntity } from "src/enums/templateEntity.enum";
import { BulkImportModalProps } from "src/shared/types/bulkImport.type";
import { BulkUploadService } from "src/services/BulkUploadService/bulkUpload.service";
import { TemplateDownloadService } from "src/services/TemplateDownloadService/templateDownload.service";
import { downloadTemplateFile } from "src/services/TemplateDownloadService/utils";
import { BulkUploadParams } from "src/models/bulkUpload.model";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";

import styles from "./bulkImport.module.scss";

const BulkImportModal = (props: BulkImportModalProps) => {
  const { importMode, onClose, visible, onImport } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedS3Key, setUploadedS3Key] = useState<string>("");

  const { bulkUploadMembers, bulkUploadProspects } = BulkUploadService();
  const { downloadTemplate } = TemplateDownloadService();

  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const getTemplateEntity = (): TemplateEntity => {
    return importMode === BulkModes.MEMBERS
      ? TemplateEntity.MEMBER
      : TemplateEntity.PROSPECT;
  };

  const { mutate: uploadMembers, isPending: isMembersUploading } =
    useMutation(bulkUploadMembers());
  const { mutate: uploadProspects, isPending: isProspectsUploading } =
    useMutation(bulkUploadProspects());
  const { refetch: refetchTemplate, isFetching: isDownloading } = useQuery(
    downloadTemplate(clubId, getTemplateEntity()),
  );

  const handleDownloadTemplate = async () => {
    const { data } = await refetchTemplate();
    if (data) downloadTemplateFile(data, getTemplateEntity());
  };

  const handleFileUploaded = (s3Key: string) => {
    setUploadedS3Key(s3Key);
    setIsUploaded(true);
  };

  const handleImport = () => {
    if (!uploadedS3Key || !clubId) return;

    const params: BulkUploadParams = {
      s3Key: uploadedS3Key,
      clubId: clubId,
    };

    if (importMode === BulkModes.MEMBERS) {
      uploadMembers(params, {
        onSuccess: () => {
          onImport?.();
          handleClose();
        },
      });
    } else if (importMode === BulkModes.PROSPECTS) {
      uploadProspects(params, {
        onSuccess: () => {
          onImport?.();
          handleClose();
        },
      });
    }
  };

  const handleClose = () => {
    onClose();
    setIsUploading(false);
    setIsUploaded(false);
    setUploadedS3Key("");
  };

  return (
    <div>
      <Modal
        rootClassName={styles.bulkImportModal}
        title={importTitle(importMode)}
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
                onClick={handleImport}
                disabled={
                  !isUploaded || isMembersUploading || isProspectsUploading
                }
                loading={isMembersUploading || isProspectsUploading}
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
          <div
            className={styles.templateDownload}
            onClick={handleDownloadTemplate}
            style={{ cursor: isDownloading ? "not-allowed" : "pointer" }}
          >
            <IconDownload />
            <span>
              {isDownloading ? "Downloading..." : Buttons.DOWNLOAD_TEMPLATE}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BulkImportModal;
