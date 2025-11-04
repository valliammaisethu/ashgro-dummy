import { UseMutationOptions } from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";

import { MutationKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { MemberFormData } from "src/models/members.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";

const { MEMBERS } = ApiRoutes;
const { ADD_MEMBER } = MutationKeys;

export const MembersService = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

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
  };
};
