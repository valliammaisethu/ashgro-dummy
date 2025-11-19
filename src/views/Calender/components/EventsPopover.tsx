import React from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { IconCircleClose } from "obra-icons-react";

import { formatTimeRange } from "../utils/calendarUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import { CalendarEvent, EventsPopoverProps } from "src/shared/types/calender";
import MeetingPreview from "./MeetingPreview";

import styles from "../DateCell/dateCell.module.scss";

const EventsPopover: React.FC<EventsPopoverProps> = ({
  date,
  displayEvents = [],
  onClose,
  onRescheduleEvent,
}) => {
  const handleReschedule = (event: CalendarEvent) => () => {
    onRescheduleEvent(event);
    onClose();
  };

  return (
    <div className={styles.popoverContent}>
      <div className={styles.popoverHeader}>
        <span>{dayjs(date).format(DateFormats.DDD_MMM_DO)}</span>
        <div className={styles.closeBtn} onClick={onClose}>
          <IconCircleClose />
        </div>
      </div>

      <div className={styles.popoverEventsScroll}>
        {displayEvents?.map((event) => (
          <div key={event.id} className={styles.popoverEvent}>
            {!event?.resource?.chatbot ? (
              <MeetingPreview
                event={{ ...event, date }}
                onReschedule={handleReschedule({ ...event, date })}
                isMorePopup
              />
            ) : (
              <div className={clsx(styles.eventTitle, styles.chatbotTime)}>
                <p>{formatTimeRange(event.start, event.end)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPopover;
