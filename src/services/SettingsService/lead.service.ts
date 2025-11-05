import {
  UseMutationOptions,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize } from "serializr";
import {
  getLeadPayload,
  getRequestConfig,
  OperationParams,
} from "src/constants/apiConstants";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { LeadStatus } from "src/models/common.model";
import { LeadSources } from "src/models/lead.model";
import { ResponseModel } from "src/models/response.model";
import { UserData } from "src/models/user.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";
import { LEAD_CONSTANTS } from "src/views/Settings/constants";

const { LEAD_STATUS_SETTINGS_LIST, LEAD_SOURCES_SETTINGS_LIST } = ApiRoutes;

const { GET_LEAD_SOURCES_LIST, GET_LEAD_STATUS_LIST } = QueryKeys;

const { ADD_LEAD_SOURCE_OR_STATUS, DELETE_LEAD } = MutationKeys;

export const LeadService = () => {
  const { LEAD_TYPE } = LEAD_CONSTANTS;
  const user = localStorageHelper.getItem(LocalStorageKeys.USER) as UserData;
  const clubId = user?.clubId;
  const queryClient = useQueryClient();

  const handleSuccessRespone = (
    title?: string,
    description?: string,
    type?: string,
  ) => {
    renderNotification(title, description);
    queryClient.invalidateQueries({
      queryKey: [
        type === LEAD_TYPE ? GET_LEAD_SOURCES_LIST : GET_LEAD_STATUS_LIST,
        clubId,
      ],
    });
  };

  const leadSources = (): UseQueryOptions<
    LeadSources[],
    ResponseModel,
    LeadSources[]
  > => {
    return {
      queryKey: [GET_LEAD_SOURCES_LIST, clubId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          generatePath(LEAD_SOURCES_SETTINGS_LIST, { id: clubId }),
        );

        return deserialize(
          LeadSources,
          response?.data?.data?.leadSources,
        ) as LeadSources[];
      },
      enabled: !!clubId,
    };
  };

  const leadStatusList = (): UseQueryOptions<
    LeadStatus[],
    ResponseModel,
    LeadStatus[]
  > => {
    return {
      queryKey: [GET_LEAD_STATUS_LIST, clubId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          generatePath(LEAD_STATUS_SETTINGS_LIST, { id: clubId }),
        );

        return deserialize(
          LeadStatus,
          response?.data?.data?.leadStatuses,
        ) as unknown as LeadStatus[];
      },
      enabled: !!clubId,
    };
  };

  const leadOperations = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    OperationParams
  > => ({
    mutationKey: [ADD_LEAD_SOURCE_OR_STATUS],
    mutationFn: async ({ type, name, id }) => {
      const payload = getLeadPayload(type, name);

      const { endpoint, method } = getRequestConfig(type, !!id);

      const response = await axiosInstance[method](
        generatePath(endpoint, { clubId, id }),
        payload,
      );

      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: ({ title, description }, { type }) =>
      handleSuccessRespone(title, description, type),
  });

  const deleteLead = (): UseMutationOptions<
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
    onSuccess: ({ title, description }, { type }) => {
      handleSuccessRespone(title, description, type);
    },
  });

  return {
    leadSources,
    leadStatusList,
    leadOperations,
    deleteLead,
  };
};
