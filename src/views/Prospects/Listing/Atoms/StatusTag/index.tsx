import React from "react";
import clsx from "clsx";

import { StatusTagProps } from "src/shared/types/sharedComponents.type";

import styles from "../../listing.module.scss";

const StatusTag: React.FC<StatusTagProps> = ({ label, color = "" }) => {
  return (
    <span className={clsx(styles.statusTag, styles[color])}>
      <span className={styles.statusTagDot}></span>
      <span>{label}</span>
    </span>
  );
};

export default StatusTag;
