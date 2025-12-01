import React from "react";
import { IconSettings } from "obra-icons-react";

import BackButton from "src/shared/components/Back";
import Button from "src/shared/components/Button";
import { headerConstants } from "../constants";
import { Colors } from "src/enums/colors.enum";
import { ButtonTypes } from "src/enums/buttons.enum";
import { ClubDetailsHeaderProps } from "src/shared/types/clubs.type";

import styles from "../individualClub.module.scss";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

const Header: React.FC<ClubDetailsHeaderProps> = ({
  isFetching,
  onChatbotQuestions,
  onSettings,
}) => {
  return (
    <ConditionalRenderComponent hideFallback visible={!isFetching}>
      <div className={styles.header}>
        <BackButton />
        <div className={styles.headerRight}>
          <Button
            onClick={onSettings}
            icon={
              <IconSettings color={Colors.MODAL_CLOSE_ICON} strokeWidth={1.5} />
            }
            className={styles.settingsButton}
          />
          <Button
            onClick={onChatbotQuestions}
            className={styles.chatbotButton}
            type={ButtonTypes.LINK}
          >
            {headerConstants.chatbotQuestions}
          </Button>
        </div>
      </div>
    </ConditionalRenderComponent>
  );
};

export default Header;
