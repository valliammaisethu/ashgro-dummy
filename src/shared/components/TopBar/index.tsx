import React, { useMemo } from "react";
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
import { clubAdminRoutes, superAdminRoutes } from "./constants";

import styles from "./topBar.module.scss";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = AuthService();
  const { mutateAsync } = useMutation(logout());
  const { isSuperAdmin } = useUserRole();

  const handleLogOut = async () => mutateAsync();

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
        <IconLogOut className={styles.logoutIcon} onClick={handleLogOut} />
      </div>
    </div>
  );
};

export default TopBar;
