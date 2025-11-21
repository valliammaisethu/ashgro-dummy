import { UseMutationOptions } from "@tanstack/react-query";
import { deserialize } from "serializr";

import { MutationKeys } from "src/enums/cacheEvict.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import axiosInstance from "src/interceptor/axiosInstance";
import { ResponseModel } from "src/models/response.model";
import { renderNotification } from "src/shared/utils/renderNotification";

const { DELETE_RESOURCE } = MutationKeys;

interface DeleteResourceParams {
  path: string;
  title?: string;
  description?: string;
}

const DEFAULT_DELETE_MESSAGE = {
  title: "Resource Deleted!",
  description: "The resource has been deleted successfully!",
};

export const CommonService = () => {
  const deleteResource = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    DeleteResourceParams
  > => ({
    mutationKey: [DELETE_RESOURCE],
    mutationFn: async ({ path }: DeleteResourceParams) => {
      const response = await axiosInstance.delete(path);
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (_response, { title, description }) => {
      renderNotification(
        title || DEFAULT_DELETE_MESSAGE.title,
        description || DEFAULT_DELETE_MESSAGE.description,
        NotificationTypes.ERROR,
      );
    },
  });

  return {
    deleteResource,
  };
};
