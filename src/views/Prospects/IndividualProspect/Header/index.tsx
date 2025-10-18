import {
  IconCalendarSelectedDate,
  IconChevronLeft,
  IconCircleForward,
  IconEmail,
} from "obra-icons-react";
import styles from "../individualProspect.module.scss";
import React from "react";
import Button from "src/shared/components/Button";
import { ButtonTypes } from "src/enums/buttons.enum";
import { headerConstants } from "../constants";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <IconChevronLeft /> <span className={styles.backText}>Back</span>
      </div>
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
        >
          {headerConstants.convertToMember}
        </Button>
      </div>
    </div>
  );
};

export default Header;
