import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { deserialize, serialize } from "serializr";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { LeadFormData } from "src/models/leadForm.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { renderNotification } from "src/shared/utils/renderNotification";

const { LEAD_FORM } = ApiRoutes;
const { LEAD_FORM: LEAD_FORM_MUTATION } = MutationKeys;
const { GET_LEAD_FORM_STATUS } = QueryKeys;

export const LeadFormService = () => {
  const getLeadFormStatus = (
    id?: string,
  ): UseQueryOptions<ResponseModel, ResponseModel, ResponseModel> => ({
    queryKey: [GET_LEAD_FORM_STATUS, id],
    queryFn: async () => {
      const response = await axiosInstance.get(generatePath(LEAD_FORM, { id }));

      return deserialize(ResponseModel, response?.data) as ResponseModel;
    },
    enabled: !!id,
  });

  const submitLeadForm = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    LeadFormData
  > => ({
    mutationKey: [LEAD_FORM_MUTATION],
    mutationFn: async (payload: LeadFormData) => {
      const { id, ...formData } = payload;

      const response = await axiosInstance.post(
        generatePath(LEAD_FORM, { id }),
        serialize(LeadFormData, formData),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
    },
  });

  return {
    getLeadFormStatus,
    submitLeadForm,
  };
};
