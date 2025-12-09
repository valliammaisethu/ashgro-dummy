import dayjs from "dayjs";
import queryString from "query-string";

import { SLOT_STATUS, SLOT_TYPE } from "src/enums/calender.enum";
import { DateFormats } from "src/enums/dateFormats.enum";
import { DateUnit } from "src/enums/dateUnit.enum";
import { CalendarEventsAndSlots } from "src/models/calender.model";
import { CalendarEvent } from "src/shared/types/calender";
import { BOOK_MEETING_FIELDS } from "../BookMeeting/constants";

const { NAME, SLOT_DATE, MEETING_TIME, TYPE } = BOOK_MEETING_FIELDS;

const { HH_MM_A, YYYY_MM_DD } = DateFormats;
const { DAY } = DateUnit;
const { CHATBOT } = SLOT_TYPE;
const { BOOKED } = SLOT_STATUS;

export const getSplitDayEvents = (allEvents: CalendarEvent[], date: Date) => {
  const dayEvents = allEvents?.filter((e) => dayjs(e?.start).isSame(date, DAY));
  const calendarEvents: CalendarEvent[] = [];
  const chatbotEvents: CalendarEvent[] = [];

  for (const e of dayEvents) {
    const { chatbot, status } = e?.resource || {};

    const isBooked = status === BOOKED;

    if (isBooked || !chatbot) {
      calendarEvents.push(e);
    } else {
      chatbotEvents.push(e);
    }
  }

  return { calendarEvents, chatbotEvents };
};

export const formatTimeRange = (start?: Date | string, end?: Date | string) => {
  const validStart =
    start && dayjs(start).isValid() ? dayjs(start).format(HH_MM_A) : "";
  const validEnd =
    end && dayjs(end).isValid() ? dayjs(end).format(HH_MM_A) : "";

  if (validStart && validEnd) return `${validStart} - ${validEnd}`;
  return validStart || validEnd || "";
};

export const isPastDate = (date: Date | string) => {
  const today = dayjs().startOf(DAY);
  return dayjs(date).startOf(DAY).isBefore(today, DAY);
};

export const mapCalendarDaysToEvents = (
  days?: Record<string, CalendarEventsAndSlots[]>,
) => {
  if (!days || typeof days !== "object") return [];

  const events: CalendarEvent[] = [];

  Object.entries(days).forEach(([date, slots]) => {
    if (!Array.isArray(slots)) return;

    slots.forEach(
      ({
        id,
        title = "",
        startTime,
        endTime,
        slotType,
        status,
        bookedUserName,
        bookedUserType,
        bookedUserId,
      }) => {
        const isNotValid =
          !id ||
          !startTime ||
          !endTime ||
          !slotType ||
          !date ||
          (isPastDate(date) && slotType === CHATBOT && status !== BOOKED);

        if (isNotValid) return;

        events.push({
          id,
          title,
          start: dayjs(`${date} ${startTime}`).toDate(),
          end: dayjs(`${date} ${endTime}`).toDate(),
          resource: {
            chatbot: slotType === CHATBOT,
            status,
            bookedUserName,
            bookedUserType,
            bookedUserId,
          },
        });
      },
    );
  });

  return events;
};

export const updateLocationMonthQuery = (currentQuery: object, date: Date) => {
  const month = dayjs(date).format(DateFormats.YYYY_MM);

  return queryString?.stringify(
    { ...currentQuery, month },
    { skipNull: true, skipEmptyString: true },
  );
};

export const getMeetingDefaultValues = (
  calendarEvent?: CalendarEvent | null,
  selectedDate?: Date | null,
) => {
  const {
    id,
    title = "",
    start = "",
    end = "",
    date = "",
    resource = {},
  } = calendarEvent || {};
  const {
    bookedUserType = "",
    bookedUserId = "",
    bookedUserName = "",
  } = resource;

  // For new bookings, default to today's date if no date is provided
  const defaultDate = selectedDate ?? new Date();

  return {
    title: calendarEvent?.id ? String(title) : "",
    [TYPE.name]: bookedUserType,
    [NAME.name]: bookedUserId,
    [SLOT_DATE.name]: id
      ? dayjs(date).format(YYYY_MM_DD)
      : dayjs(defaultDate).format(YYYY_MM_DD),
    [MEETING_TIME.name]: {
      startTime: id ? dayjs(start).format(HH_MM_A) : "",
      endTime: id ? dayjs(end).format(HH_MM_A) : "",
    },
  };
};
