import { UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { ResponseModel } from "src/models/response.model";
import { BulkUploadParams } from "src/models/bulkUpload.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";

const { BULK_IMPORT_MEMBERS, BULK_IMPORT_PROSPECTS } = ApiRoutes;
const { BULK_UPLOAD_MEMBERS, BULK_UPLOAD_PROSPECTS } = MutationKeys;
const { GET_MEMBERS, GET_PROSPECTS } = QueryKeys;

export const BulkUploadService = () => {
  const queryClient = useQueryClient();
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const bulkUploadMembers = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    BulkUploadParams
  > => ({
    mutationKey: [BULK_UPLOAD_MEMBERS],
    mutationFn: async (params: BulkUploadParams) => {
      const serializedParams = serialize(BulkUploadParams, params);
      const response = await axiosInstance.post(
        BULK_IMPORT_MEMBERS,
        serializedParams,
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
      queryClient.invalidateQueries({
        queryKey: [GET_MEMBERS, clubId],
      });
    },
  });

  const bulkUploadProspects = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    BulkUploadParams
  > => ({
    mutationKey: [BULK_UPLOAD_PROSPECTS],
    mutationFn: async (params: BulkUploadParams) => {
      const serializedParams = serialize(BulkUploadParams, params);
      const response = await axiosInstance.post(
        BULK_IMPORT_PROSPECTS,
        serializedParams,
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
      queryClient.invalidateQueries({
        queryKey: [GET_PROSPECTS, clubId],
      });
    },
  });

  return {
    bulkUploadMembers,
    bulkUploadProspects,
  };
};
