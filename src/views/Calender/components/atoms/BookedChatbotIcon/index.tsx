import React from "react";

import chatbotMeetingActive from "src/assets/images/chatBotMeeting.svg";
import chatbotMeetingInActive from "src/assets/images/chatBotMeetingInactive.svg";
import { imageAlts } from "src/constants/imageAlts";

export interface BookedChatbotIconProps {
  isBooked: boolean;
  isPastDate: boolean;
}

const BookedChatbotIcon: React.FC<BookedChatbotIconProps> = ({
  isBooked,
  isPastDate,
}) => {
  if (!isBooked) return null;

  return (
    <img
      src={isPastDate ? chatbotMeetingInActive : chatbotMeetingActive}
      alt={imageAlts.chatbotIcon}
    />
  );
};

export default BookedChatbotIcon;
