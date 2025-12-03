import React, { useState } from "react";
import clsx from "clsx";
import { IconArrowRight, IconDownload } from "obra-icons-react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import {
  importDescription,
  inputPlaceholder,
  maxSizeDescription,
  importTitle,
  chatbotKnowlegeBaseTitle,
  chatbotKnowlegeBaseDescription,
  chatbotKnowlegeBaseInput,
} from "./constants";
import ImportFileUpload from "src/shared/components/ImportFileUpload";
import excelIcon from "src/assets/images/excelIcon.webp";
import wordIcon from "src/assets/images/wordIcon.webp";
import pdfIcon from "src/assets/images/pdfIcon.webp";
import ashgroLogo from "src/assets/images/homeLogo.webp";
import { Buttons } from "src/enums/buttons.enum";
import { docsPdfAccept, excelAccept } from "src/constants/sharedComponents";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { ImportModes } from "src/enums/importModes.enum";
import { TemplateEntity } from "src/enums/templateEntity.enum";
import { ImportModalProps } from "src/shared/types/importModes.type";
import { UploadedFileData } from "src/shared/types/sharedComponents.type";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { BulkUploadService } from "src/services/BulkUploadService/bulkUpload.service";
import { TemplateDownloadService } from "src/services/TemplateDownloadService/templateDownload.service";
import { downloadTemplateFile } from "src/services/TemplateDownloadService/utils";
import { ClubService } from "src/services/ClubService/club.service";
import { replaceString } from "src/shared/utils/commonHelpers";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

import styles from "./importModal.module.scss";

const ImportModal = (props: ImportModalProps) => {
  const { importMode, onClose, visible, onImport, clubId: listClubId } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string>("");

  const isKnowledgeBaseImport =
    importMode === ImportModes.CHATBOT_KNOWLEDGE_BASE;

  const { id: adminClubId = "" } = useParams();
  const updatingClubId = adminClubId || listClubId || "";

  const { bulkUpload } = BulkUploadService();
  const { uploadKnowledgeBase } = ClubService();
  const { downloadTemplate } = TemplateDownloadService();

  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const getTemplateEntity = (): TemplateEntity => {
    return importMode === ImportModes.MEMBERS
      ? TemplateEntity.MEMBER
      : TemplateEntity.PROSPECT;
  };

  const { mutate: upload, isPending: isBulkUploading } =
    useMutation(bulkUpload());

  const {
    mutate: uploadChatbotKnowledgeBaseMutate,
    isPending: isUploadingKnowledgeBase,
  } = useMutation(uploadKnowledgeBase());

  const { mutate: downloadTemplateMutate, isPending: isDownloading } =
    useMutation({
      ...downloadTemplate(),
      onSuccess: (data) => {
        downloadTemplateFile(data, getTemplateEntity());
      },
    });

  const handleDownloadTemplate = () =>
    downloadTemplateMutate({ clubId, entity: getTemplateEntity() });

  const handleFileUploaded = (fileData: UploadedFileData) => {
    setUploadedFile(fileData.fileId);
    setIsUploaded(true);
  };

  const handleImport = () => {
    if (isKnowledgeBaseImport) {
      if (!uploadedFile || !updatingClubId) return;
      uploadChatbotKnowledgeBaseMutate(
        {
          attachmentId: uploadedFile,
          clubId: updatingClubId,
        },
        {
          onSuccess: () => {
            onImport?.();
            handleClose();
          },
        },
      );
      return;
    }
    if (!uploadedFile || !clubId) return;
    upload(
      {
        attachmentId: uploadedFile,
        clubId,
        entity: getTemplateEntity(),
      },
      {
        onSuccess: () => {
          onImport?.();
          handleClose();
        },
      },
    );
  };

  const handleClose = () => {
    onClose();
    setIsUploading(false);
    setIsUploaded(false);
    setUploadedFile("");
  };

  const handleChangeFile = () => setIsUploaded(false);

  return (
    <div>
      <Modal
        rootClassName={styles.bulkImportModal}
        title={
          isKnowledgeBaseImport
            ? chatbotKnowlegeBaseTitle
            : replaceString(importTitle, importMode)
        }
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
              <ImportFileUpload
                onFileUploaded={handleFileUploaded}
                onUploadStateChange={setIsUploading}
                onChangeFile={handleChangeFile}
                accept={isKnowledgeBaseImport ? docsPdfAccept : excelAccept}
                inputPlaceholder={
                  isKnowledgeBaseImport
                    ? chatbotKnowlegeBaseInput
                    : inputPlaceholder
                }
                className={styles.footerContent}
                isUploadingClassName={styles.isUploadingContent}
                isUploadedClassName={styles.uploadedFooter}
                uploadingClassName={styles.uploadingContainer}
                uploadedClassName={styles.uploadedFooterContent}
              />
            </div>
            {isUploaded && (
              <Button
                onClick={handleImport}
                disabled={!isUploaded || isBulkUploading}
                loading={isBulkUploading || isUploadingKnowledgeBase}
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
            <ConditionalRenderComponent
              visible={!isKnowledgeBaseImport}
              fallback={
                <div className={styles.chatKnowledgeBaseIcons}>
                  <Button className={styles.iconButton}>
                    <img src={wordIcon} className={styles.excelIcon} />
                  </Button>
                  <Button className={styles.iconButton}>
                    <img src={pdfIcon} className={styles.excelIcon} />
                  </Button>
                </div>
              }
            >
              <Button className={styles.iconButton}>
                <img src={excelIcon} className={styles.excelIcon} />
              </Button>
            </ConditionalRenderComponent>
            <IconArrowRight />
            <Button className={styles.iconButton}>
              <img className={styles.excelIcon} src={ashgroLogo} />
            </Button>
          </div>
          <div className={styles.description}>
            <span className={styles.importDescription}>
              <ConditionalRenderComponent
                fallback={replaceString(importDescription, importMode)}
                visible={isKnowledgeBaseImport}
              >
                {chatbotKnowlegeBaseDescription}
              </ConditionalRenderComponent>
            </span>
            <span className={styles.uploadDescription}>
              {maxSizeDescription}
            </span>
          </div>
          <ConditionalRenderComponent
            visible={!isKnowledgeBaseImport}
            hideFallback
          >
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
          </ConditionalRenderComponent>
        </div>
      </Modal>
    </div>
  );
};

export default ImportModal;
