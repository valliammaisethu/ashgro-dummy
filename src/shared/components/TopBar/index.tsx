import React from "react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";

import homeLogo from "src/assets/images/homeLogo.webp";
import textLogo from "src/assets/images/textLogo.webp";
import { topBarItems } from "src/constants/sharedComponents";

import styles from "./topBar.module.scss";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (path: string) => navigate(path);

  return (
    <div className={styles.topBar}>
      <div className={styles.logoContainer}>
        <img height={38} width={36} src={homeLogo} />
        <img height={31} width={80} src={textLogo} />
      </div>
      <div className={styles.topBarRight}>
        {topBarItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              className={clsx(styles.topBarItem, isActive && styles.active)}
              key={item.path}
              onClick={() => handleItemClick(item.path)}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopBar;
