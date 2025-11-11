import React from "react";
import styles from "./badge.module.scss";
import clsx from "clsx";

interface BadgeProps {
  text: string;
  color: string;
  backgroundColor: string;
  className?: string;
}

const Badge = (props: BadgeProps) => {
  const { text, color, backgroundColor, className } = props;
  return (
    <div
      style={{
        color,
        backgroundColor,
      }}
      className={clsx(styles.container, className)}
    >
      {text}
    </div>
  );
};

export default Badge;
