import React, { Fragment } from "react";
import { Modal as AntModal, Divider } from "antd";
import styles from "./Modal.module.scss";
import { IconCircleClose } from "obra-icons-react";
import { Colors } from "src/enums/colors.enum";
import Button from "../Button";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { ModalProps } from "src/shared/types/sharedComponents.type";

const Modal: React.FC<ModalProps> = ({
  children,
  closeModal,
  visible,
  title,
  width,
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
  destroyOnClose,
  bodyStyle,
}: ModalProps) => {
  const defaultFooter = (
    <div className={styles.modalFooter}>
      <Button
        {...cancelButtonProps}
        type={ButtonTypes.PRIMARY}
        htmlType={HtmlButtonType.BUTTON}
        loading={!!cancelButtonProps?.loading}
        onClick={onCancel ?? closeModal}
      >
        {cancelText}
      </Button>

      <Button
        {...okButtonProps}
        type={okButtonType}
        className={styles.okButton}
        htmlType={okButtonHtmlType}
        loading={confirmLoading}
        onClick={handleOk ?? closeModal}
      >
        {okText}
      </Button>
    </div>
  );

  return (
    <div className={styles.modalContainer}>
      <AntModal
        width={width}
        rootClassName={rootClassName}
        centered={centered}
        bodyStyle={bodyStyle}
        styles={modalStyles}
        open={visible}
        destroyOnHidden={destroyOnHidden}
        onOk={handleOk ?? closeModal}
        onCancel={onCancel ?? closeModal}
        confirmLoading={confirmLoading}
        destroyOnClose={destroyOnClose}
        footer={footer === undefined ? defaultFooter : footer}
        title={
          <Fragment>
            {title}
            <Divider className={styles.titleDivider} />
          </Fragment>
        }
        closeIcon={
          <IconCircleClose color={Colors.MODAL_CLOSE_ICON} size={20} />
        }
      >
        {children}
      </AntModal>
    </div>
  );
};

export default Modal;
