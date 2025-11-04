import { UseQueryOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize } from "serializr";

import { QueryKeys } from "src/enums/cacheEvict.enum";
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

const { MEMBERSHIP_STATUS, MEMBERSHIP_TYPE_STATUS } = ApiRoutes;

const { GET_MEMBERSHIP_STATUS, GET_MEMBERSHIP_TYPE_STATUS } = QueryKeys;

export const MemberShipService = () => {
  const user = localStorageHelper.getItem(LocalStorageKeys.USER) as UserData;
  const clubId = user?.clubId;

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
          response?.data?.membershipStatuses,
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
          response?.data?.membershipCategories,
        ) as MemberShipTypeStatus[];
      },
      enabled: !!clubId,
    };
  };

  return {
    memberShipStatuses,
    memberShipTypeStatuses,
  };
};
