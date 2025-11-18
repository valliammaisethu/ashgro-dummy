import {
  UseMutationOptions,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize, serialize } from "serializr";
import { SharedComponentsConstants } from "src/constants/sharedComponents";
import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import {
  ClubChatbotStatus,
  ClubChatbotStatusResponse,
  ClubData,
  ClubFormData,
  ClubListReponse,
} from "src/models/club.model";
import { QueryParams } from "src/models/queryParams.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { renderNotification } from "src/shared/utils/renderNotification";

const { GET_CLUBS, GET_CLUB_PROFILE } = QueryKeys;
const { GET_CLUBS: GET_CLUBS_ROUTE, GET_CLUB_PROFILE: GET_CLUB_PROFILE_ROUTE } =
  ApiRoutes;
const { ADD_CLUB, EDIT_CLUB, EDIT_CHATBOT } = MutationKeys;

type QueryKeyType = readonly unknown[];

const handleSuccess =
  (queryClient: ReturnType<typeof useQueryClient>) =>
  ({
    response,
    invalidateKeys = [],
  }: {
    response: ResponseModel;
    invalidateKeys?: QueryKeyType[];
  }) => {
    const { title, description } = response;
    renderNotification(title, description);

    invalidateKeys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: key });
    });
  };

export const ClubService = () => {
  const queryClient = useQueryClient();
  const getClubs = (
    params = new QueryParams(),
  ): UseQueryOptions<ClubListReponse, ResponseModel, ClubListReponse> => ({
    queryKey: [GET_CLUBS, params],
    queryFn: async () => {
      const { data } = await axiosInstance.get(GET_CLUBS_ROUTE, {
        params: serialize(QueryParams, params),
        baseURL: SharedComponentsConstants.MOCKURL,
      });
      return deserialize(ClubListReponse, data?.data);
    },
  });

  const getClubProfile = (
    id: string,
  ): UseQueryOptions<ClubData, ResponseModel, ClubData> => ({
    queryKey: [GET_CLUB_PROFILE, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        generatePath(GET_CLUB_PROFILE_ROUTE, { id }),
        {
          baseURL: SharedComponentsConstants.MOCKURL,
        },
      );
      return deserialize(ClubData, data?.data);
    },
    enabled: !!id,
  });

  const addClub = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    ClubFormData
  > => ({
    mutationKey: [ADD_CLUB],
    mutationFn: async (body: ClubFormData) => {
      const { data } = await axiosInstance.post(GET_CLUBS_ROUTE, body, {
        baseURL: SharedComponentsConstants.MOCKURL,
      });
      return deserialize(ResponseModel, data);
    },
    onSuccess: (response) =>
      handleSuccess(queryClient)({
        response,
        invalidateKeys: [[GET_CLUBS]],
      }),
  });

  const editClub = (
    id?: string,
  ): UseMutationOptions<ResponseModel, ResponseModel, ClubFormData> => ({
    mutationKey: [EDIT_CLUB],
    mutationFn: async (body: ClubFormData) => {
      const { data } = await axiosInstance.put(
        generatePath(GET_CLUB_PROFILE_ROUTE, { id }),
        body,
        {
          baseURL: SharedComponentsConstants.MOCKURL,
        },
      );
      return deserialize(ResponseModel, data);
    },
    onSuccess: (response) =>
      handleSuccess(queryClient)({
        response,
        invalidateKeys: [[GET_CLUBS], [GET_CLUB_PROFILE, id]],
      }),
  });

  const updateChatbotStatus = (
    id: string,
  ): UseMutationOptions<
    ClubChatbotStatusResponse,
    ClubChatbotStatusResponse,
    ClubChatbotStatus
  > => ({
    mutationKey: [EDIT_CHATBOT, id],
    mutationFn: async (body: ClubChatbotStatus) => {
      const { data } = await axiosInstance.patch(
        generatePath(GET_CLUB_PROFILE_ROUTE, { id }),
        body,
        {
          baseURL: SharedComponentsConstants.MOCKURL,
        },
      );
      return deserialize(ClubChatbotStatusResponse, data);
    },
    onSuccess: (response) =>
      handleSuccess(queryClient)({
        response,
        invalidateKeys: [[GET_CLUBS], [GET_CLUB_PROFILE, id]],
      }),
  });

  return {
    getClubs,
    getClubProfile,
    addClub,
    editClub,
    updateChatbotStatus,
  };
};
