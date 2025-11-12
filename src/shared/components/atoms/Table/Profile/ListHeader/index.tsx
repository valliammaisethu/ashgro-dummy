import React from "react";
import styles from "./listHeader.module.scss";

interface ListHeaderProps {
  headers: string[];
  columnTemplate?: string;
}

const ListHeader: React.FC<ListHeaderProps> = ({ headers, columnTemplate }) => (
  <div
    className={styles.headerRow}
    style={columnTemplate ? { gridTemplateColumns: columnTemplate } : undefined}
  >
    {headers.map((label) => (
      <p key={label} className={styles.headerLabel}>
        {label}
      </p>
    ))}
  </div>
);

export default ListHeader;
