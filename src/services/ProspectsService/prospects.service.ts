import {
  UseMutationOptions,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize, serialize } from "serializr";
import { deleteProspectMessages } from "src/constants/notificationMessages";
import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import axiosInstance from "src/interceptor/axiosInstance";
import {
  ProspectFormData,
  ProspectsListData,
  ProspectsListingParams,
} from "src/models/prospects.model";
import { ResponseModel } from "src/models/response.model";
import { ProspectData } from "src/models/viewProspect.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { cleanObject } from "src/shared/utils/helpers";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";
import { TranscriptData } from "src/models/transcripts.model";
import { QueryParams } from "src/models/queryParams.model";

const {
  GET_PROSPECTS,
  GET_SINGLE_PROSPECT,
  GET_TRANSCRIPTS: GET_TRANSCRIPTSQUERY,
} = QueryKeys;
const {
  PROSPECTS,
  GET_PROSPECT,
  CONVERT_TO_MEMBER: CONVERT_TO_MEMBER_ROUTE,
  GET_TRANSCRIPTS,
} = ApiRoutes;
const { ADD_PROSPECT, EDIT_PROSPECT, DELETE_PROSPECT, CONVERT_TO_MEMBER } =
  MutationKeys;

const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

export const ProspectsService = () => {
  const queryClient = useQueryClient();
  const getProspects = (
    params: ProspectsListingParams = new ProspectsListingParams(),
  ): UseQueryOptions<ProspectsListData, ResponseModel, ProspectsListData> => ({
    queryKey: [GET_PROSPECTS, params],
    enabled: !!params.clubId,
    queryFn: async () => {
      const response = await axiosInstance.get(PROSPECTS, {
        params: serialize(ProspectsListingParams, params),
      });

      return deserialize(ProspectsListData, response?.data?.data);
    },
  });

  const viewProspect = (
    id = "",
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

  const editProspect = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    ProspectFormData
  > => ({
    mutationKey: [EDIT_PROSPECT],
    mutationFn: async (data: ProspectFormData) => {
      const response = await axiosInstance.put(
        generatePath(GET_PROSPECT, { id: data?.prospect?.id }),
        serialize(
          ProspectFormData,
          cleanObject({
            prospect: { ...data.prospect, clubId: clubId },
          }),
        ),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
      queryClient.invalidateQueries({ queryKey: [GET_PROSPECTS] });
    },
  });

  const deleteProspect = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    string
  > => ({
    mutationKey: [DELETE_PROSPECT],
    mutationFn: async (id: string) => {
      return await axiosInstance.delete(generatePath(GET_PROSPECT, { id }));
    },
    onSuccess: () => {
      const { title, description } = deleteProspectMessages;
      renderNotification(title, description, NotificationTypes.ERROR);
    },
  });

  const convertToMember = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    string
  > => ({
    mutationKey: [CONVERT_TO_MEMBER],
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(
        generatePath(CONVERT_TO_MEMBER_ROUTE, { id }),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description, NotificationTypes.SUCCESS);
    },
  });

  const getTranscripts = async (params: Partial<QueryParams>) => {
    const { id, ...pageParams } = params;
    const serializedParams = serialize(QueryParams, pageParams);
    const response = await axiosInstance.get(
      generatePath(GET_TRANSCRIPTS, { clubId, id }),
      {
        params: serializedParams,
      },
    );
    const data = deserialize(TranscriptData, response?.data?.data);

    return {
      data: [data],
      meta: data?.pagination,
    };
  };

  return {
    getProspects,
    viewProspect,
    addProspect,
    editProspect,
    deleteProspect,
    convertToMember,
    getTranscripts,
  };
};
