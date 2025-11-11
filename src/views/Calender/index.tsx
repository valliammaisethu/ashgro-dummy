import React, { FC } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";

import { useCalendarData } from "./useCalendarData";
import CalendarToolbar from "./CalenderToolbar/CalendarToolbar";
import DateCell from "./DateCell";
import { CALENDAR_CONFIG } from "./constants";

import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./calender.module.scss";

const localizer = dayjsLocalizer(dayjs);

const Calender: FC = () => {
  const { events } = useCalendarData();

  return (
    <div>
      <div className={styles.calendarWrapper}>
        <Calendar
          {...CALENDAR_CONFIG}
          localizer={localizer}
          events={events}
          components={{
            toolbar: CalendarToolbar,
            event: () => null,
            month: {
              dateHeader: (props) => <DateCell {...props} allEvents={events} />,
            },
          }}
        />
      </div>
    </div>
  );
};

export default Calender;
