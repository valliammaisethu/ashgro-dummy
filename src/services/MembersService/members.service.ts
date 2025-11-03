import { UseQueryOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize } from "serializr";

import { QueryKeys } from "src/enums/cacheEvict.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { MemberDetails } from "src/models/members.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";

const { MEMBER_DETAILS } = ApiRoutes;

const { GET_MEMBER_DETAILS } = QueryKeys;

export const MembersService = () => {
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

  return {
    MembersDetails,
  };
};
