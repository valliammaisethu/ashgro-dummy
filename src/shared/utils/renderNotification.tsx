import { NotificationTypes } from "src/enums/notificationTypes";
import Notification from "../components/Notification";

export const renderNotification = (
  title: string = "",
  message: string = "",
  type: NotificationTypes = NotificationTypes.SUCCESS,
) => {
  return Notification({
    title: title,
    description: message,
    type: type,
  });
};
