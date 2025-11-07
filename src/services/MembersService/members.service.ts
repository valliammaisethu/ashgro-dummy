import {
  UseMutationOptions,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize, serialize } from "serializr";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { CountryCode } from "src/enums/countryCodes.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import {
  MemberDetails,
  MemberFormData,
  MembersListData,
  MembersListingParams,
} from "src/models/members.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";

const { MEMBERS, MEMBER_DETAILS, MEMBERS_LIST } = ApiRoutes;
const { ADD_MEMBER, UPDATE_MEMBER_STATUS, DELETE_RESOURCE } = MutationKeys;

const { GET_MEMBER_DETAILS, GET_MEMBERS } = QueryKeys;

interface UpdateMemberStatusParams {
  memberId?: string;
  membershipStatusId?: string;
}

export const MembersService = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;
  const queryClient = useQueryClient();

  const MembersDetails = (
    id?: string,
  ): UseQueryOptions<MemberDetails, ResponseModel, MemberDetails> => ({
    queryKey: [GET_MEMBER_DETAILS, id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        generatePath(MEMBER_DETAILS, { id }),
      );

      return deserialize(MemberDetails, response?.data?.data?.member);
    },
    enabled: !!id,
  });

  const addMember = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    MemberFormData
  > => ({
    mutationKey: [ADD_MEMBER],
    mutationFn: async (payload: MemberFormData) => {
      const { activityDetails, ...rest } = payload;

      const response = await axiosInstance.post(
        MEMBERS,
        serialize(MemberFormData, {
          member: { ...rest, clubId: clubId, countryCode: CountryCode.USA },
          activityDetails,
        }),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
      queryClient.invalidateQueries({
        queryKey: [GET_MEMBERS, clubId],
      });
    },
  });

  const getStaffMembersList = (
    params: MembersListingParams = new MembersListingParams(),
  ): UseQueryOptions<MembersListData, ResponseModel, MembersListData> => ({
    queryKey: [GET_MEMBERS, clubId, params],
    queryFn: async () => {
      const updatedParams = { ...params, clubId };

      const response = await axiosInstance.get(MEMBERS_LIST, {
        params: serialize(MembersListingParams, updatedParams),
      });

      return deserialize(MembersListData, response?.data?.data);
    },
    enabled: !!clubId,
  });

  const updateMemberStatus = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    UpdateMemberStatusParams
  > => ({
    mutationKey: [UPDATE_MEMBER_STATUS],
    mutationFn: async ({ memberId, membershipStatusId }) => {
      const response = await axiosInstance.patch(
        generatePath(MEMBER_DETAILS, { id: memberId }),
        {
          member: { membershipStatusId },
        },
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: ({ title, description }) => {
      renderNotification(title, description);
      queryClient.invalidateQueries({ queryKey: [GET_MEMBERS, clubId] });
    },
  });

  const updateMemberDetails = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    MemberFormData
  > => ({
    mutationKey: [ADD_MEMBER],
    mutationFn: async (payload: MemberFormData) => {
      const { activityDetails, ...rest } = payload;

      const response = await axiosInstance.put(
        generatePath(MEMBER_DETAILS, {
          id: (payload as Record<string, unknown>)["id"],
        }),
        serialize(MemberFormData, {
          member: { ...rest, clubId: clubId, countryCode: CountryCode.USA },
          activityDetails,
        }),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
      queryClient.invalidateQueries({
        queryKey: [GET_MEMBERS, clubId],
      });
    },
  });

  return {
    addMember,
    MembersDetails,
    getStaffMembersList,
    updateMemberStatus,
    updateMemberDetails,
  };
};
