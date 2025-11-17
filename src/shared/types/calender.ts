import { ReactNode } from "react";
import { ToolbarProps as AntdToolbarProps } from "react-big-calendar";

export interface CalendarEvent {
  id?: string;
  title?: ReactNode;
  start?: Date;
  end?: Date;
  resource?: {
    chatbot?: boolean;
    status?: string;
    bookedUserName?: string;
    bookedUserType?: string;
    bookedUserId?: string;
  };
  date?: Date;
}

export interface EventsPopoverProps {
  date: Date;
  displayEvents: CalendarEvent[];
  onClose: () => void;
}

export interface DateCellProps {
  label: string;
  date: Date;
  allEvents?: CalendarEvent[];
  onDateClick?: (event: CalendarEvent) => void;
}

export interface BookMeetingProps {
  isOpen?: boolean;
  onClose?: () => void;
  selectedDate?: Date | null;
  calendarEvent?: CalendarEvent | null;
}

export interface ToolbarProps extends AntdToolbarProps {
  onBookMeeting?: () => void;
}

export interface MeetingPreviewProps {
  event: CalendarEvent;
  isMorePopup?: boolean;
  isPastDate?: boolean;
  onReschedule: (event: CalendarEvent) => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export interface MeetingPopoverContentProps {
  event: CalendarEvent;
  onCancel: (e: React.MouseEvent) => void;
  onReschedule: (e: React.MouseEvent) => void;
}

export interface BookingFormState {
  visible: boolean;
  selectedDate?: Date | null;
  selectedEvent?: CalendarEvent | null;
}
