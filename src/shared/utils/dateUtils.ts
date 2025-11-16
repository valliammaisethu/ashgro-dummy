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

export const convertDateToApiFormat = (
  date: string | undefined,
  format: DateFormats = DateFormats.DD_MMM_YYYY,
) => {
  if (!date) return date;
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
