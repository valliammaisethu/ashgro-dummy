import {
  UseMutationOptions,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize } from "serializr";
import {
  getEmailTemplatePayload,
  getRequestConfig,
  OperationParams,
} from "src/constants/apiConstants";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { EmailTemplate, EmailTemplateDetail } from "src/models/meta.model";
import { ResponseModel } from "src/models/response.model";
import { UserData } from "src/models/user.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";

const { EMAIL_TEMPLATES_SETTINGS_LIST, EMAIL_TEMPLATE_DETAIL } = ApiRoutes;

const { GET_EMAIL_TEMPLATES_LIST, GET_EMAIL_TEMPLATE_DETAIL } = QueryKeys;

const { ADD_LEAD_SOURCE_OR_STATUS, DELETE_LEAD } = MutationKeys;

export const EmailTemplateService = () => {
  const user = localStorageHelper.getItem(LocalStorageKeys.USER) as UserData;
  const clubId = user?.clubId;
  const queryClient = useQueryClient();

  const handleSuccessResponse = (title?: string, description?: string) => {
    renderNotification(title, description);
    queryClient.invalidateQueries({
      queryKey: [GET_EMAIL_TEMPLATES_LIST, clubId],
    });
  };

  const emailTemplateList = (): UseQueryOptions<
    EmailTemplate[],
    ResponseModel,
    EmailTemplate[]
  > => {
    return {
      queryKey: [GET_EMAIL_TEMPLATES_LIST, clubId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          generatePath(EMAIL_TEMPLATES_SETTINGS_LIST, { id: clubId }),
        );

        return deserialize(
          EmailTemplate,
          response?.data?.data?.emailTemplates,
        ) as EmailTemplate[];
      },
      enabled: !!clubId,
    };
  };

  const getEmailTemplate = (
    emailTemplateId?: string,
  ): UseQueryOptions<
    EmailTemplateDetail,
    ResponseModel,
    EmailTemplateDetail
  > => {
    return {
      queryKey: [GET_EMAIL_TEMPLATE_DETAIL, clubId, emailTemplateId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          generatePath(EMAIL_TEMPLATE_DETAIL, { id: clubId, emailTemplateId }),
        );

        return deserialize(
          EmailTemplateDetail,
          response?.data?.data?.emailTemplate,
        ) as EmailTemplateDetail;
      },
      enabled: !!clubId && !!emailTemplateId,
    };
  };

  const emailTemplateOperations = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    OperationParams
  > => ({
    mutationKey: [ADD_LEAD_SOURCE_OR_STATUS],
    mutationFn: async ({ type, id, data }) => {
      const payload = getEmailTemplatePayload(type, data);

      const { endpoint, method } = getRequestConfig(type, !!id);

      const response = await axiosInstance[method](
        generatePath(endpoint, { clubId, id }),
        payload,
      );

      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: ({ title, description }) =>
      handleSuccessResponse(title, description),
  });

  const deleteEmailTemplate = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    OperationParams
  > => ({
    mutationKey: [DELETE_LEAD],
    mutationFn: async ({ type, id }) => {
      const { endpoint } = getRequestConfig(type, !!id);

      const response = await axiosInstance.delete(
        generatePath(endpoint, { clubId, id }),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: ({ title, description }) => {
      handleSuccessResponse(title, description);
    },
  });

  return {
    emailTemplateList,
    getEmailTemplate,
    emailTemplateOperations,
    deleteEmailTemplate,
  };
};
