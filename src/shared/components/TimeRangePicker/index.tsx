import React, { FC, ReactNode, useMemo } from "react";
import { useFormContext, useController, FieldValues } from "react-hook-form";
import { IconClock4Alt } from "obra-icons-react";
import { TimePicker, TimeRangePickerProps } from "antd";
import type { Dayjs } from "dayjs";

import { InputStatus } from "src/enums/inputStatus.enum";
import Label from "../Label";
import Error from "../Error";
import { Colors } from "src/enums/colors.enum";
import { DateFormats } from "src/enums/dateFormats.enum";
import {
  hasOverlap,
  disabledTime as disabledTimeUtil,
  convertToDayjsRange,
} from "src/shared/utils/timeRange";
import { OccupiedRange } from "src/shared/types/calender";
import { defaultTimeRange } from "src/views/Calender/ChatbotSlot/constants";
import { TIME_RANGE_PICKER_CONSTANTS } from "./constants";

import styles from "./timeRangePicker.module.scss";

const { RangePicker } = TimePicker;
const { MANUAL_TYPE, OVERLAP_ERROR } = TIME_RANGE_PICKER_CONSTANTS;
const { HH_MM_A } = DateFormats;

interface TimeRangePickerFieldProps
  extends Omit<TimeRangePickerProps, "value"> {
  name: string;
  label?: ReactNode;
  required?: boolean;
  format?: string;
  disabledRanges?: OccupiedRange[];
}

const TimeRangePicker: FC<TimeRangePickerFieldProps> = ({
  name,
  label,
  required = false,
  placeholder,
  format = HH_MM_A,
  disabledRanges = [],
  ...rest
}) => {
  const { control, setError, clearErrors } = useFormContext<FieldValues>();

  const {
    field: { onChange, onBlur, value },
    fieldState,
  } = useController({ name, control });

  const handleChange: TimeRangePickerProps["onChange"] = (times) => {
    const [start, end] = times ?? [];

    if (!start || !end) {
      onChange(defaultTimeRange);
      clearErrors(name);
      return;
    }

    onChange({
      startTime: start.format(format),
      endTime: end.format(format),
    });

    const startMinutes = start.hour() * 60 + start.minute();
    const endMinutes = end.hour() * 60 + end.minute();

    if (hasOverlap({ startMinutes, endMinutes, disabledRanges })) {
      setError(name, {
        type: MANUAL_TYPE,
        message: OVERLAP_ERROR,
      });
    } else {
      clearErrors(name);
    }
  };

  const disabledTime = useMemo(() => {
    return (current: Dayjs | null) =>
      disabledTimeUtil({ current, disabledRanges });
  }, [disabledRanges]);

  return (
    <div className={styles.timeRangePickerWrapper}>
      <Label
        className={styles.timeRangeLabel}
        htmlFor={name}
        required={required}
      >
        {label}
      </Label>

      <RangePicker
        id={name}
        onChange={handleChange}
        onBlur={onBlur}
        format={format}
        placeholder={placeholder}
        suffixIcon={
          <IconClock4Alt strokeWidth={1} color={Colors.ASHGRO_NAVY} size={16} />
        }
        className={styles.timeRangePicker}
        status={fieldState.error ? InputStatus.ERROR : undefined}
        needConfirm={false}
        disabledTime={disabledTime}
        value={convertToDayjsRange(value)}
        minuteStep={15}
        {...rest}
      />

      <Error message={fieldState?.error?.message} />
    </div>
  );
};

export default TimeRangePicker;
