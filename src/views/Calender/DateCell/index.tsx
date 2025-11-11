import React, { useState } from "react";
import clsx from "clsx";
import { Switch, Popover } from "antd";

import { replaceString } from "src/shared/utils/commonHelpers";
import { CALENDAR_CONSTANTS } from "../constants";
import { ButtonSizes } from "src/enums/buttons.enum";
import { formatTimeRange, getSplitDayEvents } from "../utils/calendarUtils";
import EventsPopover from "../components/EventsPopover";
import { Trigger } from "src/enums/trigger.enum";
import { Placement } from "src/enums/placement.enum";
import { DateCellProps } from "src/shared/types/calender";

import styles from "./dateCell.module.scss";
import dayjs from "dayjs";

const DateCell: React.FC<DateCellProps> = ({ label, date, allEvents }) => {
  const [isChatbotView, setIsChatbotView] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { calendarEvents, chatbotEvents } = getSplitDayEvents(allEvents, date);
  const displayEvents = isChatbotView ? chatbotEvents : calendarEvents;
  const maxVisible = isChatbotView ? 3 : 2;
  const visibleEvents = displayEvents.slice(0, maxVisible);
  const hasMore = displayEvents.length > maxVisible;

  const handlePopoverVisibility = () => setIsPopoverOpen((prev) => !prev);

  //  Need to handle old days and bookins and chatbot slots

  return (
    <div className={styles.cellContent}>
      <div className={styles.cellHeader}>
        <span className={styles.dateLabel}>{dayjs(date).date()}</span>

        {!!chatbotEvents?.length && (
          <div className={styles.switchWrapper}>
            <span className={styles.switchLabel}>
              {CALENDAR_CONSTANTS.AVAILABLE_SLOTS}
            </span>
            <Switch
              size={ButtonSizes.SMALL}
              checked={isChatbotView}
              onChange={setIsChatbotView}
              rootClassName={styles.toggleChatbot}
            />
          </div>
        )}
      </div>

      <div className={styles.eventList}>
        {visibleEvents?.map((event) => (
          <div
            key={event.id}
            className={clsx(styles.eventCard, {
              [styles.bookings]: !isChatbotView,
            })}
          >
            {!isChatbotView && (
              <div className={styles.eventTitle}>{event.title}</div>
            )}
            <div
              className={clsx(styles.eventTime, {
                [styles.chatbotSlotTime]: isChatbotView,
              })}
            >
              {formatTimeRange(event.start, event.end)}
            </div>
          </div>
        ))}

        {hasMore && (
          <Popover
            content={
              <EventsPopover
                date={date}
                displayEvents={displayEvents}
                onClose={handlePopoverVisibility}
              />
            }
            trigger={Trigger.CLICK}
            open={isPopoverOpen}
            onOpenChange={handlePopoverVisibility}
            placement={Placement.BOTTOM}
            classNames={{
              root: styles.eventsPopover,
            }}
            showArrow={false}
          >
            <div
              className={clsx(styles.moreBtn, {
                [styles.isChatbotView]: isChatbotView,
              })}
            >
              {replaceString(
                CALENDAR_CONSTANTS.MORE_SLOTS,
                String(displayEvents?.length - maxVisible),
              )}
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default DateCell;
