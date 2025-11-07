import React from "react";
import {
  IconCalendarSelectedDate,
  IconCircleForward,
  IconEmail,
} from "obra-icons-react";

import Button from "src/shared/components/Button";
import BackButton from "src/shared/components/BackButton";
import { ButtonTypes } from "src/enums/buttons.enum";
import { headerConstants } from "../constants";
import useRedirect from "src/shared/hooks/useRedirect";
import { IndividualProspectHeaderProps } from "src/shared/types/prospects.type";

import styles from "../individualProspect.module.scss";

const Header = (props: IndividualProspectHeaderProps) => {
  const { onConvert, onEmail } = props;
  const { navigateToProspects } = useRedirect();
  return (
    <div className={styles.header}>
      <BackButton onClick={navigateToProspects} />
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
