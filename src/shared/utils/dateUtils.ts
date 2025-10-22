import dayjs from "dayjs";
import { DateFormats } from "src/enums/dateFormats.enum";

export const formatDate = (date: string = "", format: DateFormats) =>
  dayjs(date).format(format);
