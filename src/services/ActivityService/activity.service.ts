import { UseMutationOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize } from "serializr";

import { MutationKeys } from "src/enums/cacheEvict.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { ActivityPayload } from "src/models/activity.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { cleanObject } from "src/shared/utils/helpers";
import { renderNotification } from "src/shared/utils/renderNotification";

const { Add_ACTIVITY } = ApiRoutes;
const { EDIT_PROSPECT } = MutationKeys;

export const ActivityService = () => {
  const addActivity = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    ActivityPayload
  > => ({
    mutationKey: [EDIT_PROSPECT],
    mutationFn: async (payload: ActivityPayload) => {
      const { id, ...activity } = payload;

      const response = await axiosInstance.post(
        generatePath(Add_ACTIVITY, { id }),

        cleanObject({
          activity,
        }),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
    },
  });

  return {
    addActivity,
  };
};
