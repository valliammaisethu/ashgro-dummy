import React from "react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { IconLogOut } from "obra-icons-react";

import homeLogo from "src/assets/images/homeLogo.webp";
import textLogo from "src/assets/images/textLogo.webp";
import { topBarItems } from "src/constants/sharedComponents";

import styles from "./topBar.module.scss";
import { AuthService } from "src/services/AuthService/auth.service";
import { useMutation } from "@tanstack/react-query";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = AuthService();

  const { mutateAsync } = useMutation(logout());

  const handleLogOut = async () => mutateAsync();

  const handleItemClick = (path: string) => navigate(path);

  const clubName = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubName;

  return (
    <div className={styles.topBar}>
      <div className={styles.logoContainer}>
        <img className={styles.homeLogo} src={homeLogo} />
        <img className={styles.textLogo} src={textLogo} />
      </div>
      <div className={styles.topBarRight}>
        {topBarItems.map((item) => {
          return (
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
          );
        })}
      </div>
      <div className={styles.topBarEnd}>
        <div className={styles.clubName}>{clubName}</div>
        <IconLogOut className={styles.logoutIcon} onClick={handleLogOut} />
      </div>
    </div>
  );
};

export default TopBar;
