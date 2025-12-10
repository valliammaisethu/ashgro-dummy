import React, { useState } from "react";
import clsx from "clsx";
import { Switch, Popover } from "antd";
import dayjs from "dayjs";
import { IconDelete, IconEdit } from "obra-icons-react";
import queryString from "query-string";

import { replaceString } from "src/shared/utils/commonHelpers";
import {
  CALENDAR_CONSTANTS,
  CALENDER_POPOVER_PROPS,
  DELETE_CHATBOT_SLOTS_MODAL_PROPS,
} from "../constants";
import { ButtonSizes } from "src/enums/buttons.enum";
import { formatTimeRange, getSplitDayEvents } from "../utils/calendarUtils";
import EventsPopover from "../components/EventsPopover";
import ChatbotSlot from "../ChatbotSlot";
import {
  BookingFormState,
  CalendarEvent,
  DateCellProps,
} from "src/shared/types/calender";
import MeetingPreview from "../components/MeetingPreview";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import BookMeeting from "../BookMeeting";
import { checkDate } from "src/shared/utils/dateUtils";
import { DateType } from "src/enums/dateType.enum";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { Colors } from "src/enums/colors.enum";
import { useMutation } from "@tanstack/react-query";
import { CommonService } from "src/services/CommonService.ts/common.service";
import { responseHandlers } from "src/shared/utils/responseHandlers";
import { generatePath } from "react-router-dom";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import DeleteModal from "src/shared/components/DeleteModal";
import { DateFormats } from "src/enums/dateFormats.enum";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";

import styles from "./dateCell.module.scss";

const { CHAT_BOT_SLOTS } = ApiRoutes;
const { YYYY_MM_DD } = DateFormats;

const DateCell: React.FC<DateCellProps> = ({ date, allEvents = [] }) => {
  const [isChatbotView, setIsChatbotView] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isChatbotSlotOpen, setIsChatbotSlotOpen] = useState(false);
  const [bookingState, setBookingState] = useState<BookingFormState>({
    visible: false,
    selectedDate: null,
    selectedEvent: null,
  });

  const { deleteResource } = CommonService();
  const { refetchCalender } = responseHandlers();
  const { mutateAsync: deleteSlot, isPending: isDeleting } =
    useMutation(deleteResource());

  const { calendarEvents, chatbotEvents } = getSplitDayEvents(allEvents, date);

  const isChatbotSelected = isChatbotView || calendarEvents?.length === 0;

  const displayEvents = isChatbotSelected ? chatbotEvents : calendarEvents;

  const maxVisible = isChatbotView ? 3 : calendarEvents?.length ? 2 : 3;
  const visibleEvents = displayEvents.slice(0, maxVisible);
  const hasMore = displayEvents.length > maxVisible;
  const isPastDate = checkDate(date, DateType.PAST) as boolean;

  const handlePopoverVisibility = () => setIsPopoverOpen((prev) => !prev);

  const handleChatbotSlotOpen = () => setIsChatbotSlotOpen(true);

  const handleChatbotSlotClose = () => setIsChatbotSlotOpen(false);

  const handleRescheduleClick = (meeting: CalendarEvent) => {
    setBookingState((prev) => ({
      ...prev,
      visible: true,
      selectedEvent: meeting,
    }));
  };

  const handleSelectDate = () => {
    if (isPastDate || displayEvents?.length) return;

    setBookingState((prev) => ({
      ...prev,
      visible: true,
      selectedDate: date,
    }));
  };

  const closeBooking = () =>
    setBookingState({
      visible: false,
      selectedDate: null,
      selectedEvent: null,
    });

  const handleConfirmDelete = async () => {
    const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

    if (!clubId || !date) return;
    const path = queryString?.stringifyUrl({
      url: generatePath(CHAT_BOT_SLOTS),
      query: { clubId, date: dayjs(date).format(YYYY_MM_DD) },
    });

    await deleteSlot(
      { path, useCustomToast: true },
      {
        onSuccess: (response) =>
          refetchCalender({ response, slotDate: date.toString() }),
      },
    );
  };

  return (
    <>
      <div
        className={clsx(styles.cellContent, {
          [styles.allowedDates]: !isPastDate,
        })}
        onClick={handleSelectDate}
      >
        <div className={styles.cellHeader}>
          <span className={styles.dateLabel}>{dayjs(date).date()}</span>

          <ConditionalRenderComponent
            visible={!!chatbotEvents?.length && !!calendarEvents?.length}
            hideFallback
          >
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
          </ConditionalRenderComponent>
        </div>

        <div className={styles.eventList}>
          {visibleEvents?.map((event) => (
            <ConditionalRenderComponent
              key={event?.id}
              visible={!isChatbotSelected}
              fallback={
                <div className={styles.chatBotTime}>
                  {formatTimeRange(event.start, event.end)}
                </div>
              }
            >
              <MeetingPreview
                isPastDate={isPastDate}
                event={{ ...event, date }}
                onReschedule={handleRescheduleClick}
              />
            </ConditionalRenderComponent>
          ))}

          {hasMore && (
            <Popover
              {...CALENDER_POPOVER_PROPS}
              open={isPopoverOpen}
              onOpenChange={handlePopoverVisibility}
              classNames={{
                root: styles.eventsPopover,
              }}
              content={
                <EventsPopover
                  date={date}
                  displayEvents={displayEvents}
                  onClose={handlePopoverVisibility}
                  onRescheduleEvent={handleRescheduleClick}
                />
              }
            >
              <div
                className={clsx(styles.moreBtn, {
                  [styles.isChatbotView]: isChatbotSelected,
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

        <ConditionalRenderComponent
          visible={isChatbotSelected && !!displayEvents?.length}
          hideFallback
        >
          <div className={styles.actionBtns}>
            <IconEdit
              size={17}
              color={Colors.MODAL_CLOSE_ICON}
              className={styles.icon}
              onClick={handleChatbotSlotOpen}
            />
            <DeleteModal
              {...DELETE_CHATBOT_SLOTS_MODAL_PROPS}
              onDelete={handleConfirmDelete}
              loading={isDeleting}
            >
              <IconDelete
                size={17}
                color={Colors.ERROR_NOTIFICATION}
                className={styles.icon}
              />
            </DeleteModal>
          </div>
        </ConditionalRenderComponent>
      </div>
      <ConditionalRenderComponent visible={bookingState.visible} hideFallback>
        <div onClick={stopPropagation}>
          <BookMeeting
            isOpen={bookingState.visible}
            selectedDate={bookingState.selectedDate}
            calendarEvent={bookingState?.selectedEvent}
            onClose={closeBooking}
          />
        </div>
      </ConditionalRenderComponent>

      <ChatbotSlot
        isOpen={isChatbotSlotOpen}
        onClose={handleChatbotSlotClose}
        selectedDate={date?.toString()}
        availableSlots={chatbotEvents}
      />
    </>
  );
};

export default DateCell;
