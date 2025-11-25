import React from "react";

import { CLUB_LABELS } from "../constants";
import { ClubInfoProps } from "src/shared/types/clubs.type";

import styles from "../individualClub.module.scss";
import ConditionalRender from "src/shared/components/ConditionalRender";

const NotesSection: React.FC<ClubInfoProps> = ({ data }) => {
  const { notes } = data || {};

  return (
    <ConditionalRender
      records={[notes]}
      isPending={false}
      isSuccess={true}
      className={styles.emptyWrapper}
    >
      <div className={styles.notesSection}>
        <div className={styles.notesSectionTitle}>{CLUB_LABELS.notes}</div>
        <div className={styles.notesContent}>
          <div className={styles.noteText}>{notes}</div>
        </div>
      </div>
    </ConditionalRender>
  );
};

export default NotesSection;
