import React, { Fragment } from "react";
import { Divider, Modal as AntModal } from "antd";
import { IconCircleClose } from "obra-icons-react";
import { Colors } from "src/enums/colors.enum";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { ModalProps } from "src/shared/types/sharedComponents.type";

import styles from "./Modal.module.scss";
import { defaultModalWidth } from "src/constants/sharedComponents";
import { ModalFooter } from "./atoms";

const Modal: React.FC<ModalProps> = ({
  children,
  closeModal,
  visible,
  title,
  width = defaultModalWidth,
  handleOk,
  footer,
  cancelText = Buttons.CANCEL,
  onCancel,
  confirmLoading,
  okText = Buttons.OK,
  cancelButtonProps,
  okButtonProps,
  okButtonHtmlType = HtmlButtonType.BUTTON,
  okButtonType = ButtonTypes.DEFAULT,
  rootClassName,
  centered,
  styles: modalStyles,
  destroyOnHidden,
  loading,
  destroyOnClose,
  bodyStyle,
}: ModalProps) => {
  const defaultFooter = (
    <ModalFooter
      cancelText={cancelText}
      okText={okText}
      cancelButtonProps={cancelButtonProps}
      okButtonProps={okButtonProps}
      okButtonType={okButtonType}
      okButtonHtmlType={okButtonHtmlType}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      handleOk={handleOk}
      closeModal={closeModal}
    />
  );

  return (
    <div className={styles.modalContainer}>
      <AntModal
        width={width}
        rootClassName={rootClassName}
        destroyOnHidden={destroyOnHidden}
        destroyOnClose={destroyOnClose ?? true}
        centered={centered}
        bodyStyle={bodyStyle}
        styles={modalStyles}
        open={visible}
        loading={loading}
        onOk={handleOk ?? closeModal}
        onCancel={onCancel ?? closeModal}
        confirmLoading={confirmLoading}
        footer={footer === undefined ? defaultFooter : footer}
        title={
          <Fragment>
            {title}
            <Divider className={styles.titleDivider} />
          </Fragment>
        }
        closeIcon={
          <IconCircleClose
            strokeWidth={1.25}
            color={Colors.MODAL_CLOSE_ICON}
            size={20}
          />
        }
      >
        {children}
      </AntModal>
    </div>
  );
};

export default Modal;
