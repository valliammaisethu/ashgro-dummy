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
