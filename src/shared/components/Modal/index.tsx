import React, { Fragment } from "react";
import { Divider, Modal as AntModal } from "antd";
import clsx from "clsx";
import { IconCircleClose } from "obra-icons-react";

import { ModalFooter } from "./atoms";
import { Colors } from "src/enums/colors.enum";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { ModalProps } from "src/shared/types/sharedComponents.type";
import { defaultModalWidth } from "src/constants/sharedComponents";

import styles from "./Modal.module.scss";

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
  loading,
  renderHeader = true,
  closeIcon,
  closable,
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
    <AntModal
      width={width}
      rootClassName={clsx(styles.modalContainer, rootClassName, {
        [styles.noHeaderModal]: !renderHeader,
      })}
      destroyOnClose={destroyOnClose ?? true}
      centered={centered}
      bodyStyle={bodyStyle}
      styles={modalStyles}
      open={visible}
      closable={closable}
      loading={loading}
      onOk={handleOk ?? closeModal}
      onCancel={onCancel ?? closeModal}
      confirmLoading={confirmLoading}
      maskClosable={false}
      keyboard={false}
      destroyOnHidden
      footer={footer === undefined ? defaultFooter : footer}
      title={
        renderHeader ? (
          <Fragment>
            {title}
            <Divider className={styles.titleDivider} />
          </Fragment>
        ) : (
          <></>
        )
      }
      closeIcon={
        closeIcon ? (
          closeIcon
        ) : (
          <IconCircleClose
            strokeWidth={1.25}
            color={Colors.MODAL_CLOSE_ICON}
            size={24}
          />
        )
      }
    >
      {children}
    </AntModal>
  );
};

export default Modal;
