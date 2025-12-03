import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import { renderNotification } from "./renderNotification";
import { ResponseModel } from "src/models/response.model";
import { localStorageHelper } from "./localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import { DateFormats } from "src/enums/dateFormats.enum";

interface CalendarSuccessParams {
  response: ResponseModel;
  slotDate?: string;
}

const { YYYY_MM } = DateFormats;

const { GET_CALENDER_SLOTS_AND_EVENTS } = QueryKeys;

export const responseHandlers = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const queryClient = useQueryClient();

  const refetchCalender = ({ response, slotDate }: CalendarSuccessParams) => {
    const month = dayjs(slotDate).format(YYYY_MM);
    renderNotification(response.title, response.description);

    queryClient.invalidateQueries({
      queryKey: [GET_CALENDER_SLOTS_AND_EVENTS, month, clubId],
    });
  };
  return { refetchCalender };
};
