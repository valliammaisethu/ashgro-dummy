import React from "react";
import { Drawer as AntdDrawer } from "antd";
import { IconCircleClose } from "obra-icons-react";

import { DrawerProps } from "src/shared/types/sharedComponents.type";
import { DrawerPlacement } from "src/enums/drawerPlacement.enum";
import { Colors } from "src/enums/colors.enum";
import { DrawerFooter } from "./atoms";

const Drawer = (props: DrawerProps) => {
  const {
    footer,
    onClose,
    cancelText,
    okText,
    cancelButtonProps,
    okButtonProps,
    okButtonType,
    okButtonHtmlType,
    confirmLoading,
    handleOk,
    ...rest
  } = props;

  const renderFooter = () => {
    if (footer === null) return null;
    if (footer !== undefined) return footer;

    return (
      <DrawerFooter
        cancelText={cancelText}
        okText={okText}
        cancelButtonProps={cancelButtonProps}
        okButtonProps={okButtonProps}
        okButtonType={okButtonType}
        okButtonHtmlType={okButtonHtmlType}
        confirmLoading={confirmLoading}
        onClose={onClose}
        handleOk={handleOk}
      />
    );
  };

  return (
    <AntdDrawer
      {...rest}
      onClose={onClose}
      closeIcon={
        <IconCircleClose
          color={Colors.MODAL_CLOSE_ICON}
          strokeWidth={1.25}
          size={24}
        />
      }
      footer={renderFooter()}
      placement={DrawerPlacement.RIGHT}
    />
  );
};

export default Drawer;
