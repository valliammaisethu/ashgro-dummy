import { IconClose } from "obra-icons-react";
import React from "react";
import { Divider } from "antd";

import { unlockClubModalConstants } from "../../constants";
import { Colors } from "src/enums/colors.enum";
import { Buttons } from "src/enums/buttons.enum";
import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import { UnlockClubModalProps } from "src/shared/types/clubs.type";

import styles from "../../individualClub.module.scss";
import { replaceString } from "src/shared/utils/commonHelpers";

const UnlockClubModal = (props: UnlockClubModalProps) => {
  const { onClose, onSave, open, clubName = "", isLoading } = props;
  return (
    <Modal
      renderHeader={false}
      footer={[]}
      visible={open}
      handleOk={onSave}
      onCancel={onClose}
      centered
      closeIcon={
        <IconClose color={Colors.ASHGRO_NAVY} strokeWidth={1.5} size={24} />
      }
    >
      <h2 className={styles.unlockModalTitle}>
        {unlockClubModalConstants.title}
      </h2>
      <div className={styles.unlockModalText}>
        <p>{replaceString(unlockClubModalConstants.description, clubName)}</p>
      </div>
      <Divider />
      <div className={styles.unlockClubFooter}>
        <Button onClick={onClose} className={styles.cancelButton}>
          {Buttons.CANCEL}
        </Button>
        <Button
          onClick={onSave}
          loading={isLoading}
          className={styles.unlockButton}
        >
          {Buttons.YES_UNLOCK}
        </Button>
      </div>
    </Modal>
  );
};

export default UnlockClubModal;
