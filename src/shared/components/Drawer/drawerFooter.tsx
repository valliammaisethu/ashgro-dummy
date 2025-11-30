import React from "react";
import clsx from "clsx";

import Button from "../Button";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { ButtonProps } from "src/shared/types/sharedComponents.type";

import styles from "./drawer.module.scss";

interface DrawerFooterProps {
  cancelText?: string;
  okText?: string;
  cancelButtonProps?: ButtonProps;
  okButtonProps?: ButtonProps;
  okButtonType?: ButtonTypes;
  okButtonHtmlType?: HtmlButtonType;
  confirmLoading?: boolean;
  onClose: () => void;
  handleOk?: () => void;
}

export const DrawerFooter = ({
  cancelText = Buttons.CANCEL,
  okText = Buttons.OK,
  cancelButtonProps,
  okButtonProps,
  okButtonType = ButtonTypes.DEFAULT,
  okButtonHtmlType = HtmlButtonType.BUTTON,
  confirmLoading,
  onClose,
  handleOk,
}: DrawerFooterProps) => {
  const handleOkClick = handleOk ?? onClose;

  return (
    <div className={styles.drawerFooter}>
      <Button
        type={ButtonTypes.PRIMARY}
        htmlType={HtmlButtonType.BUTTON}
        onClick={onClose}
        {...cancelButtonProps}
        className={clsx(styles.cancelButton, cancelButtonProps?.className)}
      >
        {cancelText}
      </Button>

      <Button
        type={okButtonType}
        htmlType={okButtonHtmlType}
        loading={confirmLoading}
        onClick={handleOkClick}
        {...okButtonProps}
        className={clsx(styles.confirmButton, okButtonProps?.className)}
      >
        {okText}
      </Button>
    </div>
  );
};
