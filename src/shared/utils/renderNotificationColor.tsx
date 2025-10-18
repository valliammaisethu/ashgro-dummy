import React from "react";
import clsx from "clsx";

import { Colors } from "src/enums/colors.enum";
import { Icons } from "src/enums/icons.enum";
import { NotificationTypes } from "src/enums/notificationTypes";

import styles from "src/shared/components/Notification/notification.module.scss";

export const renderNotificationColor = (type: NotificationTypes) => {
  if (type === NotificationTypes.SUCCESS) return Colors.SUCCESS_NOTIFICATION;
  else return Colors.ERROR_NOTIFICATION;
};

export const getNotificationIcon = (type: NotificationTypes) => {
  switch (type) {
    case NotificationTypes.SUCCESS:
      return (
        <i className={clsx(Icons.CHECKBOX_FILL, styles.successNotification)} />
      );
    case NotificationTypes.ERROR:
      return (
        <i className={clsx(Icons.SPAM_2_FILL, styles.errorNotification)} />
      );
    default:
      return null;
  }
};
