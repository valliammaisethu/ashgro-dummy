import React from "react";

import { CLUB_LABELS, CONTACT_TITLES } from "../constants";
import { ClubInfoProps } from "src/shared/types/clubs.type";

import styles from "../individualClub.module.scss";
import { fallbackHandler } from "src/shared/utils/commonHelpers";
import { getFullName } from "src/shared/utils/helpers";
import TextTooltip from "src/shared/components/atoms/TextTooltip";

const ContactDetails: React.FC<ClubInfoProps> = ({ data }) => {
  const { adminDetails } = data || {};
  return (
    <div className={styles.contactDetailsSection}>
      <div className={styles.sectionTitle}>
        {CLUB_LABELS.primaryContactDetails}
      </div>
      <div className={styles.contactDetailsContainer}>
        <div className={styles.contactDetail}>
          <div className={styles.label}>{CONTACT_TITLES.name}</div>
          <TextTooltip
            text={fallbackHandler(
              getFullName(adminDetails?.firstName, adminDetails?.lastName),
            )}
            className={styles.value}
          />
        </div>
        <div className={styles.contactDetail}>
          <div className={styles.label}>{CONTACT_TITLES.emailAddress}</div>
          <TextTooltip
            text={fallbackHandler(adminDetails?.email)}
            className={styles.value}
          />
        </div>
        <div className={styles.contactDetail}>
          <div className={styles.label}>{CONTACT_TITLES.phoneNumber}</div>
          <TextTooltip
            text={fallbackHandler(adminDetails?.contactNumber)}
            className={styles.value}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
