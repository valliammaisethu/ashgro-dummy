import React from "react";
import clsx from "clsx";

import styles from "./listHeader.module.scss";

interface ListHeaderProps {
  headers: string[];
  columnTemplate?: string;
  className?: string;
}

const ListHeader: React.FC<ListHeaderProps> = ({
  headers,
  columnTemplate,
  className,
}) => (
  <div
    className={clsx(styles.headerRow, className)}
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
