import clsx from "clsx";
import React from "react";
import { AvatarWithFallbackProps } from "src/shared/types/sharedComponents.type";
import { getInitials } from "src/shared/utils/parser";
import { Colors } from "src/enums/colors.enum";

import styles from "./avatarFallback.module.scss";

const AvatarFallback: React.FC<AvatarWithFallbackProps> = ({
  src,
  name,
  size = 40,
  className = "",
  backgroundColor = Colors.ASHGRO_GOLD,
}) => {
  return (
    <div
      className={clsx(styles.avatarFallbackOuter, className)}
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        className={styles.avatarFallbackInner}
        style={{
          backgroundColor: src ? "transparent" : backgroundColor,
        }}
      >
        {src ? (
          <img src={src} className={styles.avatarFallbackImage} />
        ) : (
          <span className={styles.avatarFallbackInitials}>
            {getInitials(name)}
          </span>
        )}
      </div>
    </div>
  );
};

export default AvatarFallback;
