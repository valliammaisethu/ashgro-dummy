import React, { Fragment } from "react";
import { Modal as CustomModal, Divider } from "antd";
import { IconCircleClose } from "obra-icons-react";
import { Colors } from "src/enums/colors.enum";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { ModalProps } from "src/shared/types/sharedComponents.type";
import { ModalFooter } from "./atoms";

import styles from "./Modal.module.scss";
import { defaultModalWidth } from "src/constants/sharedComponents";

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
  return (
    <div className={styles.modalContainer}>
      <CustomModal
        width={width}
        rootClassName={rootClassName}
        destroyOnHidden={destroyOnHidden}
        destroyOnClose={destroyOnClose}
        centered={centered}
        bodyStyle={bodyStyle}
        styles={modalStyles}
        footer={
          footer === undefined ? (
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
          ) : (
            footer
          )
        }
        title={
          <Fragment>
            {title}
            <Divider className={styles.titleDivider} />
          </Fragment>
        }
        open={visible}
        onOk={handleOk ? handleOk : closeModal}
        onCancel={onCancel ?? closeModal}
        confirmLoading={confirmLoading}
        closeIcon={
          <IconCircleClose color={Colors.MODAL_CLOSE_ICON} size={20} />
        }
      >
        {children}
      </CustomModal>
    </div>
  );
};

export default Modal;
