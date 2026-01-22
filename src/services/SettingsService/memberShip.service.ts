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
import {
  MemberShipStatus,
  MemberShipTypeStatus,
} from "src/models/membersShip.model";
import { ResponseModel } from "src/models/response.model";
import { UserData } from "src/models/user.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";
import { MEMBERSHIP_CONSTANTS } from "src/views/Settings/constants";

const { MEMBERSHIP_STATUS, MEMBERSHIP_TYPE_STATUS } = ApiRoutes;

const { GET_MEMBERSHIP_STATUS, GET_MEMBERSHIP_TYPE_STATUS } = QueryKeys;

const { MEMBERSHIP_OPERATIONS, DELETE_MEMBERS } = MutationKeys;

export const MemberShipService = () => {
  const { MEMBERSHIP_TYPE } = MEMBERSHIP_CONSTANTS;
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
        type === MEMBERSHIP_TYPE
          ? GET_MEMBERSHIP_STATUS
          : GET_MEMBERSHIP_TYPE_STATUS,
        clubId,
      ],
    });
  };

  const memberShipStatuses = (): UseQueryOptions<
    MemberShipStatus[],
    ResponseModel,
    MemberShipStatus[]
  > => {
    return {
      queryKey: [GET_MEMBERSHIP_STATUS, clubId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          generatePath(MEMBERSHIP_STATUS, { id: clubId }),
        );

        return deserialize(
          MemberShipStatus,
          response?.data?.data?.membershipStatuses,
        ) as MemberShipStatus[];
      },
      enabled: !!clubId,
    };
  };

  const memberShipTypeStatuses = (): UseQueryOptions<
    MemberShipTypeStatus[],
    ResponseModel,
    MemberShipTypeStatus[]
  > => {
    return {
      queryKey: [GET_MEMBERSHIP_TYPE_STATUS, clubId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          generatePath(MEMBERSHIP_TYPE_STATUS, { id: clubId }),
        );

        return deserialize(
          MemberShipTypeStatus,
          response?.data?.data?.membershipCategories,
        ) as MemberShipTypeStatus[];
      },
      enabled: !!clubId,
    };
  };

  const memberShipOperations = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    OperationParams
  > => ({
    mutationKey: [MEMBERSHIP_OPERATIONS],
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

  const deleteMember = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    OperationParams
  > => ({
    mutationKey: [DELETE_MEMBERS],
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
    memberShipStatuses,
    memberShipTypeStatuses,
    memberShipOperations,
    deleteMember,
  };
};
