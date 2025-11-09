import { View } from "react-big-calendar";

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
