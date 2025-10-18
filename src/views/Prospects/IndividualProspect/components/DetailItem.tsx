import React from "react";
import styles from "../individualProspect.module.scss";

interface DetailItemProps {
  title: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ title, value }) => {
  return (
    <div className={styles.subDetails}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default DetailItem;
