import React from "react";

import styles from "./settingsSkeleton.module.scss";

const SettingsSkeleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.cardGrid}>
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className={styles.cardSkeleton} />
        ))}
      </div>
    </div>
  );
};

export default SettingsSkeleton;
