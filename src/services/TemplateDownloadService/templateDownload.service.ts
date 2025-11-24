import { UseMutationOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { ResponseTypes } from "src/enums/responseTypes.enum";

import { TemplateEntity } from "src/enums/templateEntity.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";

const { DOWNLOAD_TEMPLATE } = ApiRoutes;

interface DownloadTemplateParams {
  clubId: string;
  entity: TemplateEntity;
}

export const TemplateDownloadService = () => {
  const downloadTemplate = (): UseMutationOptions<
    Blob,
    Error,
    DownloadTemplateParams
  > => ({
    mutationFn: async ({ clubId, entity }) => {
      const url = generatePath(DOWNLOAD_TEMPLATE, { id: clubId });
      const { data } = await axiosInstance.get(url, {
        params: { entity },
        responseType: ResponseTypes.BLOB,
      });
      return data;
    },
  });

  return {
    downloadTemplate,
  };
};
