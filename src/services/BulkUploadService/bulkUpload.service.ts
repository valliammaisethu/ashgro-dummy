import { UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";
import { generatePath } from "react-router-dom";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { TemplateEntity } from "src/enums/templateEntity.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { ResponseModel } from "src/models/response.model";
import {
  BulkUploadParams,
  BulkImportStatusResponse,
} from "src/models/bulkUpload.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";

const {
  BULK_IMPORT,
  CHECK_BULK_IMPORT_STATUS_PROSPECTS,
  CHECK_BULK_IMPORT_STATUS_MEMBERS,
} = ApiRoutes;
const { BULK_UPLOAD, CHECK_BULK_IMPORT_STATUS } = MutationKeys;
const { GET_MEMBERS, GET_PROSPECTS } = QueryKeys;

interface BulkUploadMutationParams extends BulkUploadParams {
  entity: TemplateEntity;
}

interface CheckBulkImportStatusParams {
  clubId: string;
  entity: TemplateEntity;
}

export const BulkUploadService = () => {
  const queryClient = useQueryClient();
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const getQueryKey = (entity: TemplateEntity) =>
    entity === TemplateEntity.MEMBER ? GET_MEMBERS : GET_PROSPECTS;

  const getEntityPath = (entity: TemplateEntity) =>
    entity === TemplateEntity.MEMBER ? "members" : "prospects";

  const getStatusEndpoint = (entity: TemplateEntity) =>
    entity === TemplateEntity.MEMBER
      ? CHECK_BULK_IMPORT_STATUS_MEMBERS
      : CHECK_BULK_IMPORT_STATUS_PROSPECTS;

  const bulkUpload = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    BulkUploadMutationParams
  > => ({
    mutationKey: [BULK_UPLOAD],
    mutationFn: async ({ entity, ...params }) => {
      const serializedParams = serialize(BulkUploadParams, params);

      const { data } = await axiosInstance.post(
        generatePath(BULK_IMPORT, { entity: getEntityPath(entity) }),
        serializedParams,
      );
      return deserialize(ResponseModel, data);
    },
    onSuccess: (_response, { entity }) => {
      queryClient.invalidateQueries({
        queryKey: [getQueryKey(entity), clubId],
      });
    },
  });

  const checkBulkImportStatus = (): UseMutationOptions<
    BulkImportStatusResponse,
    ResponseModel,
    CheckBulkImportStatusParams
  > => ({
    mutationKey: [CHECK_BULK_IMPORT_STATUS],
    mutationFn: async ({ clubId, entity }) => {
      const { data } = await axiosInstance.get(getStatusEndpoint(entity), {
        params: { clubId },
      });
      return deserialize(BulkImportStatusResponse, data);
    },
  });

  return {
    bulkUpload,
    checkBulkImportStatus,
  };
};
