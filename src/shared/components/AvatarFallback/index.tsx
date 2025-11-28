import clsx from "clsx";
import React from "react";
import { AvatarWithFallbackProps } from "src/shared/types/sharedComponents.type";
import { getInitials } from "src/shared/utils/parser";
import { Colors } from "src/enums/colors.enum";

import styles from "./avatarFallback.module.scss";
import ConditionalRenderComponent from "../ConditionalRenderComponent";
import { imageAlts } from "src/constants/imageAlts";

const AvatarFallback: React.FC<AvatarWithFallbackProps> = ({
  src,
  name,
  size = 56,
  fontSize = 16,
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
        <ConditionalRenderComponent
          visible={!!src}
          fallback={
            <span
              style={{
                fontSize,
              }}
              className={styles.avatarFallbackInitials}
            >
              {getInitials(name)}
            </span>
          }
        >
          <img
            alt={imageAlts.avatarIcon}
            src={src}
            className={styles.avatarFallbackImage}
          />
        </ConditionalRenderComponent>
      </div>
    </div>
  );
};

export default AvatarFallback;
