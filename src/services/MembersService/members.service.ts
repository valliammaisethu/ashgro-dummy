import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize, serialize } from "serializr";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { MemberDetails, MemberFormData } from "src/models/members.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";

const { MEMBERS, MEMBER_DETAILS } = ApiRoutes;
const { ADD_MEMBER } = MutationKeys;

const { GET_MEMBER_DETAILS } = QueryKeys;

export const MembersService = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const MembersDetails = (
    id: string,
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
          member: { ...rest, clubId: clubId },
          activityDetails,
        }),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
    },
  });

  return {
    addMember,
    MembersDetails,
  };
};
