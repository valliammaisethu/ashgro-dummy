import React, { FC } from "react";
import { useFormContext, useController, FieldValues } from "react-hook-form";
import { DatePicker as AntdDatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import { InputStatus } from "src/enums/inputStatus.enum";
import Label from "../Label";
import Error from "../Error";
import styles from "./datePicker.module.scss";
import { IconCalendarDates } from "obra-icons-react";
import { Colors } from "src/enums/colors.enum";
import { DateFormats } from "src/enums/dateFormats.enum";

interface DatePickerFieldProps extends Omit<DatePickerProps, "name" | "value"> {
  name: string;
  label?: string;
  format?: string;
  required?: boolean;
}

const DatePicker: FC<DatePickerFieldProps> = ({
  name,
  label,
  format = DateFormats.DD_MMM_YYYY,
  placeholder,
  required = false,
  ...rest
}) => {
  const { control } = useFormContext<FieldValues>();
  const {
    field: { value, onChange, onBlur },
    fieldState,
  } = useController({ name, control });

  const dateValue = value ? dayjs(value, format, true) : null;

  const handleOnChange: DatePickerProps["onChange"] = (
    _date: dayjs.Dayjs | null,
    dateString,
  ) => {
    onChange(dateString);
  };

  return (
    <div className={styles.datePickerWrapper}>
      <Label className={styles.label} htmlFor={name} required={required}>
        {label}
      </Label>
      <AntdDatePicker
        id={name}
        value={dateValue}
        onChange={handleOnChange}
        placeholder={placeholder}
        onBlur={onBlur}
        needConfirm={false}
        {...rest}
        format={format}
        suffixIcon={
          <IconCalendarDates
            strokeWidth={1}
            color={Colors.ASHGRO_NAVY}
            size={16}
          />
        }
        className={styles.datePicker}
        status={fieldState.error ? InputStatus.ERROR : undefined}
      />
      <Error message={fieldState?.error?.message} />
    </div>
  );
};

export default DatePicker;
