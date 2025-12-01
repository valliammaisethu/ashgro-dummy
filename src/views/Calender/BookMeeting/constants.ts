export const BOOK_MEETING_FIELDS = {
  TITLE: {
    name: "title",
    label: "Title",
    placeholder: "Enter Title",
  },
  TYPE: {
    name: "bookedUserType",
    label: "Book For",
    options: [
      { label: "Member", value: "member" },
      { label: "Prospect", value: "prospect" },
    ],
  },
  NAME: {
    name: "name",
    label: "Name",
    placeholder: "Select Member’s Name",
  },
  SLOT_DATE: {
    name: "slotDate",
    label: "Meeting Date",
    placeholder: "Select meeting date",
  },
  MEETING_TIME: {
    name: "meetingTime",
    label: "Meeting Start & End Time",
    placeholder: ["Start time", "End time"] as const,
  },
  USER: {
    USER_ID: "bookedUserId",
    USER_NAME: "bookedUserName",
  },
};

export const BOOK_MEETING_META = {
  RESCHEDULE_MEETING: "Reschedule Meeting",
  BOOK_MEETING: "Book Meeting",
  RESCHEDULE_NOW: "Reschedule Now",
};

export const BOOK_MEETING_VALIDATION = {
  TITLE_REQUIRED: "Title is required",
  TYPE_REQUIRED: "Please select Book For",
  NAME_REQUIRED: "Please select a name",
  DATE_REQUIRED: "Meeting date is required",
  TIME_REQUIRED: "Meeting time is required",
  TIME_INVALID_RANGE: "End time must be later than start time",
};
