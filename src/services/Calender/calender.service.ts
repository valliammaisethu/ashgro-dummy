import {
  UseMutationOptions,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize, serialize } from "serializr";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { BookMeeting, ChatbotSlotPayload } from "src/models/calender.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { CalendarEvent } from "src/shared/types/calender";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";
import { responseHandlers } from "src/shared/utils/responseHandlers";
import { mapCalendarDaysToEvents } from "src/views/Calender/utils/calendarUtils";

const { GET_CALENDER_SLOTS_AND_EVENTS } = QueryKeys;
const {
  CALENDER_EVENTS_AND_SLOTS,
  CHAT_BOT_SLOTS,
  MEETING,
  RESCHEDULE_MEETING,
} = ApiRoutes;
const { BOOK_MEETING, RESCHEDULE_MEETING_KEY } = MutationKeys;

export const CalenderService = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;
  const queryClient = useQueryClient();
  const { refetchCalender } = responseHandlers();

  const calenderEventsAndSlotsList = (
    month?: string,
  ): UseQueryOptions<CalendarEvent[], ResponseModel, CalendarEvent[]> => {
    return {
      queryKey: [GET_CALENDER_SLOTS_AND_EVENTS, month, clubId],
      queryFn: async () => {
        const response = await axiosInstance.get(CALENDER_EVENTS_AND_SLOTS, {
          params: { month, clubId },
        });
        // TODO: TO check the serialzr compatibility and use
        return mapCalendarDaysToEvents(response?.data?.data?.days);
      },
      enabled: !!clubId && !!month,
    };
  };

  const addChatbotSlots = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    ChatbotSlotPayload
  > => ({
    mutationKey: [CHAT_BOT_SLOTS],
    mutationFn: async (payload: ChatbotSlotPayload) => {
      const serializedData = serialize(ChatbotSlotPayload, payload);

      const response = await axiosInstance.post(CHAT_BOT_SLOTS, {
        ...serializedData,
        clubId,
      });
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
      queryClient.invalidateQueries({
        queryKey: [GET_CALENDER_SLOTS_AND_EVENTS, clubId],
      });
    },
  });

  const bookMeeting = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    BookMeeting
  > => ({
    mutationKey: [BOOK_MEETING],
    mutationFn: async (payload: BookMeeting) => {
      const serializedData = serialize(BookMeeting, payload);

      const response = await axiosInstance.post(MEETING, {
        ...serializedData,
        clubId,
      });
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response, { slotDate }) =>
      refetchCalender({ response, slotDate }),
  });

  const rescheduleMeeting = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    BookMeeting
  > => ({
    mutationKey: [RESCHEDULE_MEETING_KEY],
    mutationFn: async (payload: BookMeeting) => {
      const { id, ...formData } = payload;
      const serializedData = serialize(BookMeeting, formData);

      const response = await axiosInstance.patch(
        generatePath(RESCHEDULE_MEETING, { id }),
        {
          ...serializedData,
          clubId,
        },
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response, { slotDate }) =>
      refetchCalender({ response, slotDate }),
  });
  return {
    calenderEventsAndSlotsList,
    addChatbotSlots,
    bookMeeting,
    rescheduleMeeting,
  };
};
