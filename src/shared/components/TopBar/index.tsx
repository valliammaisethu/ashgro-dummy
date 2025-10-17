import React from "react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { IconLogOut } from "obra-icons-react";

import homeLogo from "src/assets/images/homeLogo.webp";
import textLogo from "src/assets/images/textLogo.webp";
import { sampleClubName, topBarItems } from "src/constants/sharedComponents";

import styles from "./topBar.module.scss";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (path: string) => navigate(path);

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
        <div className={styles.clubName}>{sampleClubName}</div>
        <IconLogOut />
      </div>
    </div>
  );
};

export default TopBar;
