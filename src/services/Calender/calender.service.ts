import {
  UseMutationOptions,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";

import { QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { CalendarData, ChatbotSlotPayload } from "src/models/calender.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { CalendarEvent } from "src/shared/types/calender";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";
import { mapCalendarDaysToEvents } from "src/views/Calender/utils/calendarUtils";

const { GET_CALENDER_SLOTS_AND_EVENTS } = QueryKeys;
const { CALENDER_EVENTS_AND_SLOTS, CHAT_BOT_SLOTS } = ApiRoutes;

export const CalenderService = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;
  const queryClient = useQueryClient();

  const calenderEventsAndSlotsList = (
    month?: string,
  ): UseQueryOptions<CalendarEvent[], ResponseModel, CalendarEvent[]> => {
    return {
      queryKey: [GET_CALENDER_SLOTS_AND_EVENTS, month, clubId],
      queryFn: async () => {
        const response = await axiosInstance.get(CALENDER_EVENTS_AND_SLOTS, {
          params: { month, clubId },
        });

        const calendarResponse = deserialize(CalendarData, response?.data);

        return mapCalendarDaysToEvents(calendarResponse?.days);
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
  return {
    calenderEventsAndSlotsList,
    addChatbotSlots,
  };
};
