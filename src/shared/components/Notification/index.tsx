import { notification, message as MobileNotification } from "antd";
import { ArgsProps } from "antd/lib/message";
import clsx from "clsx";

import { Placement } from "src/enums/placement.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import { INotification } from "src/shared/types/sharedComponents.type";

import styles from "./notification.module.scss";

const Notification = ({
  title,
  description,
  type = NotificationTypes.SUCCESS,
  duration = 3,
  placement = Placement.TOP,
}: INotification): void => {
  const combinedClass = clsx(
    styles.customNotification,
    styles[type],
    description && styles.withDescription,
  );

  if (window.innerWidth <= 768) {
    MobileNotification[type]({
      content: title,
      className: combinedClass,
    } as ArgsProps);
    return;
  }

  notification[type]({
    placement,
    message: title,
    description,
    duration,
    className: combinedClass,
  });
};

export default Notification;
