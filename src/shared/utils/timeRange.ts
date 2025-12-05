import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { deserialize } from "serializr";

dayjs.extend(customParseFormat);

import { DateFormats } from "src/enums/dateFormats.enum";
import { ChatbotSlotPayload, TimeRangeItem } from "src/models/calender.model";
import {
  CalendarEvent,
  DisableTimeRange,
  GetOccupiedRangesParams,
  OccupiedRange,
  OverlapTimeRange,
} from "../types/calender";
import { defaultTimeRange } from "src/views/Calender/ChatbotSlot/constants";

const { HH_MM_A, YYYY_MM_DD, HH_MM } = DateFormats;

export const hasOverlap = ({
  startMinutes,
  endMinutes,
  disabledRanges = [],
}: OverlapTimeRange) => {
  return disabledRanges?.some(({ start, end }) => {
    return startMinutes < end && endMinutes > start;
  });
};

export const rangeInclusive = (
  startValue: number,
  endValue: number,
): number[] => {
  if (startValue > endValue) return [];
  return [startValue, ...rangeInclusive(startValue + 1, endValue)];
};

export const disabledTime = ({
  current,
  disabledRanges = [],
}: DisableTimeRange) => {
  if (!current || disabledRanges.length === 0)
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
    };

  const disabledHoursSet = new Set<number>();
  const disabledMinutes: number[] = [];

  disabledRanges?.forEach(({ start, end }) => {
    rangeInclusive((start / 60) | 0, ((end - 1) / 60) | 0)?.forEach((h) =>
      disabledHoursSet.add(h),
    );
  });

  disabledRanges.forEach(({ start, end }) => {
    rangeInclusive(0, 59)?.forEach((min) => {
      const total = current?.hour() * 60 + min;
      if (total >= start && total < end) {
        disabledMinutes.push(min);
      }
    });
  });

  return {
    disabledHours: () => [...disabledHoursSet],
    disabledMinutes: () => disabledMinutes,
  };
};

export const getOccupiedRangesForIndex = ({
  timeRanges = [],
  currentIndex,
  format = HH_MM_A,
}: GetOccupiedRangesParams) => {
  return timeRanges
    ?.map((range, index) => {
      if (index === currentIndex || !range.startTime || !range.endTime) {
        return null;
      }

      const start = dayjs(range.startTime, format);
      const end = dayjs(range.endTime, format);

      return {
        start: start.hour() * 60 + start.minute(),
        end: end.hour() * 60 + end.minute(),
      };
    })
    .filter(Boolean) as OccupiedRange[];
};
export const initialChatbotSlots = (
  selectedDate?: string,
  timeRanges?: (TimeRangeItem | CalendarEvent)[],
) => {
  const formattedDate = selectedDate
    ? dayjs(selectedDate).format(YYYY_MM_DD)
    : undefined;

  const formattedTimeRanges = timeRanges?.length
    ? timeRanges?.map((range) =>
        "start" in range
          ? {
              startTime: dayjs(range.start).format(HH_MM),
              endTime: dayjs(range.end).format(HH_MM),
            }
          : range,
      )
    : [defaultTimeRange];

  return deserialize(ChatbotSlotPayload, {
    fromDate: formattedDate,
    toDate: formattedDate,
    timeRanges: formattedTimeRanges,
  });
};

const parseTime = (time?: string): Dayjs | null => {
  if (!time) return null;
  return dayjs(time, HH_MM_A) ?? null;
};

export const convertToDayjsRange = (
  range?: TimeRangeItem,
): [Dayjs | null, Dayjs | null] => {
  if (!range) return [null, null];

  const { startTime, endTime } = range;

  return [parseTime(startTime), parseTime(endTime)];
};
