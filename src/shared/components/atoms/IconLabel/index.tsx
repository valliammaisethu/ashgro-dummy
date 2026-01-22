import React from "react";
import clsx from "clsx";

import { Colors } from "src/enums/colors.enum";

import styles from "./iconLabel.module.scss";
import { fallbackHandler } from "src/shared/utils/commonHelpers";

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
  return (
    <p
      className={clsx(styles.iconLabel, className, {
        [styles.isEmail]: isEmail,
      })}
    >
      <Icon color={color} size={size} />
      {fallbackHandler(label)}
    </p>
  );
};

export default IconLabel;
