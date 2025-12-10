import React from "react";

import { EMPTY_STATE_STRINGS } from "../../constants";
import styles from "./emptyState.module.scss";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const { TITLE, DESCRIPTION } = EMPTY_STATE_STRINGS;

const EmptyState: React.FC<EmptyStateProps> = ({
  title = TITLE,
  description = DESCRIPTION,
}) => {
  return (
    <div className={styles.emptyStateContainer}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default EmptyState;
