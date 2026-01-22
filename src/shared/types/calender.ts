import { Dayjs } from "dayjs";
import { ReactNode } from "react";
import { ToolbarProps as AntdToolbarProps } from "react-big-calendar";

import { DateFormats } from "src/enums/dateFormats.enum";
import { TimeRangeItem } from "src/models/calender.model";

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
  onRescheduleEvent: (event: CalendarEvent) => void;
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
  onChatBotSlotClick?: () => void;
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
  onCancel?: (e?: React.MouseEvent) => void;
  onReschedule: (e: React.MouseEvent) => void;
  isBookedThroughBot: boolean;
}

export interface BookingFormState {
  visible: boolean;
  selectedDate?: Date | null;
  selectedEvent?: CalendarEvent | null;
}

export interface ChatbotSlotProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: string;
  availableSlots?: CalendarEvent[];
}

export interface OccupiedRange {
  start: number;
  end: number;
}

export interface OverlapTimeRange {
  startMinutes: number;
  endMinutes: number;
  disabledRanges: OccupiedRange[];
}

export interface DisableTimeRange {
  current: Dayjs | null;
  disabledRanges: OccupiedRange[];
}

export interface GetOccupiedRangesParams {
  timeRanges?: TimeRangeItem[];
  currentIndex: number;
  format?: DateFormats;
}
