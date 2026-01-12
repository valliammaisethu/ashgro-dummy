import React, { useCallback, useMemo } from "react";
import {
  Calendar,
  DateHeaderProps,
  dayjsLocalizer,
  ToolbarProps,
} from "react-big-calendar";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { Skeleton } from "antd";

import CalendarToolbar from "./CalenderToolbar/CalendarToolbar";
import DateCell from "./DateCell";
import { CALENDAR_CONFIG } from "./constants";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { CalenderService } from "src/services/Calender/calender.service";
import { DateFormats } from "src/enums/dateFormats.enum";
import useRedirect from "src/shared/hooks/useRedirect";
import { CalendarEvent } from "src/shared/types/calender";
import { useAppContainerPadding } from "src/shared/hooks/useAppContainerPadding";

import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./calender.module.scss";

const localizer = dayjsLocalizer(dayjs);

interface CalenderProps {
  handleBookingModalVisbility?: () => void;
  handleChatBotSlotVisibility?: () => void;
}

const Calender = ({
  handleBookingModalVisbility,
  handleChatBotSlotVisibility,
}: CalenderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = queryString.parse(location.search);

  const selectedDate =
    (query.month as string) || dayjs().format(DateFormats.YYYY_MM);

  const { navigateToMonth } = useRedirect();
  const { calenderEventsAndSlotsList } = CalenderService();

  const { data, isLoading } = useQuery(
    calenderEventsAndSlotsList(selectedDate),
  );

  const handleSelectMonth = useCallback(
    (date: Date) => {
      navigateToMonth({
        navigate,
        pathname: location.pathname,
        query,
        date,
      });
    },
    [navigate, location.pathname, query],
  );

  const eventsForSelectedMonth = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data],
  );

  const Toolbar = useCallback(
    (props: ToolbarProps<CalendarEvent, object>) => (
      <CalendarToolbar
        {...props}
        onBookMeeting={handleBookingModalVisbility}
        onChatBotSlotClick={handleChatBotSlotVisibility}
      />
    ),
    [handleBookingModalVisbility, handleChatBotSlotVisibility],
  );

  const DateHeader = useCallback(
    (props: DateHeaderProps) => (
      <ConditionalRenderComponent
        visible={!isLoading || props.isOffRange}
        fallback={
          <Skeleton
            active
            paragraph={{ rows: 3, width: ["60%", "80%", "50%"] }}
            title={false}
            className={styles.calendarSkeleton}
          />
        }
      >
        <DateCell {...props} allEvents={eventsForSelectedMonth} />
      </ConditionalRenderComponent>
    ),
    [eventsForSelectedMonth, isLoading],
  );

  useAppContainerPadding();

  return (
    <div className={styles.calendarWrapper}>
      <Calendar
        {...CALENDAR_CONFIG}
        localizer={localizer}
        events={data}
        date={dayjs(selectedDate).toDate()}
        onNavigate={handleSelectMonth}
        components={{
          toolbar: Toolbar,
          event: () => null,
          month: {
            dateHeader: DateHeader,
          },
        }}
      />
    </div>
  );
};

export default React.memo(Calender);
