import React from "react";
import styles from "../individualProspect.module.scss";
import IconText from "./IconText";
import { IconEmail } from "obra-icons-react";
import { Colors } from "src/enums/colors.enum";
import { ContactInfo } from "../types";
import { PROSPECT_LABELS } from "../constants";

interface ProspectInfoProps {
  name: string;
  imageUrl: string;
  followUpDate: string;
  contactInfo: ContactInfo;
}

const ProspectInfo: React.FC<ProspectInfoProps> = ({
  name,
  imageUrl,
  followUpDate,
  contactInfo,
}) => {
  return (
    <div className={styles.top}>
      <div className={styles.left}>
        <img src={imageUrl} className={styles.prospectImage} alt={name} />
      </div>
      <div className={styles.right}>
        <div className={styles.name}>{name}</div>
        <div className={styles.details}>
          <span className={styles.dateTitle}>
            {PROSPECT_LABELS.followUpDate}
          </span>
          <span className={styles.date}>{followUpDate}</span>
        </div>
        <div className={styles.email}>
          <IconText
            icon={<IconEmail color={Colors.ASHGRO_GOLD} size={20} />}
            text={contactInfo.email}
            className={styles.mail}
          />
          <IconText
            icon={<IconEmail color={Colors.ASHGRO_GOLD} size={20} />}
            text={contactInfo.phone}
            className={styles.phone}
          />
        </div>
      </div>
    </div>
  );
};

export default ProspectInfo;
