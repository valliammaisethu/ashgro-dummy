import {
  UseMutationOptions,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize, serialize } from "serializr";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import axiosInstance from "src/interceptor/axiosInstance";
import { ResponseModel } from "src/models/response.model";
import {
  StaffMemberDetails,
  StaffMemberListData,
  StaffMembersListingParams,
} from "src/models/staffMember.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";

const { GET_STAFF_MEMBER_DETAILS, GET_STAFF_MEMBER_LIST } = QueryKeys;
const { STAFF_MEMBER_DETAILS, STAFF_MEMBERS } = ApiRoutes;
const { DELETE_STAFF_MEMBER, ADD_STAFF_MEMBER, EDIT_STAFF_MEMBER } =
  MutationKeys;

export const StaffMembersService = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;
  const queryClient = useQueryClient();

  const staffMembersDeatils = (
    id?: string,
  ): UseQueryOptions<
    StaffMemberDetails,
    ResponseModel,
    StaffMemberDetails
  > => ({
    queryKey: [GET_STAFF_MEMBER_DETAILS, id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        generatePath(STAFF_MEMBER_DETAILS, { id }),
      );

      return deserialize(StaffMemberDetails, response?.data?.data?.staff);
    },
    enabled: !!id,
  });

  const deleteStaffMember = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    string | undefined
  > => ({
    mutationKey: [DELETE_STAFF_MEMBER],
    mutationFn: async (id?: string) => {
      const response = await axiosInstance.delete(
        generatePath(STAFF_MEMBER_DETAILS, { id }),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description, NotificationTypes.ERROR);
      queryClient.invalidateQueries({
        queryKey: [GET_STAFF_MEMBER_DETAILS, clubId],
        // here as well
      });
    },
  });

  const addStaffMember = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    StaffMemberDetails
  > => ({
    mutationKey: [ADD_STAFF_MEMBER],
    mutationFn: async (payload: StaffMemberDetails) => {
      const serializedPayload = serialize(StaffMemberDetails, payload);

      const response = await axiosInstance.post(STAFF_MEMBERS, {
        staff: { ...serializedPayload, clubId: clubId },
      });
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
      queryClient.invalidateQueries({
        queryKey: [GET_STAFF_MEMBER_LIST, clubId],
      });
    },
  });

  const editStaffMember = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    StaffMemberDetails
  > => ({
    mutationKey: [EDIT_STAFF_MEMBER],
    mutationFn: async (payload: StaffMemberDetails) => {
      const response = await axiosInstance.put(
        generatePath(STAFF_MEMBER_DETAILS, { id: payload?.id }),
        {
          staff: serialize(StaffMemberDetails, payload),
        },
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
      queryClient.invalidateQueries({
        queryKey: [GET_STAFF_MEMBER_LIST, clubId],
      });
    },
  });

  const getStaffMembersList = (
    params?: StaffMembersListingParams,
  ): UseQueryOptions<
    StaffMemberListData,
    ResponseModel,
    StaffMemberListData
  > => ({
    queryKey: [GET_STAFF_MEMBER_LIST, clubId, params],
    queryFn: async () => {
      const updatedParams = { ...params, clubId };

      const response = await axiosInstance.get(STAFF_MEMBERS, {
        params: serialize(StaffMembersListingParams, updatedParams),
      });

      return deserialize(StaffMemberListData, response?.data?.data);
    },
    enabled: !!clubId,
  });

  return {
    staffMembersDeatils,
    deleteStaffMember,
    getStaffMembersList,
    addStaffMember,
    editStaffMember,
  };
};
