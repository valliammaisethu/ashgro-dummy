import React from "react";
import { IconCalendarSelectedDate, IconEmail } from "obra-icons-react";

import Button from "src/shared/components/Button";
import BackButton from "../Back";
import { headerConstants } from "src/views/Prospects/IndividualProspect/constants";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";

import styles from "./IndividualDetailsHeader.module.scss";

interface IndividualDetailsHeaderProps {
  navigateBack?: () => void;
  onEmailClick?: () => void;
  isPending?: boolean;
  onBookMeeting?: () => void;
}

const IndividualDetailsHeader = ({
  navigateBack,
  onEmailClick,
  isPending,
  onBookMeeting,
}: IndividualDetailsHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftSide}>{navigateBack && <BackButton />}</div>
      <div className={styles.rightSide}>
        {onBookMeeting && (
          <Button
            tooltip={{
              title: headerConstants.bookAMeeting,
            }}
            className={styles.meetingButton}
            onClick={onBookMeeting}
          >
            <IconCalendarSelectedDate />
          </Button>
        )}
        {onEmailClick && (
          <Button
            icon={<IconEmail strokeWidth={1.5} />}
            type={ButtonTypes.LINK}
            onClick={onEmailClick}
            className={styles.emailButton}
            disabled={isPending}
          >
            {Buttons.SEND_EMAIL}
          </Button>
        )}
      </div>
    </div>
  );
};

export default IndividualDetailsHeader;
