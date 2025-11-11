import React from "react";

import { ContactDetailsProps } from "src/shared/types/clubs.type";
import { CLUB_LABELS, CONTACT_TITLES } from "../constants";

import styles from "../individualClub.module.scss";

const ContactDetails: React.FC<ContactDetailsProps> = ({ data }) => {
  const { primaryContact } = data || {};
  const { name = "", email = "", phoneNumber = "" } = primaryContact || {};

  return (
    <div className={styles.contactDetailsSection}>
      <div className={styles.sectionTitle}>
        {CLUB_LABELS.primaryContactDetails}
      </div>
      <div className={styles.contactDetailsContainer}>
        <div className={styles.contactDetail}>
          <div className={styles.label}>{CONTACT_TITLES.name}</div>
          <div className={styles.value}>{name}</div>
        </div>
        <div className={styles.contactDetail}>
          <div className={styles.label}>{CONTACT_TITLES.emailAddress}</div>
          <div className={styles.value}>{email}</div>
        </div>
        <div className={styles.contactDetail}>
          <div className={styles.label}>{CONTACT_TITLES.phoneNumber}</div>
          <div className={styles.value}>{phoneNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
