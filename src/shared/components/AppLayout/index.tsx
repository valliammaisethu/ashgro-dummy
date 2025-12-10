import React from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../TopBar";
import { useTopBar } from "../../contexts/TopBarContext";

import styles from "./appLayout.module.scss";
const AppLayout = () => {
  const { hideTopBar } = useTopBar();

  return (
    <div className={styles.appContainer}>
      {!hideTopBar && <TopBar />}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
