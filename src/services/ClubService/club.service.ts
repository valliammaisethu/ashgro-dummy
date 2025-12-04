import {
  UseMutationOptions,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { generatePath } from "react-router-dom";
import { deserialize, serialize } from "serializr";
import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import {
  ClubData,
  ClubFormData,
  ClubKnowledgeBasePayload,
  ClubListReponse,
  ClubStatus,
  ClubStatusResponse,
  ClubGeneralSettings,
  ClubGeneralSettingsResponse,
} from "src/models/club.model";
import { ProfileDetails } from "src/models/profile.model";
import { QueryParams } from "src/models/queryParams.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { QueryKeyType } from "src/shared/types/sharedComponents.type";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";

const { GET_CLUBS, GET_CLUB_PROFILE } = QueryKeys;
const {
  GET_CLUBS: GET_CLUBS_ROUTE,
  GET_CLUB_PROFILE: GET_CLUB_PROFILE_ROUTE,
  UPLOAD_CHATBOT_KNOWLEDGE_BASE: UPLOAD_CHATBOT_KNOWLEDGE_BASE_ROUTE,
  UPDATE_CLUB_PROFILE: UPDATE_CLUB_PROFILE_ROUTE,
  UNLOCK_CLUB: UNLOCK_CLUB_ROUTE,
  UPDATE_CLUB_GENERAL_SETTINGS: UPDATE_CLUB_GENERAL_SETTINGS_ROUTE,
} = ApiRoutes;
const {
  ADD_CLUB,
  EDIT_CLUB,
  EDIT_CHATBOT,
  UPLOAD_CHATBOT_KNOWLEDGE_BASE,
  UPDATE_CLUB_PROFILE,
  UNLOCK_CLUB,
  UPDATE_CLUB_GENERAL_SETTINGS,
} = MutationKeys;

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
      const { data } = await axiosInstance.post(GET_CLUBS_ROUTE, body);
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
      );
      return deserialize(ResponseModel, data);
    },
    onSuccess: (response) =>
      handleSuccess(queryClient)({
        response,
        invalidateKeys: [[GET_CLUBS], [GET_CLUB_PROFILE, id]],
      }),
  });

  const updateStatus = (): UseMutationOptions<
    ClubStatusResponse,
    ClubStatusResponse,
    ClubStatus
  > => ({
    mutationKey: [EDIT_CHATBOT],
    mutationFn: async (body: ClubStatus) => {
      const { data } = await axiosInstance.patch(
        generatePath(GET_CLUB_PROFILE_ROUTE, { id: body.id }),
        body,
      );
      return deserialize(ClubStatusResponse, data);
    },
    onSuccess: (response) =>
      handleSuccess(queryClient)({
        response,
        invalidateKeys: [[GET_CLUBS], [GET_CLUB_PROFILE]],
      }),
  });

  const updateGeneralSettings = (): UseMutationOptions<
    ClubGeneralSettingsResponse,
    ClubGeneralSettingsResponse,
    ClubGeneralSettings
  > => ({
    mutationKey: [UPDATE_CLUB_GENERAL_SETTINGS],
    mutationFn: async (body: ClubGeneralSettings) => {
      const { data } = await axiosInstance.patch(
        generatePath(UPDATE_CLUB_GENERAL_SETTINGS_ROUTE, { id: body.clubId }),
        body,
      );
      return deserialize(ClubGeneralSettingsResponse, data);
    },
    onSuccess: (response) =>
      handleSuccess(queryClient)({
        response,
        invalidateKeys: [[GET_CLUBS], [GET_CLUB_PROFILE]],
      }),
  });
  const uploadKnowledgeBase = (): UseMutationOptions<
    ResponseModel,
    AxiosError,
    ClubKnowledgeBasePayload
  > => ({
    mutationKey: [UPLOAD_CHATBOT_KNOWLEDGE_BASE],
    mutationFn: async (body: ClubKnowledgeBasePayload) => {
      const { data } = await axiosInstance.post(
        generatePath(UPLOAD_CHATBOT_KNOWLEDGE_BASE_ROUTE, { id: body.clubId }),
        serialize(ClubKnowledgeBasePayload, body),
      );
      return deserialize(ResponseModel, data);
    },
  });

  const updateClubProfile = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    ProfileDetails
  > => ({
    mutationKey: [UPDATE_CLUB_PROFILE],
    mutationFn: async (body: ProfileDetails) => {
      const { data } = await axiosInstance.post(
        generatePath(UPDATE_CLUB_PROFILE_ROUTE, { id: body.id }),
        serialize(ProfileDetails, body),
      );
      return deserialize(ResponseModel, data);
    },
    onSuccess: (response, variables) => {
      handleSuccess(queryClient)({
        response,
      });
      // TODO: check with BE for updated response in the API
      const oldUser = localStorageHelper.getItem(LocalStorageKeys.USER);
      const updatedUser = {
        ...oldUser,
        ...variables,
      };
      localStorageHelper.setItem(LocalStorageKeys.USER, updatedUser);
    },
  });

  const unlockClub = (
    id: string,
  ): UseMutationOptions<ResponseModel, ResponseModel> => ({
    mutationKey: [UNLOCK_CLUB],
    mutationFn: async () => {
      const { data } = await axiosInstance.get(
        generatePath(UNLOCK_CLUB_ROUTE, { id }),
      );
      return deserialize(ResponseModel, data);
    },
    onSuccess: (response) => {
      const { description, title } = response;
      renderNotification(title, description);
    },
  });

  return {
    getClubs,
    getClubProfile,
    addClub,
    editClub,
    updateStatus,
    updateGeneralSettings,
    uploadKnowledgeBase,
    updateClubProfile,
    unlockClub,
  };
};
