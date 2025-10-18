import React from "react";
import styles from "../individualProspect.module.scss";
import DetailItem from "./DetailItem";
import { DetailItem as DetailItemType } from "../types";

interface DetailSectionProps {
  title: string;
  items: DetailItemType[];
}

const DetailSection: React.FC<DetailSectionProps> = ({ title, items }) => {
  return (
    <div className={styles.details}>
      <span className={styles.title}>{title}</span>
      <div className={styles.container}>
        {items.map((item, index) => (
          <DetailItem key={index} title={item.title} value={item.value} />
        ))}
      </div>
    </div>
  );
};

export default DetailSection;
