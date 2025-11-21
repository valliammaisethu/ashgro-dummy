import React from "react";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import { BulkInProgressModalProps } from "src/shared/types/bulkImport.type";
import excelIcon from "src/assets/images/excelIcon.webp";
import ashgroLogo from "src/assets/images/homeLogo.webp";
import uploadingArrow from "src/assets/images/gradientArrow.webp";
import { inProgress, inProgressDescription } from "../constants";
import { imageAlts } from "src/constants/imageAlts";

import styles from "./InProgressModal.module.scss";

const BulkInProgressModal = (props: BulkInProgressModalProps) => {
  const { visible } = props;
  return (
    <Modal
      rootClassName={styles.inProgressModal}
      closable={false}
      renderHeader={false}
      visible={visible}
      footer={[]}
    >
      <div className={styles.body}>
        <div className={styles.iconsContainer}>
          <Button className={styles.iconButton}>
            <img
              alt={imageAlts.excelIcon}
              src={excelIcon}
              className={styles.excelIcon}
            />
          </Button>
          <img
            alt={imageAlts.uploadArrow}
            className={styles.uploadingArrow}
            src={uploadingArrow}
          />
          <Button className={styles.iconButton}>
            <img
              alt={imageAlts.ashgroLogo}
              className={styles.excelIcon}
              src={ashgroLogo}
            />
          </Button>
        </div>
        <div className={styles.inProgressText}>
          {inProgress}
          <span className={styles.dot1}>.</span>
          <span className={styles.dot2}>.</span>
          <span className={styles.dot3}>.</span>
        </div>
        <div className={styles.description}>{inProgressDescription}</div>
      </div>
    </Modal>
  );
};

export default BulkInProgressModal;
