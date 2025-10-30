import { UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";

import axiosInstance from "src/interceptor/axiosInstance";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { MutationKeys } from "src/enums/cacheEvict.enum";
import {
  LoginRequest,
  LoginResponse,
  ResetPassword,
} from "src/models/user.model";
import { ResponseModel } from "src/models/response.model";
import { AuthContext } from "src/context/AuthContext";
import useRedirect from "src/shared/hooks/useRedirect";
import { logoutMessages } from "src/constants/sharedComponents";
import { renderNotification } from "src/shared/utils/renderNotification";

const { USER_LOGIN, FORGOT_PASSWORD, RESET_PASSWORD, USER_LOGOUT } = ApiRoutes;
const {
  LOGIN,
  FORGOT_PASSWORD: FORGOT_PASSWORD_KEY,
  RESET_PASSWORD: RESET_PASSWORD_KEY,
  LOGOUT,
} = MutationKeys;

const { title, description } = logoutMessages;

export const AuthService = () => {
  const { setAuthenticated, resetAuthState } = AuthContext();
  const { navigateToProspects, navigateToLogin } = useRedirect();
  const queryClient = useQueryClient();

  const loginUser = (): UseMutationOptions<
    LoginResponse,
    ResponseModel,
    LoginRequest
  > => ({
    mutationKey: [LOGIN],
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
      navigateToProspects();
      renderNotification(title, description);
    },
  });

  const forgotPassword = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    LoginRequest
  > => ({
    mutationKey: [FORGOT_PASSWORD_KEY],
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

  const resetPassword = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    ResetPassword
  > => ({
    mutationKey: [RESET_PASSWORD_KEY],
    mutationFn: async (user: ResetPassword) => {
      const serializedData = serialize(ResetPassword, user);
      const response = await axiosInstance.patch(RESET_PASSWORD, {
        user: serializedData,
      });
      return deserialize(ResponseModel, response.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
    },
  });

  const logout = () => ({
    mutationKey: [LOGOUT],
    mutationFn: async () => {
      const response = await axiosInstance.delete(USER_LOGOUT);
      return deserialize(LoginResponse, response.data);
    },
    onSuccess: () => {
      renderNotification(title, description);
      resetAuthState();
      queryClient.clear();
      navigateToLogin();
    },
  });

  return { loginUser, forgotPassword, resetPassword, logout };
};
