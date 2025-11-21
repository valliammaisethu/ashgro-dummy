import React, { FC } from "react";
import { useFormContext, useController, FieldValues } from "react-hook-form";
import { IconClock4Alt } from "obra-icons-react";
import { TimePicker, TimeRangePickerProps } from "antd";

import { InputStatus } from "src/enums/inputStatus.enum";
import Label from "../Label";
import Error from "../Error";
import { Colors } from "src/enums/colors.enum";
import { parseTimeRangeValue } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";

import styles from "./timeRangePicker.module.scss";

const { RangePicker } = TimePicker;

interface TimeRangePickerFieldProps
  extends Omit<TimeRangePickerProps, "value"> {
  name: string;
  label?: string;
  required?: boolean;
  format?: string;
}

const TimeRangePicker: FC<TimeRangePickerFieldProps> = ({
  name,
  label,
  required = false,
  placeholder,
  format = DateFormats.HH_MM_A,
  ...rest
}) => {
  const { control } = useFormContext<FieldValues>();
  const {
    field: { value, onChange, onBlur },
    fieldState,
  } = useController({ name, control });

  const handleChange: TimeRangePickerProps["onChange"] = (_, timeStrings) =>
    onChange(timeStrings);

  return (
    <div className={styles.timeRangePickerWrapper}>
      <Label className={styles.label} htmlFor={name} required={required}>
        {label}
      </Label>

      <RangePicker
        id={name}
        value={parseTimeRangeValue(value, format)}
        onChange={handleChange}
        onBlur={onBlur}
        format={format}
        minuteStep={5}
        placeholder={placeholder}
        suffixIcon={
          <IconClock4Alt strokeWidth={1} color={Colors.ASHGRO_NAVY} size={16} />
        }
        className={styles.timeRangePicker}
        status={fieldState.error ? InputStatus.ERROR : undefined}
        {...rest}
      />

      <Error message={fieldState?.error?.message} />
    </div>
  );
};

export default TimeRangePicker;
