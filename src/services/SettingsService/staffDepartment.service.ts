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
import { StaffMemberSettings } from "src/models/common.model";
import { ResponseModel } from "src/models/response.model";
import { UserData } from "src/models/user.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";

const { STAFF_MEMBERS_SETTINGS_LISTING } = ApiRoutes;

const { GET_STAFF_MEMBERS_LIST, GET_STAFF_DEPARTMENTS, GET_STAFF_MEMBER_LIST } =
  QueryKeys;

const { MEMBERSHIP_OPERATIONS, DELETE_STAFF_DEPARTMENTS } = MutationKeys;

export const StaffDepartmentService = () => {
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
      queryKey: [GET_STAFF_MEMBERS_LIST, clubId],
    });
    queryClient.invalidateQueries({
      queryKey: [GET_STAFF_MEMBER_LIST, clubId],
    });
    queryClient.invalidateQueries({
      queryKey: [GET_STAFF_DEPARTMENTS, clubId],
    });
  };

  const staffMembersList = (): UseQueryOptions<
    StaffMemberSettings[],
    ResponseModel,
    StaffMemberSettings[]
  > => {
    return {
      queryKey: [GET_STAFF_MEMBERS_LIST, clubId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          generatePath(STAFF_MEMBERS_SETTINGS_LISTING, { clubId }),
        );

        return deserialize(
          StaffMemberSettings,
          response?.data?.data?.staffDepartments,
        ) as unknown as StaffMemberSettings[];
      },
      enabled: !!clubId,
    };
  };

  const staffDepartmentOperations = (): UseMutationOptions<
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

  const deleteStaffDepartment = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    OperationParams
  > => ({
    mutationKey: [DELETE_STAFF_DEPARTMENTS],
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
    staffMembersList,
    staffDepartmentOperations,
    deleteStaffDepartment,
  };
};
