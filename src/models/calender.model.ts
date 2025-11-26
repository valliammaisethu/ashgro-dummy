import { list, object, serializable, map } from "serializr";

import { SLOT_STATUS } from "src/enums/calender.enum";
import { DateFormats } from "src/enums/dateFormats.enum";

import {
  createDateSerializer,
  createTimeSerializer,
} from "src/shared/utils/serializers";

const { HH_MM_A, HH_MM, DD_MMM_YYYY, YYYY_MM_DD } = DateFormats;

export class TimeRangeItem {
  @serializable
  startTime?: string;

  @serializable
  endTime?: string;
}
export class CalendarEventsAndSlots {
  @serializable
  id?: string;

  @serializable
  startTime?: string;

  @serializable
  endTime?: string;

  @serializable
  slotType?: string;

  @serializable
  title?: string;

  @serializable
  status?: SLOT_STATUS;

  @serializable
  bookedUserType?: string;

  @serializable
  bookedUserId?: string;

  @serializable
  bookedUserName?: string;
}

export class CalendarData {
  @serializable(map(list(object(CalendarEventsAndSlots))))
  days?: Record<string, CalendarEventsAndSlots[]>;
}

export class BookMeeting extends CalendarEventsAndSlots {
  @serializable
  slotDate?: string;

  @serializable
  clubId?: string;
}

export class TimeRangeSchema {
  @serializable(createTimeSerializer(HH_MM_A, HH_MM))
  startTime?: string;

  @serializable(createTimeSerializer(HH_MM_A, HH_MM))
  endTime?: string;
}

export class ChatbotSlotPayload {
  @serializable
  title?: string;

  @serializable(createDateSerializer(DD_MMM_YYYY, YYYY_MM_DD))
  fromDate?: string;

  @serializable(createDateSerializer(DD_MMM_YYYY, YYYY_MM_DD))
  toDate?: string;

  @serializable(list(object(TimeRangeSchema)))
  timeRanges?: TimeRangeSchema[];
}
