import React from "react";
import {
  IconCalendarSelectedDate,
  IconCircleForward,
  IconEmail,
} from "obra-icons-react";

import Button from "src/shared/components/Button";
import { ButtonTypes } from "src/enums/buttons.enum";
import { headerConstants } from "../constants";
import { IndividualProspectHeaderProps } from "src/shared/types/prospects.type";
import BackButton from "src/shared/components/Back";

import styles from "../individualProspect.module.scss";

const Header = (props: IndividualProspectHeaderProps) => {
  const { onConvert, onEmail, onBookMeeting, isFetchingProfile } = props;

  return (
    <div className={styles.header}>
      <BackButton />
      <div className={styles.headerRight}>
        <Button
          tooltip={{
            title: headerConstants.bookAMeeting,
          }}
          className={styles.meetingButton}
          onClick={onBookMeeting}
          disabled={isFetchingProfile}
        >
          <IconCalendarSelectedDate />
        </Button>
        <Button
          onClick={onEmail}
          className={styles.emailButton}
          icon={<IconEmail strokeWidth={1.5} />}
          type={ButtonTypes.LINK}
          disabled={isFetchingProfile}
        >
          {headerConstants.sendEmail}
        </Button>
        <Button
          icon={<IconCircleForward strokeWidth={1.5} />}
          className={styles.memberButton}
          type={ButtonTypes.SECONDARY}
          onClick={onConvert}
        >
          {headerConstants.convertToMember}
        </Button>
      </div>
    </div>
  );
};

export default Header;
