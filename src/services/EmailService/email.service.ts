import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deserialize, serialize } from "serializr";
import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import {
  EmailModel,
  EmailRecipientsData,
  SendEmail,
} from "src/models/email.model";
import { MembersListingParams } from "src/models/members.model";
import { ProspectsListingParams } from "src/models/prospects.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { renderNotification } from "src/shared/utils/renderNotification";

const { SEND_EMAIL, VERIFY_EMAIL } = MutationKeys;
const { GET_PROSPECT_EMAIL_RECIPIENTS, GET_MEMBER_EMAIL_RECIPIENTS } =
  QueryKeys;
const {
  SEND_EMAIL: SEND_EMAIL_ROUTE,
  VERIFY_EMAIL: VERIFY_EMAIL_ROUTE,

  PROSPECT_EMAIL_RECIPIENTS,
  MEMBER_EMAIL_RECIPIENTS,
} = ApiRoutes;

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

  const getProspectEmailRecipients = (
    params: ProspectsListingParams,
  ): UseQueryOptions<EmailRecipientsData, ResponseModel> => ({
    queryKey: [GET_PROSPECT_EMAIL_RECIPIENTS, params],
    queryFn: async () => {
      const serializedParams = serialize(ProspectsListingParams, params);
      const { data } = await axiosInstance.get(PROSPECT_EMAIL_RECIPIENTS, {
        params: serializedParams,
      });
      return deserialize(EmailRecipientsData, data?.data);
    },
  });

  const getMemberEmailRecipients = (
    params: MembersListingParams,
  ): UseQueryOptions<EmailRecipientsData, ResponseModel> => ({
    queryKey: [GET_MEMBER_EMAIL_RECIPIENTS, params],
    queryFn: async () => {
      const serializedParams = serialize(MembersListingParams, params);
      const { data } = await axiosInstance.get(MEMBER_EMAIL_RECIPIENTS, {
        params: serializedParams,
      });
      return deserialize(EmailRecipientsData, data?.data);
    },
  });

  const validateEmail = (): UseMutationOptions<
    ResponseModel,
    AxiosError<ResponseModel>,
    EmailModel
  > => ({
    mutationKey: [VERIFY_EMAIL],
    mutationFn: async (email: EmailModel) => {
      const serializedData = serialize(EmailModel, email);
      const { data } = await axiosInstance.post(
        VERIFY_EMAIL_ROUTE,
        serializedData,

        {
          suppressNotifications: true,
        },
      );
      return deserialize(ResponseModel, data);
    },
  });
  return {
    sendEmail,
    getProspectEmailRecipients,
    getMemberEmailRecipients,
    validateEmail,
  };
};
