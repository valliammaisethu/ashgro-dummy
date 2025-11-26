import { custom } from "serializr";
import dayjs from "dayjs";

export const createDateSerializer = (
  targetFormat: string,
  sourceFormat: string,
) =>
  custom(
    (value) =>
      value ? dayjs(value, targetFormat).format(sourceFormat) : value,
    (value) =>
      value ? dayjs(value, sourceFormat).format(targetFormat) : value,
  );

export const createTimeSerializer = (
  targetFormat: string,
  sourceFormat: string,
) =>
  custom(
    (value) =>
      value ? dayjs(value, targetFormat).format(sourceFormat) : value,
    (value) =>
      value ? dayjs(value, sourceFormat).format(targetFormat) : value,
  );
