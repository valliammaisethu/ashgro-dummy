import React, { Fragment } from "react";
import { Modal as CustomModal, Divider } from "antd";
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
}: ModalProps) => {
  return (
    <div className={styles.modalContainer}>
      <CustomModal
        width={width}
        rootClassName={rootClassName}
        footer={
          footer ? (
            footer
          ) : (
            <div className={styles.modalFooter}>
              <Button
                {...cancelButtonProps}
                type={ButtonTypes.PRIMARY}
                loading={!!cancelButtonProps?.loading}
                htmlType={HtmlButtonType.BUTTON}
                onClick={onCancel ?? closeModal}
              >
                {cancelText}
              </Button>

              <Button
                {...okButtonProps}
                type={okButtonType}
                className={styles.okButton}
                loading={confirmLoading}
                htmlType={okButtonHtmlType}
                onClick={handleOk ?? closeModal}
              >
                {okText}
              </Button>
            </div>
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
        destroyOnHidden
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
