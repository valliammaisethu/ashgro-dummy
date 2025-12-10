import * as Yup from "yup";
import dayjs from "dayjs";

import { DateFormats } from "src/enums/dateFormats.enum";
import { DateUnit } from "src/enums/dateUnit.enum";

const MAX_DAYS_RANGE = 180;

export const VALIDATION_MESSAGE = {
  REQUIRED_FROM_DATE: "From date is required",
  REQUIRED_TO_DATE: "To date is required",

  MAX_RANGE: "Date must be within 180 days",
  FROM_BEFORE_TO: "From date must be before To date",
  TO_AFTER_FROM: "To date must be after From date",

  REQUIRED_START_TIME: "Start time is required",
  REQUIRED_END_TIME: "End time is required",
  END_AFTER_START: "End time must be later than start time",

  MIN_TIME_RANGE: "At least one time range is required",

  START_AND_END_REQUIRED: "Start and end time are required",
  MAX_SLOTS_ALLOWED: "Maximum 10 slots allowed",
};

export const VALIDATION_CONDITIONS = {
  MAX_180_DAYS: "max-180-days",
  BEFORE_TO_DATE: "before-to-date",
  AFTER_FROM_DATE: "after-from",
  IS_AFTER_START: "is-after-start",
  MAX_RANGE: "max-range",
};

const toMinutes = (time: string) => {
  const parsed = dayjs(time, DateFormats.HH_MM_A);
  return parsed.hour() * 60 + parsed.minute();
};

export const timeRangeSchema = Yup.object({
  startTime: Yup.string().required(VALIDATION_MESSAGE.REQUIRED_START_TIME),

  endTime: Yup.string()
    .required(VALIDATION_MESSAGE.REQUIRED_END_TIME)
    .test(
      VALIDATION_CONDITIONS.IS_AFTER_START,
      VALIDATION_MESSAGE.END_AFTER_START,
      function (endTime) {
        const { startTime } = this.parent;
        if (!startTime || !endTime) return true;
        return toMinutes(endTime) > toMinutes(startTime);
      },
    ),
}).test(
  "is-complete",
  VALIDATION_MESSAGE.START_AND_END_REQUIRED,
  (value) => !!(value?.startTime && value?.endTime),
);

export const chatbotSlotSchema = Yup.object({
  fromDate: Yup.string()
    .required(VALIDATION_MESSAGE.REQUIRED_FROM_DATE)
    .test(
      VALIDATION_CONDITIONS.MAX_180_DAYS,
      VALIDATION_MESSAGE.MAX_RANGE,
      (date) => dayjs(date).diff(dayjs(), DateUnit.DAY) <= MAX_DAYS_RANGE,
    )
    .test(
      VALIDATION_CONDITIONS.BEFORE_TO_DATE,
      VALIDATION_MESSAGE.FROM_BEFORE_TO,
      function (fromDate) {
        const { toDate } = this.parent;
        if (!fromDate || !toDate) return true;
        return (
          dayjs(fromDate).isSame(dayjs(toDate)) ||
          dayjs(fromDate).isBefore(dayjs(toDate))
        );
      },
    ),

  toDate: Yup.string()
    .required(VALIDATION_MESSAGE.REQUIRED_TO_DATE)
    .test(
      VALIDATION_CONDITIONS.AFTER_FROM_DATE,
      VALIDATION_MESSAGE.TO_AFTER_FROM,
      function (toDate) {
        const { fromDate } = this.parent;
        if (!toDate || !fromDate) return true;
        return (
          dayjs(toDate).isSame(dayjs(fromDate)) ||
          dayjs(toDate).isAfter(dayjs(fromDate))
        );
      },
    )
    .test(
      VALIDATION_CONDITIONS.MAX_RANGE,
      VALIDATION_MESSAGE.MAX_RANGE,
      (date) => dayjs(date).diff(dayjs(), DateUnit.DAY) <= MAX_DAYS_RANGE,
    ),

  timeRanges: Yup.array()
    .of(timeRangeSchema)
    .min(1, VALIDATION_MESSAGE.MIN_TIME_RANGE)
    .max(10, VALIDATION_MESSAGE.MAX_SLOTS_ALLOWED),
});
