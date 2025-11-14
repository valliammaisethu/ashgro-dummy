import React, { FC } from "react";
import {
  IconCalendarSelectedDate,
  IconChevronLeft,
  IconChevronRight,
  IconAdd,
} from "obra-icons-react";
import clsx from "clsx";
import { Navigate, NavigateAction } from "react-big-calendar";

import { ToolbarProps } from "src/shared/types/calender";
import Button from "src/shared/components/Button";
import { ButtonTypes } from "src/enums/buttons.enum";
import { CALENDAR_CONSTANTS } from "../constants";

import styles from "./calenderToolbar.module.scss";

const CalendarToolbar: FC<ToolbarProps> = ({
  label,
  onNavigate,
  onBookMeeting,
}) => {
  const handleNavigation = (direction: NavigateAction) => () =>
    onNavigate(direction);

  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.leftSide}>
        <div
          onClick={handleNavigation(Navigate.PREVIOUS)}
          className={styles.navigationBtn}
        >
          <IconChevronLeft />
        </div>

        <p className={styles.monthLabel}>{label}</p>

        <div
          onClick={handleNavigation(Navigate.NEXT)}
          className={styles.navigationBtn}
        >
          <IconChevronRight />
        </div>
      </div>

      <div className={styles.rightSide}>
        <Button
          onClick={onBookMeeting}
          className={clsx(styles.actionBtn, styles.bookingBtn)}
          icon={<IconCalendarSelectedDate strokeWidth={1.5} />}
          type={ButtonTypes.LINK}
        >
          {CALENDAR_CONSTANTS.BOOK_MEETING}
        </Button>
        <Button
          icon={<IconAdd strokeWidth={1.5} />}
          className={styles.actionBtn}
          type={ButtonTypes.SECONDARY}
          onClick={() => {}}
        >
          {CALENDAR_CONSTANTS.CHATBOT_SLOT}
        </Button>
      </div>
    </div>
  );
};

export default CalendarToolbar;
