import { Drawer as AntdDrawer, DrawerProps } from "antd";
import React, { ReactNode, FC } from "react";

export type drawerProps = {
  title: ReactNode;
  width?: number;
  closable: boolean;
  onClose: () => void;
  open: boolean;
  closeIcon?: ReactNode;
  footer?: ReactNode;
  size?: DrawerProps["size"];
  zIndex?: number;
  children: JSX.Element;
  placement?: "top" | "bottom" | "left" | "right";
};
const Drawer: FC<drawerProps> = (props) => {
  const {
    title,
    width,
    closable = true,
    onClose,
    open = false,
    closeIcon,
    footer,
    size = "default",
    zIndex,
    placement = "right",
    children,
  } = props;
  return (
    <AntdDrawer
      title={title}
      width={width}
      closable={closable}
      onClose={onClose}
      zIndex={zIndex}
      placement={placement}
      visible={open}
      size={size}
      closeIcon={closeIcon}
      footer={footer}
    >
      {children}
    </AntdDrawer>
  );
};

export default Drawer;
