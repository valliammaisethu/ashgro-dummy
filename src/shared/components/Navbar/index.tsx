import React from "react";
import { Menu } from "antd";
import styles from "./navbar.module.scss";
import Notification from "../Notification";
import { SharedComponentsConstants } from "../../../constants/sharedComponents";

const Navbar = () => {
  const handleClick = () =>
    Notification(SharedComponentsConstants.LOGOUT_NOTIFICATION);
  return (
    <Menu onClick={handleClick} mode={SharedComponentsConstants.NAVBAR.MODE}>
      <Menu.Item className={styles["navbar-item"]}>
        {SharedComponentsConstants.LOGOUT_TEXT}
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
