import { notification, message as MobileNotification } from 'antd';
import { ArgsProps } from "antd/lib/message";

export interface INotification {
    message: string;
    description: string;
    type: string
}

type notificationType = "success" | "error" | "warning" | "info" | "open";

const Notification = ({ message, description, type }: INotification): unknown => {
    if (window.innerWidth <= 768) {
        return MobileNotification[type as notificationType]({
            content: message
        } as ArgsProps);
    }
    return notification[type as notificationType]({
        message,
        description,
    })
};

export default Notification; 