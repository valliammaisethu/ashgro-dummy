import React, { useCallback, useState } from "react";

import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import BookMeeting from "../BookMeeting";
import ChatbotSlot from "../ChatbotSlot";
import Calender from "..";

const CalendarContainer = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isChatBotSlotOpen, setIsChatBotSlotOpen] = useState(false);

  const handleBookingModalVisbility = useCallback(
    () => setIsBookingOpen((prev) => !prev),
    [],
  );

  const handleChatBotSlotVisibility = useCallback(
    () => setIsChatBotSlotOpen((prev) => !prev),
    [],
  );

  return (
    <>
      <Calender
        handleBookingModalVisbility={handleBookingModalVisbility}
        handleChatBotSlotVisibility={handleChatBotSlotVisibility}
      />

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
    </>
  );
};

export default CalendarContainer;
