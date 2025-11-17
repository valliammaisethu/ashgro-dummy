import axios, { AxiosRequestHeaders } from "axios";
import { ApiRoutes } from "../routes/routeConstants/apiRoutes";
import Notification from "../shared/components/Notification";
import { NotificationTypes } from "../enums/notificationTypes";
import { axiosInstanceErrors } from "src/constants/sharedComponents";
import { NavigationRoutes } from "src/routes/routeConstants/appRoutes";
import { FailedQueueItem } from "src/shared/types/axios.type";
import { TokenData } from "src/models/user.model";
import { deserialize } from "serializr";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";

declare module "axios" {
  export interface AxiosRequestConfig {
    silent?: boolean;
  }
}

const {
  networkError,
  forbidden,
  notFound,
  genericError,
  failed,
  serverError,
  genericErrorTitle,
} = axiosInstanceErrors;

let failedQueue: FailedQueueItem[] = [];
let isRefreshing = false;

const clearLocalStorage = () => {
  localStorageHelper.clearData();
  return (window.location.href = NavigationRoutes.LOGIN);
};

export const getHeaders = <T extends AxiosRequestHeaders>(
  defaultHeaders: T,
): T => {
  const accessToken = localStorage.getItem(LocalStorageKeys.TOKEN);
  const token = accessToken ? JSON.parse(accessToken) : "";

  const headers: T = {
    ...defaultHeaders,
    "Content-Type": defaultHeaders["Content-Type"] ?? "application/json",
    Authorization:
      defaultHeaders.Authorization === null ? undefined : `Bearer ${token}`,
  };
  return headers;
};

const axiosInstance = axios.create({
  baseURL: ApiRoutes.BASE_URL,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(function (config) {
  config.headers = getHeaders(config.headers);
  return config;
});

axiosInstance.interceptors.response.use(
  (response): any => {
    return {
      data: response.data,
      message: response.statusText,
      status: response.status,
    };
  },
  async (error) => {
    const { response, config } = error;

    const isSilent = config?.silent ?? false;

    if (!response) {
      Notification({
        title: networkError.title,
        description: networkError.description,
        type: NotificationTypes.ERROR,
      });
      return Promise.reject(error);
    }

    const { status, data } = response;

    if (status === 401) {
      const refreshToken = localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN);

      if (!refreshToken) {
        clearLocalStorage();
        return Promise.reject(error);
      }

      const parsedRefreshToken = JSON.parse(refreshToken);

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config });
        });
      }

      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${ApiRoutes.BASE_URL}${ApiRoutes.REFRESH}`,
          {},
          {
            headers: {
              "refresh-token": `Bearer ${parsedRefreshToken}`,
            },
          },
        );

        const { token = {} } = data?.data ?? {};
        const { refreshToken, accessToken } = deserialize(TokenData, token);

        const newAccessToken = accessToken ?? "";

        localStorageHelper.setItem(LocalStorageKeys.TOKEN, newAccessToken);
        localStorageHelper.setItem(
          LocalStorageKeys.REFRESH_TOKEN,
          refreshToken,
        );

        failedQueue.forEach(({ resolve, config }) => {
          config.headers = config.headers ?? {};
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          resolve(axiosInstance(config));
        });

        failedQueue = [];
        isRefreshing = false;

        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(config);
      } catch (error) {
        clearLocalStorage();
      }
    }

    const errorTitle = data?.title || genericErrorTitle;
    const errorMessage =
      data?.description || data?.message || data?.error || genericError;

    switch (status) {
      case 403:
        if (!isSilent) {
          Notification({
            title: errorTitle || forbidden.title,
            description: forbidden.description,
            type: NotificationTypes.ERROR,
          });
        }
        break;

      case 404:
        if (!isSilent) {
          Notification({
            title: errorTitle || notFound.title,
            description: notFound.description,
            type: NotificationTypes.ERROR,
          });
        }
        break;

      case 422:
        if (!isSilent) {
          Notification({
            title: errorTitle || failed.title,
            description: errorMessage,
            type: NotificationTypes.ERROR,
          });
        }
        break;

      case 500:
      default:
        if (!isSilent) {
          Notification({
            title: errorTitle || serverError.title,
            description: errorMessage,
            type: NotificationTypes.ERROR,
          });
        }
        break;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
