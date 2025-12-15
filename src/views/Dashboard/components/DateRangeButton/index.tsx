import React, { useState, useCallback } from "react";
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
import { DateRange } from "src/shared/types/dashboard.type";

import styles from "./dateRangeButton.module.scss";

const { YYYY_MM_DD, DD_MMM_YY, MMMM_YYYY } = DateFormats;
const { MODAL_CLOSE_ICON, ASHGRO_BLACK, ASHGRO_GOLD } = Colors;

interface DateRangeButtonProps {
  value?: DateRange;
  onChange: (dates: DateRange | null) => void;
}

const DateRangeButton: React.FC<DateRangeButtonProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = useCallback(
    (dates: [Dayjs | null, Dayjs | null] | null) => {
      if (dates && dates[0] && dates[1]) {
        const startDate = dates[0].toISOString();
        const endDate = dates[1].toISOString();
        onChange([startDate, endDate]);
      } else {
        onChange(null);
      }
    },
    [onChange],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      stopPropagation(e);
      onChange(null);
      setOpen(false);
    },
    [onChange],
  );

  const formatDisplayText = () => {
    if (value && value[0] && value[1]) {
      const start = dayjs(value[0]).format(DD_MMM_YY);
      const end = dayjs(value[1]).format(DD_MMM_YY);
      return `${start} - ${end}`;
    }
    return dayjs().format(MMMM_YYYY);
  };

  const handleVisibilityChange = () => setOpen((prev) => !prev);

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
        <DatePicker.RangePicker
          open={open}
          onOpenChange={setOpen}
          value={value ? [dayjs(value?.[0]), dayjs(value?.[1])] : null}
          onChange={handleChange}
          format={YYYY_MM_DD}
        />
      </div>
    </div>
  );
};

export default React.memo(DateRangeButton);
