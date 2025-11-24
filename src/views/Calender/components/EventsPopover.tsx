import React from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { IconCircleClose } from "obra-icons-react";

import { formatTimeRange } from "../utils/calendarUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import { CalendarEvent, EventsPopoverProps } from "src/shared/types/calender";
import MeetingPreview from "./MeetingPreview";
import { SLOT_STATUS } from "src/enums/calender.enum";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

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
            <ConditionalRenderComponent
              visible={
                !event?.resource?.chatbot ||
                event?.resource?.status === SLOT_STATUS.BOOKED
              }
              fallback={
                <div className={clsx(styles.eventTitle, styles.chatbotTime)}>
                  <p>{formatTimeRange(event.start, event.end)}</p>
                </div>
              }
            >
              <MeetingPreview
                event={{ ...event, date }}
                onReschedule={handleReschedule({ ...event, date })}
                isMorePopup
              />
            </ConditionalRenderComponent>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPopover;
