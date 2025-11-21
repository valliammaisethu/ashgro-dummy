import { View } from "react-big-calendar";
import { Placement } from "src/enums/placement.enum";
import { Trigger } from "src/enums/trigger.enum";

export const CALENDAR_CONSTANTS = {
  AVAILABLE_SLOTS: "Available slots",
  MORE_SLOTS: "+ %s more",
  BOOK_MEETING: "Book Meeting",
  CHATBOT_SLOT: "Chatbot Slot",
};

export const CALENDAR_CONFIG = {
  startAccessor: "start",
  endAccessor: "end",
  defaultView: "month",
  views: ["month"] as View[],
  popup: true,
  showMultiDayTimes: false,
  eventPropGetter: () => ({
    style: {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      color: "inherit",
      padding: 0,
    },
  }),
} as const;

export const BOOK_MEETING_CONSTANTS = {
  CANCEL_BTN: "Cancel Meeting",
  RESCHEDULE: "Reschedule",
};

export const CALENDER_POPOVER_PROPS = {
  destroyOnHidden: true,
  trigger: Trigger.CLICK,
  arrow: false,
  placement: Placement.BOTTOM,
};

export const MEETING_PREVIEW_POPOVER_PROPS = {
  ...CALENDER_POPOVER_PROPS,
  overlayInnerStyle: {
    padding: 0,
    background: "transparent",
    boxShadow: "none",
    borderRadius: 0,
  },
};
