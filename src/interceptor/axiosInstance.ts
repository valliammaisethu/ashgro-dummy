import axios from "axios";
import { ApiRoutes } from "../routes/routeConstants/apiRoutes";
import Notification from "../shared/components/Notification";
import { NotificationTypes } from "../enums/notificationTypes";
import { axiosInstanceErrors } from "src/constants/sharedComponents";

const {
  networkError,
  forbidden,
  unAuthorised,
  notFound,
  genericError,
  failed,
  serverError,
} = axiosInstanceErrors;

export const getHeaders = (): any => {
  let user;
  if (localStorage.getItem("token")) {
    user = JSON.parse(localStorage.getItem("token") || "");
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user && user.accessToken ? user.accessToken : ""}`,
  };
  return headers;
};

const axiosInstance = axios.create({
  baseURL: ApiRoutes.BASE_URL,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(function (config) {
  config.headers = getHeaders();
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
  (error) => {
    const { response } = error;

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
      Notification({
        title: unAuthorised.title,
        description: unAuthorised.description,
        type: NotificationTypes.ERROR,
      });
      localStorage.removeItem("user");
      return Promise.reject(error);
    }

    const errorMessage = data?.message || data?.error || genericError;

    switch (status) {
      case 403:
        Notification({
          title: forbidden.title,
          description: forbidden.description,
          type: NotificationTypes.ERROR,
        });
        break;

      case 404:
        Notification({
          title: notFound.title,
          description: notFound.description,
          type: NotificationTypes.ERROR,
        });
        break;

      case 422:
        Notification({
          title: failed.title,
          description: errorMessage,
          type: NotificationTypes.ERROR,
        });
        break;

      case 500:
      default:
        Notification({
          title: serverError.title,
          description: errorMessage,
          type: NotificationTypes.ERROR,
        });
        break;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
