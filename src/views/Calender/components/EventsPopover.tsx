import React from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { IconCircleClose } from "obra-icons-react";

import { formatTimeRange } from "../utils/calendarUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import { EventsPopoverProps } from "src/shared/types/calender";
import MeetingPreview from "./MeetingPreview";

import styles from "../DateCell/dateCell.module.scss";

const EventsPopover: React.FC<EventsPopoverProps> = ({
  date,
  displayEvents = [],
  onClose,
}) => {
  //TODO: need to handle past days here

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
              <>
                <MeetingPreview
                  event={{ ...event, date }}
                  onReschedule={() => {}}
                  isMorePopup
                />
              </>
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
