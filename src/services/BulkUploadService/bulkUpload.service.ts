import { UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";
import { generatePath } from "react-router-dom";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { TemplateEntity } from "src/enums/templateEntity.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { ResponseModel } from "src/models/response.model";
import { BulkUploadParams } from "src/models/bulkUpload.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";

const { BULK_IMPORT } = ApiRoutes;
const { BULK_UPLOAD } = MutationKeys;
const { GET_MEMBERS, GET_PROSPECTS } = QueryKeys;

interface BulkUploadMutationParams extends BulkUploadParams {
  entity: TemplateEntity;
}

export const BulkUploadService = () => {
  const queryClient = useQueryClient();
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const getQueryKey = (entity: TemplateEntity) =>
    entity === TemplateEntity.MEMBER ? GET_MEMBERS : GET_PROSPECTS;

  const getEntityPath = (entity: TemplateEntity) =>
    entity === TemplateEntity.MEMBER ? "members" : "prospects";

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
    onSuccess: (response, { entity }) => {
      const { title, description } = response;
      renderNotification(title, description);
      queryClient.invalidateQueries({
        queryKey: [getQueryKey(entity), clubId],
      });
    },
  });

  return {
    bulkUpload,
  };
};
