import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DateFormats } from "src/enums/dateFormats.enum";
import { DateUnit } from "src/enums/dateUnit.enum";
import { DateType } from "src/enums/dateType.enum";
import { isDateOutOfRangeProps } from "../types/dashboard.type";

dayjs.extend(utc);
dayjs.extend(timezone);

const { DAY } = DateUnit;
const { FUTURE, PAST, TODAY } = DateType;
const { HH_MM_A, HH_MM, DD_MMM__YYYY, YYYY_MM_DD } = DateFormats;

export const formatDate = (date = "", format: DateFormats, isUTC = false) => {
  if (!date) return "";
  return isUTC
    ? dayjs.utc(date).local().format(format)
    : dayjs(date).format(format);
};

export const formatDateTime = (date = "", format: DateFormats) =>
  dayjs.utc(date).format(format);

export const disableFutureAndToday = (date: dayjs.Dayjs) =>
  date.isAfter(dayjs().subtract(1, "day"));

export const disableFuture = (date: dayjs.Dayjs) => date.isAfter(dayjs());

export const convertDateToApiFormat = (
  date: string | undefined,
  format: DateFormats = DateFormats.DD_MMM_YYYY,
) => {
  if (!date) return;
  const parsed = dayjs(date, format, true);
  return parsed.isValid() ? parsed.format(DateFormats.YYYY_MM_DD) : date;
};

export const convertDateToDisplayFormat = (
  date = "",
  format: DateFormats = DateFormats.DD_MMM_YYYY,
) => {
  if (!date) return date;
  const parsed = dayjs(date, DateFormats.YYYY_MM_DD, true);
  return parsed.isValid() ? parsed.format(format) : date;
};

export const parseTimeRangeValue = (
  value?: string[],
  format: string = DateFormats.HH_MM_A,
): [Dayjs | null, Dayjs | null] => {
  const start = value?.[0] ? dayjs(value[0], format, true) : null;
  const end = value?.[1] ? dayjs(value[1], format, true) : null;

  return [start, end];
};

export const checkDate = (date?: string | Date | Dayjs, type?: DateType) => {
  const today = dayjs().startOf(DAY);
  const target = dayjs(date).startOf(DAY);

  switch (type) {
    case TODAY:
      return target.isSame(today, DAY);

    case PAST:
      return target.isBefore(today, DAY);

    case FUTURE:
      return target.isAfter(today, DAY);

    default:
      return {
        isToday: target.isSame(today, DAY),
        isPast: target.isBefore(today, DAY),
        isFuture: target.isAfter(today, DAY),
      };
  }
};

export const disablePastDates = (date: dayjs.Dayjs) =>
  date.isBefore(dayjs().startOf(DAY));

export const convertTo24hrs = (time12h: string) =>
  dayjs(time12h, HH_MM_A).format(HH_MM);

export const disablePastAndFuture180 = (date: dayjs.Dayjs) => {
  const today = dayjs().startOf(DAY);
  const maxDate = today.add(180, DAY);

  return date.isBefore(today) || date.isAfter(maxDate);
};

export const isDateOutOfRange = ({
  current,
  futureDate,
  maxDays = 180,
}: isDateOutOfRangeProps) => {
  if (!futureDate) return false;
  const diff = current.diff(futureDate, DAY);
  return Math.abs(diff) > maxDays;
};

export const formatDateValue = (
  date?: string | Date | Dayjs | null,
  format: DateFormats = DD_MMM__YYYY,
  isApi = false,
) => {
  if (!date) return "";

  const validatedDate = dayjs(date, isApi ? format : YYYY_MM_DD, true);

  const parsed = validatedDate.isValid() ? validatedDate : dayjs(date);

  return parsed.isValid() ? parsed.format(isApi ? YYYY_MM_DD : format) : "";
};
