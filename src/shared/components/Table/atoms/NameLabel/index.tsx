import React from "react";

import { Tooltip } from "antd";

import AvatarFallback from "src/shared/components/AvatarFallback";
import { useEllipsisTooltip } from "src/shared/hooks/useEllipsisTooltip";
import { getFullName } from "src/shared/utils/helpers";
import { NameLabelProps } from "src/shared/types/table.type";

import styles from "../../table.module.scss";

const NameLabel = ({ firstName, lastName, avatarUrl }: NameLabelProps) => {
  const name = getFullName(firstName, lastName);
  const { ref, isTruncated } = useEllipsisTooltip([name]);

  return (
    <div className={styles.nameLabel}>
      <AvatarFallback
        src={avatarUrl}
        name={name}
        size={32}
        className={styles.avatar}
      />
      <Tooltip title={isTruncated ? name : undefined}>
        <span ref={ref} className={styles.name}>
          {name}
        </span>
      </Tooltip>
    </div>
  );
};

export default NameLabel;
