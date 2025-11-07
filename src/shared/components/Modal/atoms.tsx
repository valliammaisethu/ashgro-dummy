import React from "react";
import styles from "./Modal.module.scss";
import Button from "../Button";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { ButtonProps } from "antd";

interface ModalFooterProps {
  cancelText?: string;
  okText?: string;
  cancelButtonProps?: ButtonProps;
  okButtonProps?: ButtonProps;
  okButtonType?: ButtonTypes;
  okButtonHtmlType?: HtmlButtonType;
  confirmLoading?: boolean;
  onCancel?: () => void;
  handleOk?: () => void;
  closeModal?: () => void;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  cancelText = Buttons.CANCEL,
  okText = Buttons.OK,
  cancelButtonProps,
  okButtonProps,
  okButtonType = ButtonTypes.DEFAULT,
  okButtonHtmlType = HtmlButtonType.BUTTON,
  confirmLoading,
  onCancel,
  handleOk,
  closeModal,
}) => {
  const handleCancel = onCancel ?? closeModal;
  const handleOkClick = handleOk ?? closeModal;

  return (
    <div className={styles.modalFooter}>
      <Button
        {...cancelButtonProps}
        type={ButtonTypes.PRIMARY}
        loading={!!cancelButtonProps?.loading}
        htmlType={HtmlButtonType.BUTTON}
        onClick={handleCancel}
      >
        {cancelText}
      </Button>

      <Button
        {...okButtonProps}
        type={okButtonType}
        className={styles.okButton}
        loading={Boolean(okButtonProps?.loading) ?? confirmLoading}
        htmlType={okButtonHtmlType}
        onClick={handleOkClick}
      >
        {okText}
      </Button>
    </div>
  );
};
