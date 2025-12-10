import React from "react";
import Modal from "src/shared/components/Modal";
import { warningModalConstants } from "./constants";
import { WarningModalProps } from "src/shared/types/clubs.type";
import styles from "../../individualClub.module.scss";
import { Divider } from "antd";
import { Buttons } from "src/enums/buttons.enum";
import { ClubSettingsTypes } from "src/enums/clubSettingsTypes.enum";

const WarningModal = (props: WarningModalProps) => {
  const {
    open,
    onClose,
    onSave,
    isLoading,
    type = ClubSettingsTypes.TEMPLATES,
  } = props;
  return (
    <Modal
      visible={open}
      closeModal={onClose}
      renderHeader={false}
      title={warningModalConstants.title}
      handleOk={onSave}
      rootClassName={styles.warningModal}
      okText={Buttons.YES_PROCEED}
      okButtonProps={{
        loading: isLoading,
      }}
      cancelButtonProps={{
        className: "d-none",
      }}
    >
      <div className={styles.warningModalTitle}>
        {warningModalConstants.title}
      </div>
      <div className={styles.warningModalDescription}>
        {warningModalConstants.getDescription(type)}
      </div>
      <Divider className={styles.divider} />
    </Modal>
  );
};

export default WarningModal;
