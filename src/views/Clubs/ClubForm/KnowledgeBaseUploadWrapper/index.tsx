import React, { Fragment } from "react";
import clsx from "clsx";
import { IconArrowRight } from "obra-icons-react";

import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import ImportFileUpload from "src/shared/components/ImportFileUpload";
import { ClubData } from "src/models/club.model";
import { UploadedFileData } from "src/shared/types/sharedComponents.type";

import pdfIcon from "src/assets/images/pdfIcon.webp";
import wordIcon from "src/assets/images/wordIcon.webp";
import ashgroLogo from "src/assets/images/homeLogo.webp";

import styles from "./knowledgeBaseUploadWrapper.module.scss";

interface ChatbotFileUploadWrapperProps {
  chatbotEnabled: boolean;
  clubData?: ClubData | null;
  onFileUploaded: (data: UploadedFileData) => void;
  docsPdfAccept: string;
  inputPlaceholder: string;
  importStyles: Record<string, string>;
  description: string;
  sizeDescription: string;
  showError: boolean;
}

const ChatbotFileUploadWrapper = ({
  clubData,
  onFileUploaded,
  docsPdfAccept,
  inputPlaceholder,
  importStyles,
  description,
  sizeDescription,
  showError,
}: ChatbotFileUploadWrapperProps) => {
  const uploadedFileProp = clubData?.club?.id
    ? {
        uplodedFile: {
          id: clubData.club.knowledgeBaseId ?? "",
          name: clubData.club.knowledgeBaseName ?? "",
        },
      }
    : {};

  return (
    <Fragment>
      <div
        className={clsx(
          styles.chatbotUploadContainer,
          showError && styles.chatbotUploadError,
        )}
      >
        <div className={styles.iconsContainer}>
          <button className={styles.iconButton}>
            <img src={wordIcon} className={styles.excelIcon} />
          </button>
          <button className={styles.iconButton}>
            <img src={pdfIcon} className={styles.excelIcon} />
          </button>

          <IconArrowRight />

          <button className={styles.iconButton}>
            <img className={styles.excelIcon} src={ashgroLogo} />
          </button>
        </div>
        <ConditionalRenderComponent hideFallback visible={showError}>
          <div className={styles.description}>
            <span className={styles.importDescription}>{description}</span>
            <span className={styles.uploadDescription}>{sizeDescription}</span>
          </div>
        </ConditionalRenderComponent>

        <ImportFileUpload
          accept={docsPdfAccept}
          onFileUploaded={onFileUploaded}
          inputPlaceholder={inputPlaceholder}
          className={importStyles.footerContent}
          isUploadingClassName={importStyles.isUploadingContent}
          isUploadedClassName={importStyles.uploadedFooter}
          uploadingClassName={importStyles.uploadingContainer}
          uploadedClassName={importStyles.uploadedFooterContent}
          customCancelClassName={styles.customCancelButton}
          {...uploadedFileProp}
        />
      </div>
    </Fragment>
  );
};

export default ChatbotFileUploadWrapper;
