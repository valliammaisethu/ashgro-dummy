import React from "react";
import { IconSettings } from "obra-icons-react";

import BackButton from "src/shared/components/Back";
import Button from "src/shared/components/Button";
import { headerConstants } from "../constants";
import { Colors } from "src/enums/colors.enum";
import { ButtonTypes } from "src/enums/buttons.enum";
import { ClubDetailsHeaderProps } from "src/shared/types/clubs.type";

import styles from "../individualClub.module.scss";

const Header: React.FC<ClubDetailsHeaderProps> = ({ onChatbotQuestions }) => {
  return (
    <div className={styles.header}>
      <BackButton />
      <div className={styles.headerRight}>
        <Button
          icon={
            <IconSettings color={Colors.MODAL_CLOSE_ICON} strokeWidth={1.5} />
          }
          className={styles.settingsButton}
        />
        <Button
          onClick={onChatbotQuestions}
          className={styles.chatbotButton}
          type={ButtonTypes.SECONDARY}
        >
          {headerConstants.chatbotQuestions}
        </Button>
      </div>
    </div>
  );
};

export default Header;
