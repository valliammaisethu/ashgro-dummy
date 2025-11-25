import { UseMutationOptions } from "@tanstack/react-query";
import { deserialize } from "serializr";

import { MutationKeys } from "src/enums/cacheEvict.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import {
  ChatbotPayload,
  ChatbotResponse,
  ResponseModel,
} from "src/models/response.model";

const { CHATBOT } = MutationKeys;

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

  return {
    getBotResponse,
  };
};
