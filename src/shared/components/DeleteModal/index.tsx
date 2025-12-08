import React, { useState } from "react";
import { IconDelete } from "obra-icons-react";
import clsx from "clsx";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import { Buttons } from "src/enums/buttons.enum";
import { replaceString } from "src/shared/utils/commonHelpers";
import { deleteDescription, deleteTitle, modalWidth } from "./constants";
import ConditionalRenderComponent from "../ConditionalRenderComponent";
import { DeleteModalProps } from "src/shared/types/sharedComponents.type";

import styles from "./deleteModal.module.scss";

const DeleteModal = (props: DeleteModalProps) => {
  const {
    title,
    description,
    onDelete,
    loading,
    className,
    children,
    customTitle,
    customDescription,
    deleteButtonText,
    customWidth,
  } = props;

  const [isVisible, setIsVisible] = useState(false);

  const handleVisiblity = () => setIsVisible((prev) => !prev);

  const handleDelete = async () => {
    await onDelete?.();
    handleVisiblity();
  };
  return (
    <>
      <ConditionalRenderComponent
        visible={!children}
        fallback={
          <div onClick={handleVisiblity} className={className}>
            {children}
          </div>
        }
      >
        <Button
          onClick={handleVisiblity}
          icon={<IconDelete strokeWidth={1.5} />}
          className={clsx(styles.deleteIcon, className)}
        />
      </ConditionalRenderComponent>

      <Modal
        title={customTitle || replaceString(deleteTitle, title)}
        visible={isVisible}
        width={customWidth || modalWidth}
        centered
        handleOk={handleVisiblity}
        rootClassName={styles.deleteModal}
        onCancel={handleVisiblity}
        maskClosable={false}
        footer={[
          <div className={styles.footer} key={Buttons.DELETE_PERMANENTLY}>
            <Button
              onClick={handleDelete}
              className={styles.deleteButton}
              loading={loading}
            >
              {deleteButtonText || Buttons.DELETE_PERMANENTLY}
            </Button>
          </div>,
        ]}
      >
        <p className={styles.description}>
          {customDescription || replaceString(deleteDescription, description)}
        </p>
      </Modal>
    </>
  );
};

export default DeleteModal;
