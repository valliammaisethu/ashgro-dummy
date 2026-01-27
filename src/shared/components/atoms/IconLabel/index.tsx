import React from "react";
import clsx from "clsx";
import { Tooltip } from "antd";

import { Colors } from "src/enums/colors.enum";

import styles from "./iconLabel.module.scss";
import { fallbackHandler } from "src/shared/utils/commonHelpers";
import { useEllipsisTooltip } from "src/shared/hooks/useEllipsisTooltip";

interface IconLabelProps {
  icon: React.ElementType;
  label?: string;
  color?: string;
  size?: number;
  className?: string;
  isEmail?: boolean;
}

const IconLabel: React.FC<IconLabelProps> = ({
  icon: Icon,
  label,
  color = Colors.ASHGRO_GOLD,
  size = 20,
  className,
  isEmail,
}) => {
  const { ref, isTruncated } = useEllipsisTooltip<HTMLSpanElement>([label]);

  return (
    <div
      className={clsx(styles.iconLabel, className, {
        [styles.isEmail]: isEmail,
      })}
    >
      <Icon color={color} size={size} />
      <Tooltip title={isTruncated ? label : undefined}>
        <span ref={ref} className={styles.label}>
          {fallbackHandler(label)}
        </span>
      </Tooltip>
    </div>
  );
};

export default IconLabel;
