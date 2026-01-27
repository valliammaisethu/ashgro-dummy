import React from "react";

import { IconTextProps } from "src/shared/types/clubs.type";
import { fallbackHandler } from "src/shared/utils/commonHelpers";

import TextTooltip from "src/shared/components/atoms/TextTooltip";

import styles from "./iconText.module.scss";

const IconText: React.FC<IconTextProps> = ({ icon, text = "", className }) => {
  return (
    <div className={styles.iconContainer}>
      {icon}
      <TextTooltip text={fallbackHandler(text)} className={className} />
    </div>
  );
};

export default IconText;
