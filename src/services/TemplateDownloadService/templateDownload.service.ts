import { UseQueryOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";

import { QueryKeys } from "src/enums/cacheEvict.enum";
import { TemplateEntity } from "src/enums/templateEntity.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";

const { DOWNLOAD_TEMPLATE } = ApiRoutes;
const { DOWNLOAD_TEMPLATE: DOWNLOAD_TEMPLATE_KEY } = QueryKeys;

export const TemplateDownloadService = () => {
  const downloadTemplate = (
    clubId: string,
    entity: TemplateEntity,
  ): UseQueryOptions<Blob, Error, Blob> => ({
    queryKey: [DOWNLOAD_TEMPLATE_KEY, clubId, entity],
    queryFn: async () => {
      const url = generatePath(DOWNLOAD_TEMPLATE, { id: clubId });
      const { data } = await axiosInstance.get(url, {
        params: { entity },
        responseType: "blob",
      });
      return data;
    },
    enabled: false,
  });

  return {
    downloadTemplate,
  };
};
