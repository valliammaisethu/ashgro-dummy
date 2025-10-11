import { UseMutationOptions } from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";

import axiosInstance from "src/interceptor/axiosInstance";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { MutationKeys } from "src/enums/cacheEvict.enum";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LoginRequest, LoginResponse } from "src/models/user.model";
import { ResponseModel } from "src/models/response.model";
import { AuthContext } from "src/context/AuthContext";
import { renderNotification } from "src/shared/utils/renderNotification";

export const AuthService = () => {
  const { USER_LOGIN } = ApiRoutes;
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
      setAuthenticated(response?.data?.user, response?.data?.token);
      localStorageHelper.setItem(LocalStorageKeys.USER, response?.data?.user);
      localStorageHelper.setItem(LocalStorageKeys.TOKEN, response?.data?.token);
      renderNotification(response.title, response.description);
    },
  });

  return { loginUser };
};
