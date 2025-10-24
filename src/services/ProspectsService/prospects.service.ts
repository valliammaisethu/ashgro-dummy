import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize, serialize } from "serializr";
import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import {
  ProspectFormData,
  ProspectsListingParams,
  ProspectsListResponse,
} from "src/models/prospects.model";
import { ResponseModel } from "src/models/response.model";
import { ProspectData } from "src/models/viewProspect.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { cleanObject } from "src/shared/utils/helpers";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";

const { GET_PROSPECTS, GET_SINGLE_PROSPECT } = QueryKeys;
const { PROSPECTS, GET_PROSPECT } = ApiRoutes;
const { ADD_PROSPECT } = MutationKeys;

export const ProspectsService = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;
  const getProspects = (
    params: ProspectsListingParams = new ProspectsListingParams(),
  ): UseQueryOptions<
    ProspectsListResponse,
    ResponseModel,
    ProspectsListResponse
  > => ({
    queryKey: [GET_PROSPECTS, params],
    enabled: !!params.clubId,
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
      return deserialize(ProspectData, response?.data?.data);
    },
    enabled: !!id,
    initialData: new ProspectData(),
  });

  const addProspect = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    ProspectFormData
  > => ({
    mutationKey: [ADD_PROSPECT],
    mutationFn: async (data: ProspectFormData) => {
      const response = await axiosInstance.post(
        PROSPECTS,
        serialize(
          ProspectFormData,
          cleanObject({
            prospect: { ...data.prospect, clubId: clubId },
            activityDetails: data.activityDetails,
          }),
        ),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
    },
  });

  return {
    getProspects,
    viewProspect,
    addProspect,
  };
};
