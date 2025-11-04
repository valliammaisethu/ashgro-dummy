import { UseMutationOptions } from "@tanstack/react-query";
import { deserialize } from "serializr";

import { MutationKeys } from "src/enums/cacheEvict.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import axiosInstance from "src/interceptor/axiosInstance";
import { ResponseModel } from "src/models/response.model";
import { renderNotification } from "src/shared/utils/renderNotification";

const { DELETE_RESOURCE } = MutationKeys;

export const CommonService = () => {
  const deleteResource = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    string
  > => ({
    mutationKey: [DELETE_RESOURCE],
    mutationFn: async (path: string) => {
      const response = await axiosInstance.delete(path);
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description, NotificationTypes.ERROR);
    },
  });

  return {
    deleteResource,
  };
};
