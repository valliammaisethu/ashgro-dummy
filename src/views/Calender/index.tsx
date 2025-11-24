import React, { FC, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

import CalendarToolbar from "./CalenderToolbar/CalendarToolbar";
import DateCell from "./DateCell";
import { CALENDAR_CONFIG } from "./constants";
import BookMeeting from "./BookMeeting";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { CalenderService } from "src/services/Calender/calender.service";
import ConditionalRender from "src/shared/components/ConditionalRender";
import ChatbotSlot from "./ChatbotSlot";

import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./calender.module.scss";

const localizer = dayjsLocalizer(dayjs);

const Calender: FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isChatBotSlotOpen, setIsChatBotSlotOpen] = useState(false);

  const handleBookingModalVisbility = () => setIsBookingOpen((prev) => !prev);
  const handleChatBotSlotVisibility = () =>
    setIsChatBotSlotOpen((prev) => !prev);

  const { calenderEventsAndSlotsList } = CalenderService();

  const { data, isLoading, isSuccess } = useQuery(calenderEventsAndSlotsList());

  return (
    <div>
      <div className={styles.calendarWrapper}>
        <ConditionalRender
          records={data}
          isPending={isLoading}
          isSuccess={isSuccess}
        >
          <Calendar
            {...CALENDAR_CONFIG}
            localizer={localizer}
            events={data}
            components={{
              toolbar: (props) => (
                <CalendarToolbar
                  {...props}
                  onBookMeeting={handleBookingModalVisbility}
                  onChatBotSlotClick={handleChatBotSlotVisibility}
                />
              ),
              event: () => null,
              month: {
                dateHeader: (props) => <DateCell {...props} allEvents={data} />,
              },
            }}
          />
        </ConditionalRender>
      </div>

      <ConditionalRenderComponent visible={isBookingOpen} hideFallback>
        <BookMeeting
          isOpen={isBookingOpen}
          onClose={handleBookingModalVisbility}
        />
      </ConditionalRenderComponent>

      <ConditionalRenderComponent visible={isChatBotSlotOpen} hideFallback>
        <ChatbotSlot
          isOpen={isChatBotSlotOpen}
          onClose={handleChatBotSlotVisibility}
        />
      </ConditionalRenderComponent>
    </div>
  );
};

export default Calender;
