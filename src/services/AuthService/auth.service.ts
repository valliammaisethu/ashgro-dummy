import { UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";

import axiosInstance from "src/interceptor/axiosInstance";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { MutationKeys } from "src/enums/cacheEvict.enum";
import {
  ChangePassword,
  LoginRequest,
  LoginResponse,
  ResetPassword,
} from "src/models/user.model";
import { ResponseModel } from "src/models/response.model";
import { AuthContext } from "src/context/AuthContext";
import useRedirect from "src/shared/hooks/useRedirect";
import { logoutMessages } from "src/constants/sharedComponents";
import { renderNotification } from "src/shared/utils/renderNotification";
import { generatePath } from "react-router-dom";
import { RoleNames } from "src/enums/roleNames.enum";
import { clearFilters } from "src/utils/dashboardFilters";
import { getCurrentUserId } from "src/shared/utils/helpers";

const {
  USER_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  USER_LOGOUT,
} = ApiRoutes;
const {
  LOGIN,
  FORGOT_PASSWORD: FORGOT_PASSWORD_KEY,
  RESET_PASSWORD: RESET_PASSWORD_KEY,
  CHANGE_PASSWORD: CHANGE_PASSWORD_KEY,
  LOGOUT,
} = MutationKeys;

const { title, description } = logoutMessages;

export const AuthService = () => {
  const { setAuthenticated, resetAuthState } = AuthContext();
  const { navigateToLogin, navigateToCalendar, navigateToClubs } =
    useRedirect();
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
      const role = data?.user?.role;
      if (role === RoleNames.SUPER_ADMIN) {
        navigateToClubs();
        return;
      }

      navigateToCalendar();
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
    mutationFn: async (payload: ResetPassword) => {
      const { token, newPassword } = payload;

      const response = await axiosInstance.patch(
        RESET_PASSWORD,
        { user: { newPassword } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return deserialize(ResponseModel, response.data);
    },
  });

  const changePassword = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    ChangePassword
  > => ({
    mutationKey: [CHANGE_PASSWORD_KEY],
    mutationFn: async (payload: ChangePassword) => {
      const serializedData = serialize(ChangePassword, payload);
      const response = await axiosInstance.put(
        generatePath(CHANGE_PASSWORD, { id: payload?.id }),
        {
          oldPassword: serializedData.oldPassword,
        },
      );

      return deserialize(ResponseModel, response.data);
    },
  });

  const logout = () => ({
    mutationKey: [LOGOUT],
    mutationFn: async () => {
      const response = await axiosInstance.delete(USER_LOGOUT);
      return deserialize(LoginResponse, response.data);
    },
    onSuccess: () => {
      const userId = getCurrentUserId();
      renderNotification(title, description);
      resetAuthState();
      clearFilters(userId);
      queryClient.clear();
      navigateToLogin();
    },
  });

  return { loginUser, forgotPassword, resetPassword, changePassword, logout };
};
