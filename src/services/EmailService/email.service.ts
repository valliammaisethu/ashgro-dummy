import { UseMutationOptions } from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";
import { MutationKeys } from "src/enums/cacheEvict.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { SendEmail } from "src/models/email.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { renderNotification } from "src/shared/utils/renderNotification";

const { SEND_EMAIL } = MutationKeys;
const { SEND_EMAIL: SEND_EMAIL_ROUTE } = ApiRoutes;

export const EmailService = () => {
  const sendEmail = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    SendEmail
  > => ({
    mutationKey: [SEND_EMAIL],
    mutationFn: async (email: SendEmail) => {
      const serializedData = serialize(SendEmail, email);
      const response = await axiosInstance.post(
        SEND_EMAIL_ROUTE,
        serializedData,
      );

      return deserialize(ResponseModel, response.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
    },
  });
  return {
    sendEmail,
  };
};
