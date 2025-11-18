import React from "react";
import {
  IconCalendarSelectedDate,
  IconClub,
  IconCrown,
  IconEmployeeBadge,
  IconMasonryAlt,
  IconSettings,
  IconUsers,
} from "obra-icons-react";

import { LegacyButtonType } from "antd/lib/button/button";

import { NotificationTypes } from "src/enums/notificationTypes.js";
import { TopBarItems } from "src/enums/topBar.enum.js";
import type { MenuMode } from "rc-menu/lib/interface.js";
import { AppRoutes } from "src/routes/routeConstants/appRoutes.js";

export const SharedComponentsConstants = {
  MOCKURL: "https://b0877fc7-3471-443a-ba64-e20620ad335a.mock.pstmn.io/api/v1",
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

export const fileDeletionError = "Failed to delete file";

export const passwordAsterisk = "*";
export const topBarItems = [
  {
    title: TopBarItems.DASHBOARD,
    path: AppRoutes.DASHBOARD,
    icon: <IconMasonryAlt size={20} />,
  },
  {
    title: TopBarItems.CALENDAR,
    path: AppRoutes.CALENDAR,
    icon: <IconCalendarSelectedDate size={20} />,
  },
  {
    title: TopBarItems.PROSPECTS,
    path: AppRoutes.PROSPECTS_LISTING,
    icon: <IconUsers size={20} />,
  },
  {
    title: TopBarItems.MEMBERS,
    path: AppRoutes.MEMBERS,
    icon: <IconCrown size={20} />,
  },
  {
    title: TopBarItems.CLUB_STAFF,
    path: AppRoutes.CLUB_STAFF,
    icon: <IconEmployeeBadge size={20} />,
  },
  {
    title: TopBarItems.CLUBS,
    path: AppRoutes.CLUBS,
    icon: <IconClub size={20} />,
  },
  {
    title: TopBarItems.SETTINGS,
    path: AppRoutes.SETTINGS,
    icon: <IconSettings size={20} />,
  },
];
export const axiosInstanceErrors = {
  genericErrorTitle: "Error!",
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
    description: "An unknown error occured. Please try again later.",
  },
  serverError: {
    title: "Server Error!",
    description: "An unknown error occured. Please try again later.",
  },
  genericError: "An unknown error occured. Please try again later.",
};

export const defaultSearchPlaceholder = "Search by name";
export const defaultFilterPlaceholder = "Filter";
export const noDataFound = "No data found";
export const USPhoneCode = "+1";
export const dollarSymbol = "$";
export const logoutMessages = {
  title: "Logged Out!",
  description: "You have been logged out successfully.",
};
export const N_A = "N/A";
export const empty = " - ";
export const imageAccept = "image/png, image/jpeg, image/jpg";

export const profileMaxSize = 5 * 1024 * 1024;

export const profileMaxSizeTitle = "The image size should not exceed 5 MB";

export const profileImageType = "Only PNG, JPG, and JPEG formats are allowed";

export const imageUploadFailed = "Failed to upload image";

export const maxFileSizeTextDescription = "Max. file size upto 25mb";

export const profileImageAllowedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
];

export const defaultModalWidth = 664;

export const datePickerFromPlaceholder = "Enter from date";

export const datePickerToPlaceholder = "Enter to date";
export const DEFAULT_MAX_FILE_SIZE = 25 * 1024 * 1024;
export const DEFAULT_MAX_FILE_SIZE_PLACEHOLDER =
  "Attachments cannot exceed 25 MB in total. Please remove some files.";

export const clearSelectionLabel = "Clear Selection";
export const clearSelectionKey = "clearSelection";
