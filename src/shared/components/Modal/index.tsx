import React, { Fragment } from "react";
import { Divider, Modal as AntModal } from "antd";
import { IconCircleClose } from "obra-icons-react";
import { Colors } from "src/enums/colors.enum";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { ModalProps } from "src/shared/types/sharedComponents.type";

import styles from "./Modal.module.scss";
import { defaultModalWidth } from "src/constants/sharedComponents";
import Button from "../Button";

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
        destroyOnHidden={destroyOnHidden}
        destroyOnClose={destroyOnClose ?? true}
        centered={centered}
        bodyStyle={bodyStyle}
        styles={modalStyles}
        open={visible}
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
          <IconCircleClose color={Colors.MODAL_CLOSE_ICON} size={20} />
        }
      >
        {children}
      </AntModal>
    </div>
  );
};

export default Modal;
