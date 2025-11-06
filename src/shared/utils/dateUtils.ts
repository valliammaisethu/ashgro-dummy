import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DateFormats } from "src/enums/dateFormats.enum";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date = "", format: DateFormats, isUTC = false) => {
  if (!date) return "";
  return isUTC
    ? dayjs.utc(date).local().format(format)
    : dayjs(date).format(format);
};

export const disableFutureAndToday = (date: dayjs.Dayjs) =>
  date.isAfter(dayjs().subtract(1, "day"));

/**
 * Converts date from display format (DD MMM, YYYY) to API format (YYYY-MM-DD)
 * @param date - Date string in DD MMM, YYYY format
 * @returns Date string in YYYY-MM-DD format or undefined if date is not provided
 */
export const convertDateToApiFormat = (date: string | undefined) => {
  if (!date) return date;
  const parsed = dayjs(date, DateFormats.DD_MMM__YYYY, true);
  return parsed.isValid() ? parsed.format(DateFormats.YYYY_MM_DD) : date;
};

/**
 * Converts date from API format (YYYY-MM-DD) to display format (DD MMM, YYYY)
 * @param date - Date string in YYYY-MM-DD format
 * @returns Date string in DD MMM, YYYY format or undefined if date is not provided
 */
export const convertDateToDisplayFormat = (date: string | undefined) => {
  if (!date) return date;
  const parsed = dayjs(date, DateFormats.YYYY_MM_DD, true);
  return parsed.isValid() ? parsed.format(DateFormats.DD_MMM__YYYY) : date;
};
