import React from "react";

import styles from "../../individualProspect.module.scss";
import TextTooltip from "src/shared/components/atoms/TextTooltip";

interface DetailItemProps {
  title: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ title, value }) => {
  return (
    <div className={styles.subDetails}>
      <div className={styles.title}>{title}</div>
      <TextTooltip text={value} className={styles.value} />
    </div>
  );
};

export default DetailItem;
