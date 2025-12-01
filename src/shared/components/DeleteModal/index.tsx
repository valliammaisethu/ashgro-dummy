import React, { useState } from "react";
import { IconDelete } from "obra-icons-react";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import { Buttons } from "src/enums/buttons.enum";
import { replaceString } from "src/shared/utils/commonHelpers";
import { DeleteModalProps } from "src/shared/types/sharedComponents.type";
import { deleteDescription, deleteTitle, modalWidth } from "./constants";

import styles from "./deleteModal.module.scss";

const DeleteModal = (props: DeleteModalProps) => {
  const {
    title,
    description,
    onDelete,
    loading,
    externalVisible,
    externalOnClose,
    modalWidth: externalModalWidth = modalWidth,
  } = props;

  const isControlled = externalVisible !== undefined;

  const [internalVisible, setInternalVisible] = useState(false);
  const visible = isControlled ? externalVisible : internalVisible;

  const openInternal = () => setInternalVisible(true);
  const closeInternal = () => setInternalVisible(false);

  const handleVisibility = () => {
    if (isControlled) externalOnClose?.();
    else closeInternal();
  };

  const handleDelete = async () => {
    await onDelete?.();
    handleVisibility();
  };

  return (
    <div>
      {!isControlled && (
        <Button
          onClick={openInternal}
          icon={<IconDelete strokeWidth={1.5} />}
          className={styles.deleteIcon}
        />
      )}

      <Modal
        title={replaceString(deleteTitle, title)}
        visible={visible}
        width={externalModalWidth}
        centered
        handleOk={handleVisibility}
        rootClassName={styles.deleteModal}
        onCancel={handleVisibility}
        maskClosable={false}
        footer={[
          <div className={styles.footer} key={Buttons.DELETE_PERMANENTLY}>
            <Button
              onClick={handleDelete}
              className={styles.deleteButton}
              loading={loading}
            >
              {Buttons.DELETE_PERMANENTLY}
            </Button>
          </div>,
        ]}
      >
        <p className={styles.description}>
          {replaceString(deleteDescription, description)}
        </p>
      </Modal>
    </div>
  );
};

export default DeleteModal;
