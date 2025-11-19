import dayjs from "dayjs";

import { SLOT_STATUS, SLOT_TYPE } from "src/enums/calender.enum";
import { CommonSeparators } from "src/enums/commonSeparators.enum";
import { DateFormats } from "src/enums/dateFormats.enum";
import { DateUnit } from "src/enums/dateUnit.enum";
import { CalendarEventsAndSlots } from "src/models/calender.model";
import { CalendarEvent } from "src/shared/types/calender";

const { HH_MM_A } = DateFormats;
const { DAY } = DateUnit;
const { COLON, DASH } = CommonSeparators;
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

export const isPastDate = (date: Date) => {
  const today = dayjs().startOf(DAY);
  return dayjs(date).startOf(DAY).isBefore(today, DAY);
};

export const mapCalendarDaysToEvents = (
  days?: Record<string, CalendarEventsAndSlots[]>,
) => {
  if (!days) return [];

  const events: CalendarEvent[] = [];

  Object.entries(days).forEach(([date, slots]) => {
    slots?.forEach(
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
        if (!id || !title || !startTime || !endTime || !slotType || !date)
          return;

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
