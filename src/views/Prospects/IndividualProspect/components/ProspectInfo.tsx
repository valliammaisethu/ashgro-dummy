import React from "react";
import { IconEmail } from "obra-icons-react";

import { Colors } from "src/enums/colors.enum";
import { PROSPECT_LABELS } from "../constants";
import IconText from "../atoms/IconText";

import styles from "../individualProspect.module.scss";
import { ViewProspect } from "src/models/viewProspect.model";
import { getFullName } from "src/shared/utils/helpers";
import { formatDate } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import { getPhoneNumber } from "../utils";

interface ProspectInfoProps {
  imageUrl?: string;
  data?: ViewProspect;
}

const ProspectInfo: React.FC<ProspectInfoProps> = ({
  imageUrl,
  data: prospect = new ViewProspect(),
}) => {
  const {
    firstName,
    endName,
    followUpDate,
    contactNumber,
    countryCode,
    email,
  } = prospect;

  return (
    <div className={styles.top}>
      <div className={styles.left}>
        <img src={imageUrl} className={styles.prospectImage} />
      </div>
      <div className={styles.right}>
        <div className={styles.name}>{getFullName(firstName, endName)}</div>
        <div className={styles.details}>
          <span className={styles.dateTitle}>
            {PROSPECT_LABELS.followUpDate}
          </span>
          <span className={styles.date}>
            {formatDate(followUpDate, DateFormats.DD_MMM__YYYY)}
          </span>
        </div>
        <div className={styles.email}>
          <IconText
            icon={<IconEmail color={Colors.ASHGRO_GOLD} size={20} />}
            text={email}
            className={styles.mail}
          />
          <IconText
            icon={<IconEmail color={Colors.ASHGRO_GOLD} size={20} />}
            text={getPhoneNumber(countryCode, contactNumber)}
            className={styles.phone}
          />
        </div>
      </div>
    </div>
  );
};

export default ProspectInfo;
