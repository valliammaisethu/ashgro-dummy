import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DateFormats } from "src/enums/dateFormats.enum";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date = "", format: DateFormats, isUTC = false) => {
  return isUTC
    ? dayjs.utc(date).local().format(format)
    : dayjs(date).format(format);
};
