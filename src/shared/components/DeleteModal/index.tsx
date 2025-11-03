import React, { useState } from "react";
import { IconDelete } from "obra-icons-react";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import { Buttons } from "src/enums/buttons.enum";
import { replaceString } from "src/shared/utils/commonHelpers";
import { deleteDescription, deleteTitle, modalWidth } from "./constants";

import styles from "./deleteModal.module.scss";

interface DeleteModalProps {
  title?: string;
  description?: string;
  onDelete?: () => void | Promise<void>;
}

const DeleteModal = (props: DeleteModalProps) => {
  const { title, description, onDelete } = props;

  const [isVisible, setIsVisible] = useState(false);

  const handleVisiblity = () => setIsVisible((prev) => !prev);

  const handleDelete = async () => {
    await onDelete?.();
    handleVisiblity();
  };
  return (
    <div>
      <Button
        onClick={handleVisiblity}
        icon={<IconDelete strokeWidth={1.5} />}
        className={styles.deleteIcon}
      />
      <Modal
        title={replaceString(deleteTitle, title)}
        visible={isVisible}
        width={modalWidth}
        centered
        handleOk={handleVisiblity}
        rootClassName={styles.deleteModal}
        maskClosable={false}
        footer={[
          <div className={styles.footer} key={Buttons.DELETE_PERMANENTLY}>
            <Button onClick={handleDelete} className={styles.deleteButton}>
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
