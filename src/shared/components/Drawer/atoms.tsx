import React from "react";
import styles from "./drawer.module.scss";
import Button from "../Button";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { ButtonProps } from "antd";

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

export const DrawerFooter: React.FC<DrawerFooterProps> = ({
  cancelText = Buttons.CANCEL,
  okText = Buttons.OK,
  cancelButtonProps = {},
  okButtonProps = {},
  okButtonType = ButtonTypes.DEFAULT,
  okButtonHtmlType = HtmlButtonType.BUTTON,
  confirmLoading,
  onClose,
  handleOk,
}) => {
  const handleOkClick = handleOk ?? onClose;

  // Extract specific props to avoid spreading them
  const {
    className: cancelClassName,
    onClick: cancelOnClick,
    loading: cancelLoading,
    ...restCancelProps
  } = cancelButtonProps;

  const {
    className: okClassName,
    onClick: okOnClick,
    loading: okLoading,
    ...restOkProps
  } = okButtonProps;

  // Merge classNames
  const finalCancelClassName = [styles.cancelButton, cancelClassName]
    .filter(Boolean)
    .join(" ");

  const finalOkClassName = [styles.confirmButton, okClassName]
    .filter(Boolean)
    .join(" ");

  // Normalize loading prop to boolean
  const cancelLoadingValue =
    typeof cancelLoading === "boolean"
      ? cancelLoading
      : typeof cancelLoading === "object"
        ? true
        : false;

  const okLoadingValue =
    typeof okLoading === "boolean"
      ? okLoading
      : typeof okLoading === "object"
        ? true
        : (okLoading ?? confirmLoading ?? false);

  return (
    <div className={styles.drawerFooter}>
      <Button
        {...restCancelProps}
        type={ButtonTypes.PRIMARY}
        htmlType={HtmlButtonType.BUTTON}
        loading={cancelLoadingValue}
        onClick={cancelOnClick ?? onClose}
        className={finalCancelClassName}
      >
        {cancelText}
      </Button>

      <Button
        {...restOkProps}
        type={okButtonType}
        htmlType={okButtonHtmlType}
        loading={okLoadingValue}
        onClick={okOnClick ?? handleOkClick}
        className={finalOkClassName}
      >
        {okText}
      </Button>
    </div>
  );
};
