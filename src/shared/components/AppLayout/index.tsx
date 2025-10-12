import React from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../TopBar";

import styles from "./appLayout.module.scss";
const AppLayout = () => {
  return (
    <div className={styles.appContainer}>
      <TopBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
