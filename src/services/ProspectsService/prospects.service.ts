import { UseQueryOptions } from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import {
  ProspectsListingParams,
  ProspectsListResponse,
} from "src/models/prospects.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";

const { GET_PROSPECTS } = QueryKeys;
const { PROSPECTS } = ApiRoutes;

export const ProspectsService = () => {
  const getProspects = (
    params: ProspectsListingParams = new ProspectsListingParams(),
  ): UseQueryOptions<
    ProspectsListResponse,
    ResponseModel,
    ProspectsListResponse
  > => ({
    queryKey: [GET_PROSPECTS, params],
    queryFn: async () => {
      const response = await axiosInstance.get(ApiRoutes.PROSPECTS, {
        params: serialize(ProspectsListingParams, params),
        baseURL:
          "https://b24ce2c7-b74e-4b10-bbee-4c0b46658b5b.mock.pstmn.io/api/v1",
      });

      return deserialize(ProspectsListResponse, response?.data);
    },
  });
  return {
    getProspects,
  };
};
