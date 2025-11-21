import React from "react";

import { CLUB_LABELS, CONTACT_TITLES } from "../constants";
import { ClubInfoProps } from "src/shared/types/clubs.type";

import styles from "../individualClub.module.scss";
import { fallbackHandler } from "src/shared/utils/commonHelpers";

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
          <div className={styles.value}>
            {fallbackHandler(
              `${adminDetails?.firstName} ${adminDetails?.lastName}`,
            )}
          </div>
        </div>
        <div className={styles.contactDetail}>
          <div className={styles.label}>{CONTACT_TITLES.emailAddress}</div>
          <div className={styles.value}>
            {fallbackHandler(adminDetails?.email)}
          </div>
        </div>
        <div className={styles.contactDetail}>
          <div className={styles.label}>{CONTACT_TITLES.phoneNumber}</div>
          <div className={styles.value}>
            {fallbackHandler(adminDetails?.contactNumber)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
