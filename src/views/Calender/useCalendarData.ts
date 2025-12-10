import { useState } from "react";
import { CalendarEvent } from "src/shared/types/calender";

// TODO:To remove hard coded data and use api response

export const useCalendarData = () => {
  const eventsData = [
    // ✅ 1st November 2025
    {
      id: "cal-1-1",
      title: "Calendar Event 1",
      start: new Date(2025, 10, 1, 9, 0),
      end: new Date(2025, 10, 1, 9, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-1-2",
      title: "Calendar Event 2",
      start: new Date(2025, 10, 1, 10, 0),
      end: new Date(2025, 10, 1, 10, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-1-3",
      title: "Calendar Event 3",
      start: new Date(2025, 10, 1, 11, 0),
      end: new Date(2025, 10, 1, 11, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-1-4",
      title: "Calendar Event 4",
      start: new Date(2025, 10, 1, 12, 0),
      end: new Date(2025, 10, 1, 12, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-1-5",
      title: "Calendar Event 5",
      start: new Date(2025, 10, 1, 13, 0),
      end: new Date(2025, 10, 1, 13, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-1-6",
      title: "Calendar Event 6",
      start: new Date(2025, 10, 1, 14, 0),
      end: new Date(2025, 10, 1, 14, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-1-7",
      title: "Calendar Event 7",
      start: new Date(2025, 10, 1, 15, 0),
      end: new Date(2025, 10, 1, 15, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-1-8",
      title: "Calendar Event 8",
      start: new Date(2025, 10, 1, 16, 0),
      end: new Date(2025, 10, 1, 16, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-1-9",
      title: "Calendar Event 9",
      start: new Date(2025, 10, 1, 17, 0),
      end: new Date(2025, 10, 1, 17, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-1-10",
      title: "Calendar Event 10",
      start: new Date(2025, 10, 1, 18, 0),
      end: new Date(2025, 10, 1, 18, 30),
      resource: { chatbot: false },
    },
    {
      id: "bot-1",
      title: "Chatbot Slot",
      start: new Date(2025, 10, 1, 19, 0),
      end: new Date(2025, 10, 1, 19, 30),
      resource: { chatbot: true },
    },
    {
      id: "bot-2",
      title: "Chatbot Slot",
      start: new Date(2025, 10, 1, 19, 0),
      end: new Date(2025, 10, 1, 19, 30),
      resource: { chatbot: true },
    },
    {
      id: "bot-3",
      title: "Chatbot Slot",
      start: new Date(2025, 10, 1, 19, 0),
      end: new Date(2025, 10, 1, 19, 30),
      resource: { chatbot: true },
    },
    {
      id: "bot-4",
      title: "Chatbot Slot",
      start: new Date(2025, 10, 1, 19, 0),
      end: new Date(2025, 10, 1, 19, 30),
      resource: { chatbot: true },
    },
    {
      id: "bot-5",
      title: "Chatbot Slot",
      start: new Date(2025, 10, 1, 19, 0),
      end: new Date(2025, 10, 1, 19, 30),
      resource: { chatbot: true },
    },
    {
      id: "bot-6",
      title: "Chatbot Slot",
      start: new Date(2025, 10, 1, 19, 0),
      end: new Date(2025, 10, 1, 19, 30),
      resource: { chatbot: true },
    },

    // ✅ 8th November 2025
    {
      id: "cal-8-1",
      title: "Calendar Event 1",
      start: new Date(2025, 10, 8, 9, 0),
      end: new Date(2025, 10, 8, 9, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-8-2",
      title: "Calendar Event 2",
      start: new Date(2025, 10, 8, 10, 0),
      end: new Date(2025, 10, 8, 10, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-8-3",
      title: "Calendar Event 3",
      start: new Date(2025, 10, 8, 11, 0),
      end: new Date(2025, 10, 8, 11, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-8-4",
      title: "Calendar Event 4",
      start: new Date(2025, 10, 8, 12, 0),
      end: new Date(2025, 10, 8, 12, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-8-5",
      title: "Calendar Event 5",
      start: new Date(2025, 10, 8, 13, 0),
      end: new Date(2025, 10, 8, 13, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-8-6",
      title: "Calendar Event 6",
      start: new Date(2025, 10, 8, 14, 0),
      end: new Date(2025, 10, 8, 14, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-8-7",
      title: "Calendar Event 7",
      start: new Date(2025, 10, 8, 15, 0),
      end: new Date(2025, 10, 8, 15, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-8-8",
      title: "Calendar Event 8",
      start: new Date(2025, 10, 8, 16, 0),
      end: new Date(2025, 10, 8, 16, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-8-9",
      title: "Calendar Event 9",
      start: new Date(2025, 10, 8, 17, 0),
      end: new Date(2025, 10, 8, 17, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-8-10",
      title: "Calendar Event 10",
      start: new Date(2025, 10, 8, 18, 0),
      end: new Date(2025, 10, 8, 18, 30),
      resource: { chatbot: false },
    },

    // ✅ 9th November 2025
    {
      id: "cal-9-1",
      title: "Calendar Event 1",
      start: new Date(2025, 10, 9, 9, 0),
      end: new Date(2025, 10, 9, 9, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-9-2",
      title: "Calendar Event 2",
      start: new Date(2025, 10, 9, 10, 0),
      end: new Date(2025, 10, 9, 10, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-9-3",
      title: "Calendar Event 3",
      start: new Date(2025, 10, 9, 11, 0),
      end: new Date(2025, 10, 9, 11, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-9-4",
      title: "Calendar Event 4",
      start: new Date(2025, 10, 9, 12, 0),
      end: new Date(2025, 10, 9, 12, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-9-5",
      title: "Calendar Event 5",
      start: new Date(2025, 10, 9, 13, 0),
      end: new Date(2025, 10, 9, 13, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-9-6",
      title: "Calendar Event 6",
      start: new Date(2025, 10, 9, 14, 0),
      end: new Date(2025, 10, 9, 14, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-9-7",
      title: "Calendar Event 7",
      start: new Date(2025, 10, 9, 15, 0),
      end: new Date(2025, 10, 9, 15, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-9-8",
      title: "Calendar Event 8",
      start: new Date(2025, 10, 9, 16, 0),
      end: new Date(2025, 10, 9, 16, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-9-9",
      title: "Calendar Event 9",
      start: new Date(2025, 10, 9, 17, 0),
      end: new Date(2025, 10, 9, 17, 30),
      resource: { chatbot: false },
    },
    {
      id: "cal-9-10",
      title: "Calendar Event 10",
      start: new Date(2025, 10, 9, 18, 0),
      end: new Date(2025, 10, 9, 18, 30),
      resource: { chatbot: false },
    },
    {
      id: "bot-9",
      title: "Chatbot Slot",
      start: new Date(2025, 10, 9, 19, 0),
      end: new Date(2025, 10, 9, 19, 30),
      resource: { chatbot: true },
    },
  ];

  const [events] = useState<CalendarEvent[]>(eventsData);

  return { events };
};
