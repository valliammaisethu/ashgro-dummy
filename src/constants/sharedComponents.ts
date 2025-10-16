import { LegacyButtonType } from "antd/lib/button/button";
import { NotificationTypes } from "../enums/notificationTypes";
import type { MenuMode } from "../../node_modules/rc-menu/lib/interface.d.js";

export const SharedComponentsConstants = {
  DELETE_MODAL: {
    okText: "Yes",
    okType: "danger" as LegacyButtonType,
    cancelText: "No",
  },

  SELECT_PLACEHOLDER: "Select",

  NAVBAR: {
    MODE: "horizontal" as MenuMode,
  },

  LOGOUT_TEXT: "Logout",

  LOGOUT_NOTIFICATION: {
    message: "Logout",
    description: "user loggedout successfully",
    type: NotificationTypes.SUCCESS,
  },

  OFFLINE_TEXT: "No Internet Connection",

  RESTRICTED_ACCESS_TEXT: "You are not authorised to view this route !!",

  SEARCH_PLACEHOLDER: "Search...",

  DATE_FORMAT: "YYYY-MM-DD",

  FILE_UPLOAD: {
    name: "file",
    mockUrl: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    authorization: "authorization-text",
  },
};

export const getDeleteModalTitle = (resource: string) =>
  `Are you sure delete this ${resource}?`;

export const getFileSuccessMessage = (name?: string) =>
  `${name} file uploaded successfully`;

export const getFileErrorMessage = (name?: string) =>
  `${name} file upload failed.`;

export const axiosInstanceErrors = {
  networkError: {
    title: "Network Error!",
    description: "Please check your internet connection.",
  },
  forbidden: {
    title: "Forbidden!",
    description: "Your session has expired. Please log in again.",
  },
  unAuthorised: {
    title: "Unauthorized!",
    description: "Your session has expired. Please log in again.",
  },
  notFound: {
    title: "Not Found!",
    description: "The requested resource could not be found.",
  },
  failed: {
    title: "Operation Failed!",
    description: "Something went wrong. Please try again later.",
  },
  serverError: {
    title: "Server Error!",
    description: "Something went wrong. Please try again later.",
  },
  genericError: "Something went wrong. Please try again later.",
};

export const USPhoneCode = "+1";
