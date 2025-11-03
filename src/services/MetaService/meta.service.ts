import { UseQueryOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize, serialize } from "serializr";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import {
  ActivityTypesData,
  EmailTemplatesData,
  LeadSourceParams,
  LeadSourcesData,
  LeadStatusesData,
  LeadStatusParams,
  MembershipCategoriesData,
} from "src/models/meta.model";
import { ResponseModel } from "src/models/response.model";
import { UserData } from "src/models/user.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";

const {
  GET_ACTIVITY_TYPES,
  GET_MEMBERSHIP_CATEGORIES,
  GET_LEAD_SOURCES,
  GET_LEAD_STATUSES,
  GET_EMAIL_TEMPLATES,
} = ApiRoutes;
const {
  GET_ACTIVITY_TYPES: GET_ACTIVITY_TYPES_KEY,
  GET_MEMBERSHIP_CATEGORIES: GET_MEMBERSHIP_CATEGORIES_KEY,
  GET_LEAD_SOURCES: GET_LEAD_SOURCES_KEY,
  GET_LEAD_STATUS: GET_LEAD_STATUS_KEY,
  GET_EMAIL_TEMPLATES: GET_EMAIL_TEMPLATES_KEY,
} = QueryKeys;

export const MetaService = () => {
  const user = localStorageHelper.getItem(LocalStorageKeys.USER) as UserData;
  const clubId = user?.clubId;
  const getLeadSources = (
    params: LeadSourceParams = new LeadSourceParams(),
  ): UseQueryOptions<LeadSourcesData, ResponseModel, LeadSourcesData> => {
    return {
      queryKey: [GET_LEAD_SOURCES_KEY, clubId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          generatePath(GET_LEAD_SOURCES, { id: clubId }),
          {
            params: serialize(LeadSourceParams, params),
          },
        );

        return deserialize(LeadSourcesData, response?.data?.data);
      },
      enabled: !!clubId,
    };
  };
  const getLeadStatuses = (
    params: LeadStatusParams = new LeadStatusParams(),
  ): UseQueryOptions<LeadStatusesData, ResponseModel, LeadStatusesData> => {
    return {
      queryKey: [GET_LEAD_STATUS_KEY, clubId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          generatePath(GET_LEAD_STATUSES, { id: clubId }),
          {
            params: serialize(LeadStatusParams, params),
          },
        );

        return deserialize(LeadStatusesData, response?.data?.data) ?? [];
      },
      enabled: !!clubId,
    };
  };
  const getActivityTypes = (): UseQueryOptions<
    ActivityTypesData,
    ResponseModel,
    ActivityTypesData
  > => {
    return {
      queryKey: [GET_ACTIVITY_TYPES_KEY, clubId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          generatePath(GET_ACTIVITY_TYPES, { id: clubId }),
        );

        return deserialize(ActivityTypesData, response?.data?.data);
      },
      enabled: !!clubId,
    };
  };

  const getMembershipCategories = (): UseQueryOptions<
    MembershipCategoriesData,
    ResponseModel,
    MembershipCategoriesData
  > => {
    return {
      queryKey: [GET_MEMBERSHIP_CATEGORIES_KEY, clubId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          generatePath(GET_MEMBERSHIP_CATEGORIES, { id: clubId }),
        );

        return deserialize(MembershipCategoriesData, response?.data?.data);
      },
      enabled: !!clubId,
    };
  };

  const getEmailTemplates = (): UseQueryOptions<
    EmailTemplatesData,
    ResponseModel
  > => ({
    queryKey: [GET_EMAIL_TEMPLATES_KEY, clubId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        generatePath(GET_EMAIL_TEMPLATES, { id: clubId }),
      );
      return deserialize(EmailTemplatesData, response?.data?.data);
    },
    enabled: !!clubId,
  });

  return {
    getActivityTypes,
    getMembershipCategories,
    getLeadSources,
    getLeadStatuses,
    getEmailTemplates,
  };
};
