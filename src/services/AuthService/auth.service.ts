import { UseMutationOptions } from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";

import axiosInstance from "src/interceptor/axiosInstance";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { MutationKeys } from "src/enums/cacheEvict.enum";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { renderNotification } from "src/shared/utils/renderNotification";
import { LoginRequest, LoginResponse } from "src/models/user.model";
import { ResponseModel } from "src/models/response.model";
import { AuthContext } from "src/context/AuthContext";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";

const { USER_LOGIN, FORGOT_PASSWORD } = ApiRoutes;

export const AuthService = () => {
  const { setAuthenticated } = AuthContext();
  const loginUser = (): UseMutationOptions<
    LoginResponse,
    ResponseModel,
    LoginRequest
  > => ({
    mutationKey: [MutationKeys.LOGIN],
    mutationFn: async (user: LoginRequest) => {
      const serializedData = serialize(LoginRequest, user);
      const response = await axiosInstance.post(USER_LOGIN, {
        user: serializedData,
      });

      return deserialize(LoginResponse, response.data);
    },
    onSuccess: (response) => {
      const { data, title, description } = response;
      setAuthenticated(data?.user, response?.data?.token);
      localStorageHelper.setItem(LocalStorageKeys.USER, response?.data?.user);
      localStorageHelper.setItem(LocalStorageKeys.TOKEN, response?.data?.token);
      renderNotification(title, description);
    },
  });

  const forgotPassword = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    LoginRequest
  > => ({
    mutationKey: [MutationKeys.FORGOT_PASSWORD],
    mutationFn: async (user: LoginRequest) => {
      const serializedData = serialize(LoginRequest, user);
      const response = await axiosInstance.post(FORGOT_PASSWORD, {
        user: serializedData,
      });
      return deserialize(ResponseModel, response.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
    },
  });

  return { loginUser, forgotPassword };
};
