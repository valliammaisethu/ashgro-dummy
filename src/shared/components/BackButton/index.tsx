import React from "react";
import { IconChevronLeft } from "obra-icons-react";
import clsx from "clsx";

import { Buttons } from "src/enums/buttons.enum";

import styles from "./backButton.module.scss";

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

const BackButton = ({ onClick, className }: BackButtonProps) => {
  return (
    <div onClick={onClick} className={clsx(styles.backButton, className)}>
      <IconChevronLeft className={styles.backIcon} />
      <span className={styles.backText}>{Buttons.BACK}</span>
    </div>
  );
};

export default BackButton;
