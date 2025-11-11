import dayjs from "dayjs";

import { DateFormats } from "src/enums/dateFormats.enum";
import { DateUnit } from "src/enums/dateUnit.enum";
import { CalendarEvent } from "src/shared/types/calender";

const { HH_MM_A } = DateFormats;
const { DAY } = DateUnit;

export const getSplitDayEvents = (allEvents: CalendarEvent[], date: Date) => {
  const dayEvents = allEvents.filter((e) => dayjs(e.start).isSame(date, DAY));
  const calendarEvents: CalendarEvent[] = [];
  const chatbotEvents: CalendarEvent[] = [];

  for (const e of dayEvents) {
    (e?.resource?.chatbot ? chatbotEvents : calendarEvents)?.push(e);
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
