import React from "react";
import { IconChevronLeft } from "obra-icons-react";
import clsx from "clsx";

import { Buttons } from "src/enums/buttons.enum";
import useRedirect from "src/shared/hooks/useRedirect";

import styles from "./back.module.scss";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

const BackButton = ({ onClick, className }: BackButtonProps) => {
  const { navigateBack } = useRedirect();
  return (
    <div
      onClick={onClick ?? navigateBack}
      className={clsx(styles.backButton, className)}
    >
      <IconChevronLeft className={styles.backIcon} />
      <span className={styles.backText}>{Buttons.BACK}</span>
    </div>
  );
};

export default BackButton;
