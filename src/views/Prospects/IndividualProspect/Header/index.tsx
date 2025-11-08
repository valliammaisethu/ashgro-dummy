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

import styles from "../individualProspect.module.scss";
import BackButton from "src/shared/components/Back";

const Header = (props: IndividualProspectHeaderProps) => {
  const { onConvert, onEmail } = props;

  return (
    <div className={styles.header}>
      <BackButton />
      <div className={styles.headerRight}>
        <Button
          tooltip={{
            title: headerConstants.bookAMeeting,
          }}
          className={styles.meetingButton}
        >
          <IconCalendarSelectedDate />
        </Button>
        <Button
          onClick={onEmail}
          className={styles.emailButton}
          icon={<IconEmail strokeWidth={1.5} />}
          type={ButtonTypes.LINK}
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
