import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { deserialize } from "serializr";

import { MutationKeys } from "src/enums/cacheEvict.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import {
  ChatbotPayload,
  ChatbotProfileResposne,
  ChatbotResponse,
  ResponseModel,
} from "src/models/response.model";

const { CHATBOT, CHATBOT_PROFILE } = MutationKeys;

export const ChatbotService = () => {
  const getBotResponse = (): UseMutationOptions<
    ChatbotResponse,
    ResponseModel,
    ChatbotPayload
  > => ({
    mutationKey: [CHATBOT],
    mutationFn: async (payload: ChatbotPayload) => {
      // TODO: move to api routes once the code moved to separate repo
      const { data } = await axiosInstance.post("/chatbot", payload);

      return deserialize(ChatbotResponse, data);
    },
  });

  const getClubProfile = (
    id: string,
  ): UseQueryOptions<
    ChatbotProfileResposne,
    ResponseModel,
    ChatbotProfileResposne
  > => ({
    queryKey: [CHATBOT_PROFILE],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/chatbot/profile", {
        params: { id },
      });

      return deserialize(ChatbotProfileResposne, data);
    },
  });

  return {
    getBotResponse,
    getClubProfile,
  };
};
