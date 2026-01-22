import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { IconLogOut } from "obra-icons-react";
import { useMutation } from "@tanstack/react-query";

import homeLogo from "src/assets/images/homeLogo.webp";
import textLogo from "src/assets/images/textLogo.webp";
import { topBarItems } from "src/constants/sharedComponents";
import { AuthService } from "src/services/AuthService/auth.service";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { useUserRole } from "src/shared/hooks/useUserRole";
import {
  clubAdminRoutes,
  logoutConstants,
  superAdminRoutes,
} from "./constants";
import MyProfile from "src/views/MyProfile";
import Button from "../Button";
import { Buttons } from "src/enums/buttons.enum";
import Modal from "../Modal";

import styles from "./topBar.module.scss";

const { LOGOUT, YES_LOGOUT, CANCEL } = Buttons;
const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = AuthService();
  const { mutateAsync, isPending: logoutPending } = useMutation(logout());
  const { isSuperAdmin } = useUserRole();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const toggleLogoutModal = () => setIsLogoutOpen((prev) => !prev);

  const handelLogout = async () => {
    await mutateAsync();
    toggleLogoutModal();
  };

  const handleItemClick = (path: string) => navigate(path);

  const clubName = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubName;
  const filteredItems = useMemo(() => {
    if (isSuperAdmin) {
      return topBarItems.filter((item) =>
        superAdminRoutes.includes(item.title),
      );
    }

    return topBarItems.filter((item) => clubAdminRoutes.includes(item.title));
  }, [isSuperAdmin]);

  return (
    <div className={styles.topBar}>
      <div className={styles.logoContainer}>
        <img className={styles.homeLogo} src={homeLogo} alt="Home Logo" />
        <img className={styles.textLogo} src={textLogo} alt="Text Logo" />
      </div>

      <div className={styles.topBarRight}>
        {filteredItems.map((item) => (
          <div
            className={clsx(styles.topBarItem, {
              [styles.active]: location.pathname === item.path,
            })}
            key={item.path}
            onClick={() => handleItemClick(item.path)}
          >
            {item.icon}
            {item.title}
          </div>
        ))}
      </div>

      <div className={styles.topBarEnd}>
        {!isSuperAdmin && <div className={styles.clubName}>{clubName}</div>}
        {isSuperAdmin && <MyProfile />}
        <Button
          className={styles.logoutButton}
          disabled={logoutPending}
          icon={
            <IconLogOut
              className={styles.logoutIcon}
              onClick={toggleLogoutModal}
            />
          }
        ></Button>
        <Modal
          title={LOGOUT}
          visible={isLogoutOpen}
          okText={YES_LOGOUT}
          closeModal={toggleLogoutModal}
          rootClassName={styles.logoutModal}
          handleOk={handelLogout}
          cancelText={CANCEL}
          centered
          okButtonProps={{
            loading: logoutPending,
          }}
          cancelButtonProps={{
            className: styles.cancelButton,
          }}
        >
          <p className={styles.logoutModalText}>{logoutConstants.LOGOUT}</p>
        </Modal>
      </div>
    </div>
  );
};

export default TopBar;
