import React from "react";

import { CLUB_LABELS } from "../constants";
import { ClubInfoProps } from "src/shared/types/clubs.type";

import styles from "../individualClub.module.scss";

const NotesSection: React.FC<ClubInfoProps> = ({ data }) => {
  const { adminDetails } = data || {};

  return (
    <div className={styles.notesSection}>
      <div className={styles.notesSectionTitle}>{CLUB_LABELS.notes}</div>
      <div className={styles.notesContent}>
        <div className={styles.noteText}>{adminDetails?.notes}</div>
      </div>
    </div>
  );
};

export default NotesSection;
