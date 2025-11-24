export const FIELD_NAME = {
  TIME_RANGES: "timeRanges",
  FROM_DATE: "fromDate",
  TO_DATE: "toDate",
} as const;

export const PLACEHOLDERS = {
  DATE_FROM: "From Date",
  DATE_TO: "To Date",
  TIMERANGE_START: "Start time",
  TIMERANGE_END: "End time",
};

export const defaultTimeRange = { startTime: "", endTime: "" };

export const LABELS = {
  FROM_DATE_LABEL: "From",
  TO_DATE_LABEL: "To",
};

export const CHAT_BOT_CONSTANTS = {
  TITLE: "Chatbot Slot",
  DATE_RANGE: "Date Range",
  TIME_RANGE: "Time Range",
  START_AND_END_TIME: "Start & End Time",
  ADD_BTN: "Add",
};

export const POINTER_CONSTANTS = {
  NOT_ALLOWED: "not-allowed",
  POINTER: "pointer",
};

export const defaultSlotWidth = 504;
