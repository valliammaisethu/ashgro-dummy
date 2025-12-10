import React from "react";

import DetailItem from "../atoms/DetailItem";
import { DetailItem as DetailItemType } from "../types";
import { ViewProspect } from "src/models/viewProspect.model";
import { getLeadDetails, getFeesAndDues } from "../utils";
import { DETAIL_TITLES, DetailSectionType } from "../constants";

import styles from "../individualProspect.module.scss";

interface DetailSectionProps {
  title: string;
  data?: ViewProspect;
  type: DetailSectionType;
}

const DetailSection: React.FC<DetailSectionProps> = ({
  title,
  data = new ViewProspect(),
  type,
}) => {
  const items: DetailItemType[] =
    type === DetailSectionType.LEAD_DETAILS
      ? getLeadDetails(
          data.inquiryDate,
          data.leadSource,
          data.membershipCategory,
          DETAIL_TITLES,
        )
      : getFeesAndDues(data.monthlyDues, data.initiationFee, DETAIL_TITLES);

  return (
    <div className={styles.details}>
      <span className={styles.title}>{title}</span>
      <div className={styles.container}>
        {items?.map((item, index) => (
          <DetailItem key={index} title={item.title} value={item.value} />
        ))}
      </div>
    </div>
  );
};

export default DetailSection;
