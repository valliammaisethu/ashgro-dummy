import { ReactNode } from "react";

export interface CalendarEvent {
  id?: string;
  title?: ReactNode;
  start?: Date;
  end?: Date;
  resource?: { chatbot?: boolean };
}

export interface EventsPopoverProps {
  date: Date;
  displayEvents: CalendarEvent[];
  onClose: () => void;
}

export interface DateCellProps {
  label: string;
  date: Date;
  allEvents: CalendarEvent[];
}
