import { UseQueryOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize, serialize } from "serializr";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { BaseSettingsModel } from "src/models/common.model";
import {
  ActivityTypesData,
  EmailTemplatesData,
  LeadSourceParams,
  LeadSourcesData,
  LeadStatusesData,
  LeadStatusParams,
  MembershipCategoriesData,
  StaffDepartmentsData,
  MembershipStatusParams,
  MembershipStatusData,
} from "src/models/meta.model";
import { Pagination } from "src/models/pagination.model";
import { QueryParams } from "src/models/queryParams.model";
import { ResponseModel } from "src/models/response.model";
import { UserData } from "src/models/user.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";

const {
  GET_ACTIVITY_TYPES,
  GET_MEMBERSHIP_CATEGORIES,
  GET_MEMBERSHIP_STATUSES,
  GET_LEAD_SOURCES,
  GET_LEAD_STATUSES,
  GET_EMAIL_TEMPLATES,
  GET_STAFF_DEPARTMENTS,
} = ApiRoutes;
const {
  GET_ACTIVITY_TYPES: GET_ACTIVITY_TYPES_KEY,
  GET_MEMBERSHIP_CATEGORIES: GET_MEMBERSHIP_CATEGORIES_KEY,
  GET_MEMBERSHIP_STATUSES: GET_MEMBERSHIP_STATUSES_KEY,
  GET_LEAD_SOURCES: GET_LEAD_SOURCES_KEY,
  GET_LEAD_STATUS: GET_LEAD_STATUS_KEY,
  GET_EMAIL_TEMPLATES: GET_EMAIL_TEMPLATES_KEY,
  GET_STAFF_DEPARTMENTS: GET_STAFF_DEPARTMENTS_KEY,
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
        const { data } = await axiosInstance.get(
          generatePath(GET_MEMBERSHIP_CATEGORIES, { id: clubId }),
        );

        return deserialize(MembershipCategoriesData, data?.data);
      },
      enabled: !!clubId,
    };
  };

  const getMembershipStatuses = (
    params: MembershipStatusParams = new MembershipStatusParams(),
  ): UseQueryOptions<
    MembershipStatusData,
    ResponseModel,
    MembershipStatusData
  > => {
    return {
      queryKey: [GET_MEMBERSHIP_STATUSES_KEY, clubId],
      queryFn: async () => {
        const { data } = await axiosInstance.get(
          generatePath(GET_MEMBERSHIP_STATUSES, { id: clubId }),
          {
            params: serialize(MembershipStatusParams, params),
          },
        );

        return deserialize(MembershipStatusData, data?.data);
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
      const { data } = await axiosInstance.get(
        generatePath(GET_EMAIL_TEMPLATES, { id: clubId }),
      );
      return deserialize(EmailTemplatesData, data?.data);
    },
    enabled: !!clubId,
  });

  const getStaffDepartments = (): UseQueryOptions<
    StaffDepartmentsData,
    ResponseModel
  > => ({
    queryKey: [GET_STAFF_DEPARTMENTS_KEY, clubId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        generatePath(GET_STAFF_DEPARTMENTS, { id: clubId }),
      );
      return deserialize(StaffDepartmentsData, response?.data?.data);
    },
    enabled: !!clubId,
  });

  return {
    getActivityTypes,
    getMembershipCategories,
    getMembershipStatuses,
    getLeadSources,
    getLeadStatuses,
    getEmailTemplates,
    getStaffDepartments,
  };
};

export const getMembersMetaList = async (params: Partial<QueryParams>) => {
  const { data } = await axiosInstance.get(ApiRoutes.MEMBERS_META_LIST, {
    params: serialize(QueryParams, params),
  });

  const members = deserialize(BaseSettingsModel, data.members as unknown[]);

  const meta = deserialize(Pagination, data?.pagination);

  return { data: members, meta };
};

export const getProspectssMetaList = async (params: Partial<QueryParams>) => {
  const { data } = await axiosInstance.get(ApiRoutes.PROSPECTS_META_LIST, {
    params: serialize(QueryParams, params),
  });

  const prospects = deserialize(BaseSettingsModel, data.prospects as unknown[]);

  const meta = deserialize(Pagination, data?.pagination);

  return { data: prospects, meta };
};
