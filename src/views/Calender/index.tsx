import React, { FC, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";

import { useCalendarData } from "./useCalendarData";
import CalendarToolbar from "./CalenderToolbar/CalendarToolbar";
import DateCell from "./DateCell";
import { CALENDAR_CONFIG } from "./constants";
import BookMeeting from "./BookMeeting";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./calender.module.scss";

const localizer = dayjsLocalizer(dayjs);

const Calender: FC = () => {
  const { events } = useCalendarData();

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookingModalVisbility = () => setIsBookingOpen((prev) => !prev);
  return (
    <div>
      <div className={styles.calendarWrapper}>
        <Calendar
          {...CALENDAR_CONFIG}
          localizer={localizer}
          events={events}
          components={{
            toolbar: (props) => (
              <CalendarToolbar
                {...props}
                onBookMeeting={handleBookingModalVisbility}
              />
            ),
            event: () => null,
            month: {
              dateHeader: (props) => <DateCell {...props} allEvents={events} />,
            },
          }}
        />
      </div>

      <ConditionalRenderComponent visible={isBookingOpen} hideFallback>
        <BookMeeting
          isOpen={isBookingOpen}
          onClose={handleBookingModalVisbility}
        />
      </ConditionalRenderComponent>
    </div>
  );
};

export default Calender;
