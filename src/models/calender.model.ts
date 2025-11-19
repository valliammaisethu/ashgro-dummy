import { list, object, serializable, map } from "serializr";
import { SLOT_STATUS } from "src/enums/calender.enum";

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
