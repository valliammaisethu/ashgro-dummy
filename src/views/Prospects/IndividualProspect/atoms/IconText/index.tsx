import React from "react";
import { Tooltip } from "antd";

import { useEllipsisTooltip } from "src/shared/hooks/useEllipsisTooltip";

import styles from "../../individualProspect.module.scss";

interface IconTextProps {
  icon: React.ReactNode;
  text?: string;
  className?: string;
}

const IconText: React.FC<IconTextProps> = ({ icon, text, className }) => {
  const { ref, isTruncated } = useEllipsisTooltip<HTMLSpanElement>([text]);

  return (
    <div className={styles.iconContainer}>
      {icon}
      <Tooltip title={isTruncated ? text : undefined}>
        <span ref={ref} className={className}>
          {text}
        </span>
      </Tooltip>
    </div>
  );
};

export default IconText;
