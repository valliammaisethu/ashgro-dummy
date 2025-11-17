import React from "react";
import { IconCalendarDates, IconClock4Alt, IconClose } from "obra-icons-react";
import dayjs from "dayjs";

import { Colors } from "src/enums/colors.enum";
import { BOOK_MEETING_CONSTANTS } from "../../constants";
import { ButtonTypes } from "src/enums/buttons.enum";
import { DateFormats } from "src/enums/dateFormats.enum";
import { MeetingPopoverContentProps } from "src/shared/types/calender";
import Button from "src/shared/components/Button";

import styles from "./meetingPreview.module.scss";

const { CANCEL_BTN, RESCHEDULE } = BOOK_MEETING_CONSTANTS;
const { HH_MM_A, DDD_MMM_DO } = DateFormats;

const MeetingPopoverContent: React.FC<MeetingPopoverContentProps> = ({
  event,
  onCancel,
  onReschedule,
}) => {
  return (
    <div className={styles.meetingPreviewCard}>
      <div className={styles.header}>
        <p className={styles.name}>Hello</p>
        <IconClose onClick={onCancel} />
      </div>

      <div className={styles.details}>
        <p className={styles.title}>{event.title}</p>
        <div className={styles.timeDetailsContainer}>
          <div className={styles.timeDetails}>
            <IconCalendarDates
              strokeWidth={1}
              size={20}
              color={Colors.ASHGRO_GOLD}
            />
            <p className={styles.meetingDetailsLabel}>
              {dayjs(event.date).format(DDD_MMM_DO)}
            </p>
          </div>
          <div className={styles.timeDetails}>
            <IconClock4Alt
              strokeWidth={1}
              size={20}
              color={Colors.ASHGRO_GOLD}
            />
            <p className={styles.meetingDetailsLabel}>
              {dayjs(event.start).format(HH_MM_A)} –
              {dayjs(event.end).format(HH_MM_A)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          type={ButtonTypes.LINK}
          className={styles.actionBtn}
          onClick={onCancel}
        >
          {CANCEL_BTN}
        </Button>
        <Button
          type={ButtonTypes.SECONDARY}
          className={styles.actionBtn}
          onClick={onReschedule}
        >
          {RESCHEDULE}
        </Button>
      </div>
    </div>
  );
};

export default MeetingPopoverContent;
