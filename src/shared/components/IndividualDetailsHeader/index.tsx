import React from "react";
import { IconChevronLeft, IconEmail } from "obra-icons-react";
import { ConfigProvider } from "antd";

import Button from "src/shared/components/Button";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";
import { ButtonNames } from "./constant";

import styles from "./IndividualDetailsHeader.module.scss";

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
      <div className={styles.leftSide}>
        <ConfigProvider wave={{ disabled: true }}>
          <Button
            className={styles.backBtn}
            disabled={false}
            onClick={navigateBack}
          >
            <IconChevronLeft />
            <span className={styles.backText}>{Buttons.BACK}</span>
          </Button>
        </ConfigProvider>
      </div>
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
