import { NotificationTypes } from "src/enums/notificationTypes";
import Notification from "../components/Notification";

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
