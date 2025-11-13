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

import styles from "./meetingPreview.module.scss";

const MeetingPreview: React.FC<MeetingPreviewProps> = ({
  event,
  isMorePopup = false,
  isPastDate,
  onCancel,
  onReschedule,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleCancelClick = (e: MouseEvent) => closePopup(e, onCancel);

  const handleRescheduleClick = (e: MouseEvent) =>
    closePopup(e, () => onReschedule?.(event));

  const handleOpenPopup = (e: MouseEvent) => openPopup(e);

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
            onCancel={handleCancelClick}
            onReschedule={handleRescheduleClick}
          />
        </ConditionalRenderComponent>
      }
    >
      <div onClick={handleOpenPopup}>
        {isMorePopup ? (
          <div>
            <div
              className={clsx(styles.eventTitle, {
                [styles.meetingDetails]: isMorePopup,
              })}
            >
              <IconUsers color={Colors.ASHGRO_GOLD} size={17} />
              <p>{event.title}</p>
            </div>

            <div
              className={clsx(styles.eventTitle, styles.eventTime, {
                [styles.meetingDetails]: isMorePopup,
              })}
            >
              <IconClock4Alt color={Colors.ASHGRO_GOLD} size={17} />
              <p>{formatTimeRange(event.start, event.end)}</p>
            </div>
          </div>
        ) : (
          <div
            className={clsx(styles.eventCard, styles.bookings, {
              [styles.isPastDate]: isPastDate,
            })}
          >
            <div className={styles.eventTitle}>{event.title}</div>
            <div className={clsx(styles.eventTime)}>
              {formatTimeRange(event.start, event.end)}
            </div>
          </div>
        )}
      </div>
    </Popover>
  );
};

export default MeetingPreview;
