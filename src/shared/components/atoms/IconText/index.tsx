import React from "react";

import { IconTextProps } from "src/shared/types/clubs.type";
import { fallbackHandler } from "src/shared/utils/commonHelpers";

import styles from "./iconText.module.scss";

const IconText: React.FC<IconTextProps> = ({ icon, text = "", className }) => {
  return (
    <div className={styles.iconContainer}>
      {icon}
      <span className={className}>{fallbackHandler(text)}</span>
    </div>
  );
};

export default IconText;
