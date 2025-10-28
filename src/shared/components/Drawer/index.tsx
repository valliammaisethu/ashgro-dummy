import React from "react";
import { Drawer as AntdDrawer } from "antd";
import { DrawerProps } from "src/shared/types/sharedComponents.type";
import { DrawerPlacement } from "src/enums/drawerPlacement.enum";
import { IconCircleClose } from "obra-icons-react";
import { Colors } from "src/enums/colors.enum";
import styles from "./drawer.module.scss";
import Button from "../Button";
import { Buttons } from "src/enums/buttons.enum";

const Drawer = (props: DrawerProps) => {
  const { footer, onClose, ...rest } = props;

  const renderFooter = () => {
    if (footer === null) return null;
    if (footer !== undefined) return footer;

    return (
      <div className={styles.drawerFooter}>
        <div className={styles.cancelButton}>
          <Button className={styles.cancelButton} onClick={onClose}>
            {Buttons.CLEAR_FILTERS}
          </Button>
        </div>
        <div>
          <Button className={styles.confirmButton}>
            {Buttons.APPLY_FILTERS}
          </Button>
        </div>
      </div>
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
