import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize } from "serializr";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import axiosInstance from "src/interceptor/axiosInstance";
import { ResponseModel } from "src/models/response.model";
import { StaffMemberDetails } from "src/models/staffMember.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { renderNotification } from "src/shared/utils/renderNotification";

const { GET_STAFF_MEMBER_DETAILS } = QueryKeys;
const { STAFF_MEMBER_DETAILS } = ApiRoutes;
const { DELETE_STAFF_MEMBER } = MutationKeys;

export const StaffMembersService = () => {
  const staffMembersDeatils = (
    id: string,
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
      return deserialize(StaffMemberDetails, response?.data?.staff);
    },
    enabled: !!id,
  });

  const deleteStaffMember = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    string
  > => ({
    mutationKey: [DELETE_STAFF_MEMBER],
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(
        generatePath(STAFF_MEMBER_DETAILS, { id }),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description, NotificationTypes.ERROR);
    },
  });

  return {
    staffMembersDeatils,
    deleteStaffMember,
  };
};
