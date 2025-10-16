import React from "react";

import styles from "./listing.module.scss";
import clsx from "clsx";

interface StatusTagProps {
  label: string;
  color: string;
}

const StatusTag: React.FC<StatusTagProps> = ({ label, color }) => {
  return (
    <span className={clsx(styles.statusTag, styles[`statusTag--${color}`])}>
      <span className={styles.statusTagDot}></span>
      <span>{label}</span>
    </span>
  );
};

export default StatusTag;
