import React, { useEffect, useState } from "react";
import { notification, message as MobileNotification } from "antd";
import { ArgsProps } from "antd/lib/message";
import clsx from "clsx";

import { Icons } from "src/enums/icons.enum";
import {
  getNotificationIcon,
  renderNotificationColor,
} from "src/shared/utils/renderNotificationColor";
import {
  INotification,
  ProgressBarProps,
} from "src/shared/types/sharedComponents.type";

import styles from "./notification.module.scss";

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, type }) => {
  const [percent, setPercent] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => setPercent(0), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.successNotificationOuter}>
      <div
        className={styles.successNotificationInner}
        style={{
          width: `${percent}%`,
          backgroundColor: renderNotificationColor(type),
          transition: `width ${duration}s linear`,
        }}
      />
    </div>
  );
};

const Notification = ({
  message,
  description,
  type,
  showProgress = true,
  duration = 25.5,
}: INotification): void => {
  if (window.innerWidth <= 768) {
    MobileNotification[type]({
      content: message,
    } as ArgsProps);
    return;
  }

  const descriptionWithProgress = showProgress ? (
    <div className={styles.notificationDescription}>
      <div className={styles.notificationDescriptionText}>{description}</div>
      <ProgressBar duration={duration} type={type} />
    </div>
  ) : (
    description
  );

  notification[type]({
    message,
    description: descriptionWithProgress,
    duration: duration,
    pauseOnHover: true,
    icon: getNotificationIcon(type),
    closeIcon: <i className={clsx(Icons.CLOSE_LARGE_LINE, styles.closeIcon)} />,
  });
};

export default Notification;
