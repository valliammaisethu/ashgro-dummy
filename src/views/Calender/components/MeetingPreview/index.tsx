import React, { MouseEvent, useState } from "react";
import { Popover } from "antd";
import clsx from "clsx";
import { IconClock4Alt, IconUsers } from "obra-icons-react";

import { MeetingPreviewProps } from "src/shared/types/calender";
import { Placement } from "src/enums/placement.enum";
import { formatTimeRange } from "../../utils/calendarUtils";
import MeetingPopoverContent from "./MeetingPreviewContent";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { Colors } from "src/enums/colors.enum";
import { MEETING_PREVIEW_POPOVER_PROPS } from "../../constants";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { checkDate } from "src/shared/utils/dateUtils";
import { DateType } from "src/enums/dateType.enum";
import BookedChatbotIcon from "../atoms/BookedChatbotIcon";
import TextTooltip from "src/shared/components/atoms/TextTooltip";

import styles from "./meetingPreview.module.scss";
import { SLOT_STATUS } from "src/enums/calender.enum";

const { ASHGRO_GOLD, ASHGRO_GREY } = Colors;

const MeetingPreview: React.FC<MeetingPreviewProps> = ({
  event,
  isMorePopup = false,
  onReschedule,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isPastDate = checkDate(event?.date, DateType.PAST) as boolean;

  const openPopup = (e: MouseEvent) => {
    stopPropagation(e);
    setIsOpen(true);
  };

  const closePopup = (e: MouseEvent, afterAction?: () => void) => {
    stopPropagation(e);
    setIsOpen(false);
    afterAction?.();
    onClose?.();
  };

  const handleRescheduleClick = (e: MouseEvent) =>
    closePopup(e, () => onReschedule?.(event));

  const handleOpenPopup = (e: MouseEvent) => openPopup(e);

  const isBookedThroughBot =
    (event?.resource?.status == SLOT_STATUS.BOOKED &&
      event?.resource?.chatbot) ??
    false;

  return (
    <Popover
      {...MEETING_PREVIEW_POPOVER_PROPS}
      placement={Placement.BOTTOM}
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <ConditionalRenderComponent visible={!isPastDate} hideFallback>
          <MeetingPopoverContent
            event={event}
            onCancel={() => setIsOpen(false)}
            onReschedule={handleRescheduleClick}
            isBookedThroughBot={isBookedThroughBot}
          />
        </ConditionalRenderComponent>
      }
    >
      <div onClick={handleOpenPopup} className={styles.meetingPreviewWrapper}>
        {isMorePopup ? (
          <div>
            <div
              className={clsx(styles.eventTitle, {
                [styles.meetingDetails]: isMorePopup,
              })}
            >
              <IconUsers
                color={isPastDate ? ASHGRO_GREY : ASHGRO_GOLD}
                size={17}
              />
              <TextTooltip
                text={event.title as string}
                className={styles.ellipsisText}
              />
            </div>

            <div
              className={clsx(styles.eventTitle, styles.eventTime, {
                [styles.meetingDetails]: isMorePopup,
              })}
            >
              <IconClock4Alt
                color={isPastDate ? ASHGRO_GREY : ASHGRO_GOLD}
                size={17}
              />
              <p className={styles.timeSlot}>
                {formatTimeRange(event.start, event.end)}

                <BookedChatbotIcon
                  isBooked={isBookedThroughBot}
                  isPastDate={isPastDate}
                />
              </p>
            </div>
          </div>
        ) : (
          <div
            className={clsx(styles.eventCard, styles.bookings, {
              [styles.isPastDate]: isPastDate,
            })}
          >
            <div className={styles.eventTitle}>
              <TextTooltip
                text={event.title as string}
                className={styles.ellipsisText}
              />
            </div>

            <div className={clsx(styles.eventTime, styles.timeSlot)}>
              {formatTimeRange(event.start, event.end)}

              <BookedChatbotIcon
                isBooked={isBookedThroughBot}
                isPastDate={isPastDate}
              />
            </div>
          </div>
        )}
      </div>
    </Popover>
  );
};

export default MeetingPreview;
