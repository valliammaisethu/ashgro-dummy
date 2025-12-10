import React from "react";
import clsx from "clsx";
import { DatePicker } from "antd";
import { IconCalendarDates } from "obra-icons-react";
import { useFormContext, useController, FieldValues } from "react-hook-form";

import dayjs from "dayjs";
import Label from "../Label";
import Error from "../Error";

import { DateFormats } from "src/enums/dateFormats.enum";
import { InputStatus } from "src/enums/inputStatus.enum";
import { Colors } from "src/enums/colors.enum";
import {
  datePickerFromPlaceholder,
  datePickerToPlaceholder,
} from "src/constants/sharedComponents";

import styles from "./dateRangePicker.module.scss";

const { RangePicker } = DatePicker;

interface DateRangePickerFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  format?: string;
  placeholder?: [string, string];
  fromLabel?: string;
  toLabel?: string;
  className?: string;
}

const DateRangePickerField: React.FC<DateRangePickerFieldProps> = ({
  name,
  fromLabel = "From",
  toLabel = "To",
  format = DateFormats.DD_MMM_YYYY,
  placeholder = [datePickerFromPlaceholder, datePickerToPlaceholder],
  className,
}) => {
  const { control } = useFormContext<FieldValues>();

  const {
    field: { value, onChange, onBlur },
    fieldState,
  } = useController({
    name,
    control,
  });

  const rangeValue: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null =
    value && Array.isArray(value) && value.length === 2
      ? [dayjs(value[0], format, true), dayjs(value[1], format, true)]
      : [null, null];

  const handleChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
    dateStrings: [string, string],
  ) => {
    if (dates) {
      const [from, to] = dates;
      if (from && !to) onChange([from.format(format), from.format(format)]);
      else if (!from && to) onChange([to.format(format), to.format(format)]);
      else onChange(dateStrings);
    } else {
      onChange([]);
    }
  };

  return (
    <div className={styles.datePickerWrapper}>
      <Label className={styles.fromLabel}>{fromLabel}</Label>
      <Label className={styles.toLabel}>{toLabel}</Label>
      <RangePicker
        id={name}
        rootClassName={clsx(styles.rangePickerComponent, className)}
        value={rangeValue}
        onChange={handleChange}
        onBlur={onBlur}
        format={format}
        width={800}
        allowClear
        placeholder={placeholder}
        separator={<></>}
        suffixIcon={<></>}
        className={styles.datePicker}
        status={fieldState.error ? InputStatus.ERROR : undefined}
      />
      <IconCalendarDates
        color={Colors.ASHGRO_NAVY}
        strokeWidth={1}
        size={18}
        className={styles.fromSuffix}
      />
      <IconCalendarDates
        strokeWidth={1}
        size={18}
        color={Colors.ASHGRO_NAVY}
        className={styles.toSuffix}
      />
      <Error message={fieldState?.error?.message} />
    </div>
  );
};

export default DateRangePickerField;
