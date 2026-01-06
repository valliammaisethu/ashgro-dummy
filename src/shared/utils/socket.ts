import { QueryClient } from "@tanstack/react-query";
import { TemplateEntity } from "src/enums/templateEntity.enum";
import { CHATBOT_SLOTS_TYPE } from "src/constants/socket.constants";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import { getCurrentUserIds } from "src/shared/utils/roleUtils";

const { GET_PROSPECTS, GET_MEMBERS, GET_CALENDER_SLOTS_AND_EVENTS } = QueryKeys;
const { PROSPECT, MEMBER } = TemplateEntity;

interface SocketInvalidateParams {
  queryClient: QueryClient;
  entityType?: string;
  month?: string;
}

export const invalidateSocketQueries = ({
  queryClient,
  entityType,
  month,
}: SocketInvalidateParams) => {
  const { clubId } = getCurrentUserIds();

  let queryKey: string[] = [];

  if (entityType === PROSPECT) {
    queryKey = [GET_PROSPECTS];
  } else if (entityType === MEMBER) {
    queryKey = [GET_MEMBERS];
  } else if (entityType === CHATBOT_SLOTS_TYPE) {
    queryKey = [GET_CALENDER_SLOTS_AND_EVENTS, month, clubId];
  }
  queryClient.invalidateQueries({ queryKey });
};
