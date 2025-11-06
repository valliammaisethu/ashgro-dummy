import React from "react";

import styles from "./listHeader.module.scss";

interface ListHeaderProps {
  headers: string[];
}

const ListHeader: React.FC<ListHeaderProps> = ({ headers }) => (
  <div className={styles.headerRow}>
    {headers.map((label) => (
      <p key={label} className={styles.headerLabel}>
        {label}
      </p>
    ))}
  </div>
);

export default ListHeader;
