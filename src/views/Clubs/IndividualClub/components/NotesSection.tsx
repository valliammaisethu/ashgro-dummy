import React from "react";

import { NotesSectionProps } from "src/shared/types/clubs.type";
import { CLUB_LABELS, NOTES_CATEGORIES } from "../constants";

import styles from "../individualClub.module.scss";

const NotesSection: React.FC<NotesSectionProps> = ({ notes }) => {
  const {
    signatureHoles,
    tournamentsEvents,
    specialAmenities,
    memberExperience,
    reputationRecognition,
    hospitalityCorporateFeatures,
  } = notes || {};

  const noteItems = [
    {
      title: NOTES_CATEGORIES.signatureHoles,
      content: signatureHoles,
    },
    {
      title: NOTES_CATEGORIES.tournamentsEvents,
      content: tournamentsEvents,
    },
    {
      title: NOTES_CATEGORIES.specialAmenities,
      content: specialAmenities,
    },
    {
      title: NOTES_CATEGORIES.memberExperience,
      content: memberExperience,
    },
    {
      title: NOTES_CATEGORIES.reputationRecognition,
      content: reputationRecognition,
    },
    {
      title: NOTES_CATEGORIES.hospitalityCorporateFeatures,
      content: hospitalityCorporateFeatures,
    },
  ];

  return (
    <div className={styles.notesSection}>
      <div className={styles.notesSectionTitle}>{CLUB_LABELS.notes}</div>
      <div className={styles.notesContent}>
        {noteItems.map((item, index) => (
          <div key={index} className={styles.noteItem}>
            <div className={styles.noteTitle}>
              {item.title}:
              <span className={styles.noteText}> {item.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesSection;
