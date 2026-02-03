import React, { useState, useCallback, useRef } from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import {
  IconCalendarDates,
  IconChevronDown,
  IconCircleCloseFill,
} from "obra-icons-react";

import { DateFormats } from "src/enums/dateFormats.enum";
import { Colors } from "src/enums/colors.enum";
import { stopPropagation } from "src/shared/utils/eventUtils";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import {
  DateRangeButtonProps,
  DayjsRange,
} from "src/shared/types/dashboard.type";
import { isDateOutOfRange } from "src/shared/utils/dateUtils";
import { filterConstants } from "../../constants";

import styles from "./dateRangeButton.module.scss";

const { RangePicker } = DatePicker;

const { MMMM_YYYY, MMM_DD__YYYY } = DateFormats;
const { MODAL_CLOSE_ICON, ASHGRO_BLACK, ASHGRO_GOLD } = Colors;

const DateRangeButton: React.FC<DateRangeButtonProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const selectedStartDate = useRef<Dayjs | null>(null);

  const handleChange = useCallback(
    (dates: DayjsRange) => {
      selectedStartDate.current = null;
      if (dates && dates[0] && dates[1]) {
        onChange([dates[0].toISOString(), dates[1].toISOString()]);
      } else {
        onChange(null);
      }
    },
    [onChange],
  );

  const handleCalendarChange = useCallback((dates: DayjsRange) => {
    selectedStartDate.current = dates?.[0] ?? null;
  }, []);

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      stopPropagation(e);
      onChange(null);
      selectedStartDate.current = null;
      setOpen(false);
    },
    [onChange],
  );

  const formatDisplayText = () => {
    if (value && value[0] && value[1]) {
      const start = dayjs(value[0]).format(MMM_DD__YYYY);
      const end = dayjs(value[1]).format(MMM_DD__YYYY);
      return `${start} - ${end}`;
    }
    return dayjs().format(MMMM_YYYY);
  };

  const handleVisibilityChange = () => setOpen((prev) => !prev);

  const isDisabledDate = (current: Dayjs) =>
    isDateOutOfRange({
      current,
      futureDate: selectedStartDate.current,
      maxDays: filterConstants.DATE_RANGE,
    });

  return (
    <div className={styles.dateRangeButton}>
      <div className={styles.calendarLabelContainer}>
        <IconCalendarDates strokeWidth={1.25} color={MODAL_CLOSE_ICON} />
        <div onClick={handleVisibilityChange} className={styles.calendarLabel}>
          <span className={styles.dateText}>{formatDisplayText()}</span>
          <ConditionalRenderComponent
            visible={!!(value && value[0] && value[1])}
            fallback={
              <IconChevronDown strokeWidth={1.25} color={ASHGRO_BLACK} />
            }
          >
            <IconCircleCloseFill
              strokeWidth={1.25}
              color={ASHGRO_GOLD}
              onClick={handleClear}
              size={18}
            />
          </ConditionalRenderComponent>
        </div>
      </div>

      <div className={styles.pickerWrapper}>
        <RangePicker
          open={open}
          onOpenChange={setOpen}
          value={value ? [dayjs(value?.[0]), dayjs(value?.[1])] : null}
          onChange={handleChange}
          format={MMM_DD__YYYY}
          onCalendarChange={handleCalendarChange}
          disabledDate={isDisabledDate}
        />
      </div>
    </div>
  );
};

export default React.memo(DateRangeButton);
