import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize } from "serializr";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import axiosInstance from "src/interceptor/axiosInstance";
import { QueryParams } from "src/models/queryParams.model";
import { ResponseModel } from "src/models/response.model";
import {
  StaffMemberDetails,
  StaffMemberListData,
} from "src/models/staffMember.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";

const { GET_STAFF_MEMBER_DETAILS, GET_STAFF_MEMBER_LIST } = QueryKeys;
const { STAFF_MEMBER_DETAILS, STAFF_MEMBERS } = ApiRoutes;
const { DELETE_STAFF_MEMBER } = MutationKeys;

export const StaffMembersService = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

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

  const getStaffMembersList = (
    params?: QueryParams,
  ): UseQueryOptions<
    StaffMemberListData,
    ResponseModel,
    StaffMemberListData
  > => ({
    queryKey: [GET_STAFF_MEMBER_LIST, clubId],
    queryFn: async () => {
      const updatedParams = { ...params, clubId };
      const test = {
        data: {
          title: "",
          description: "",
          data: {
            staffs: [
              {
                id: "123",
                attachmentId: "123",
                profilePictureUrl:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfF5pfAmeOUUMNb0mt8ZTgx5FN74ihWwsv2A&s",
                firstName: "name1",
                lastName: "name2",
                email: "sample@mail.com",
                staffDepartment: "status1",
                title: "title",
              },
              {
                id: "123",
                attachmentId: "123",
                profilePictureUrl:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfF5pfAmeOUUMNb0mt8ZTgx5FN74ihWwsv2A&s",
                firstName: "name1",
                lastName: "name2",
                email: "sample@mail.com",
                staffDepartment: "status1",
                title: "title",
              },
              {
                id: "123",
                attachmentId: "123",
                profilePictureUrl:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfF5pfAmeOUUMNb0mt8ZTgx5FN74ihWwsv2A&s",
                firstName: "name1",
                lastName: "name2",
                email: "sample@mail.com",
                staffDepartment: "status1",
                title: "title",
              },
            ],
            pagination: {
              limit: 10,
              page: 1,
              overallPages: 2,
              overallCount: 12,
              previousPage: null,
              currentPage: 1,
              nextPage: 2,
            },
          },
          success: true,
        },
      };
      // const response = await axiosInstance.get(STAFF_MEMBERS, {
      //   params: serialize(QueryParams, updatedParams)
      // });

      return deserialize(StaffMemberListData, test?.data?.data);
    },
    enabled: !!clubId,
  });

  return {
    staffMembersDeatils,
    deleteStaffMember,
    getStaffMembersList,
  };
};
