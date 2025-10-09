import { NotificationTypes } from "src/enums/notificationTypes";
import Notification from "../components/Notification";

export const renderSuccessNotification = (title: string, message: string) => {
  return Notification({
    message: title,
    description: message,
    type: NotificationTypes.SUCCESS,
  });
};

export const renderErrorNotification = (title: string, message: string) => {
  return Notification({
    message: title,
    description: message,
    type: NotificationTypes.ERROR,
  });
};

export const renderNotification = (
  title: string,
  message: string,
  type: NotificationTypes,
) => {
  return Notification({
    message: title,
    description: message,
    type: type,
  });
};
