import React from "react";
import { IconEmail } from "obra-icons-react";

import Button from "src/shared/components/Button";
import { ButtonTypes } from "src/enums/buttons.enum";
import { ButtonNames } from "./constant";

import styles from "./IndividualDetailsHeader.module.scss";
import BackButton from "../Back";

interface IndividualDetailsHeaderProps {
  navigateBack?: () => void;
  onEmailClick?: () => void;
}

const { EMAIL } = ButtonNames;

const IndividualDetailsHeader = ({
  navigateBack,
  onEmailClick,
}: IndividualDetailsHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftSide}>{navigateBack && <BackButton />}</div>
      <div className={styles.rightSide}>
        {onEmailClick && (
          <Button
            icon={<IconEmail strokeWidth={1.5} />}
            type={ButtonTypes.LINK}
            onClick={onEmailClick}
          >
            {EMAIL}
          </Button>
        )}
      </div>
    </div>
  );
};

export default IndividualDetailsHeader;
