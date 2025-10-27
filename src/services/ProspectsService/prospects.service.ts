import { UseQueryOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize, serialize } from "serializr";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import {
  ProspectsListingParams,
  ProspectsListResponse,
} from "src/models/prospects.model";
import { ResponseModel } from "src/models/response.model";
import { ProspectData } from "src/models/viewProspect.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";

const { GET_PROSPECTS, GET_SINGLE_PROSPECT } = QueryKeys;
const { PROSPECTS, GET_PROSPECT } = ApiRoutes;

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
      const response = await axiosInstance.get(PROSPECTS, {
        params: serialize(ProspectsListingParams, params),
      });

      return deserialize(ProspectsListResponse, response?.data);
    },
  });

  const viewProspect = (
    id: string,
  ): UseQueryOptions<ProspectData, ResponseModel, ProspectData> => ({
    queryKey: [GET_SINGLE_PROSPECT, id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        generatePath(GET_PROSPECT, { id }),
      );
      return (
        deserialize(ProspectData, response?.data?.data) ?? new ProspectData()
      );
    },
    enabled: !!id,
  });

  return {
    getProspects,
    viewProspect,
  };
};
