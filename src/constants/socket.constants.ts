import { NotificationTypes } from "src/enums/notificationTypes";
import { ImportStatusResponse } from "src/shared/types/socket.type";

export const SOCKET_TRANSPORTS = ["websocket", "polling"];
export const LEAVE_ROOM_PREFIX = "leave:";
export const TIMEOUT_ERROR_MSG = "Socket connection timeout";
export const TIMEOUT = 10000;

const { SUCCESS, ERROR } = NotificationTypes;

export const entityTypeMap: Record<ImportStatusResponse["entityType"], string> =
  {
    PROSPECT: "Prospect",
    MEMBER: "Member",
    CHATBOT_SLOTS: "Chatbot",
  };

export const statusMap: Record<ImportStatusResponse["status"], string> = {
  COMPLETED: "Completed",
  FAILED: "Failed",
};

export const COMPLETED_STATUS = "COMPLETED";

export const CHATBOT_SLOTS_SUCCESS = "Chatbot Slots added Successfully";

export const CHATBOT_SLOTS_TYPE = "CHATBOT_SLOTS";

export const importToastMsg = (data: ImportStatusResponse) => {
  const { entityType, status, successCount = 0, description, error } = data;

  const toastDescription =
    description ||
    error ||
    `${successCount} ${entityTypeMap[entityType]} have been imported successfully.`;

  const title =
    entityTypeMap[entityType] === CHATBOT_SLOTS_TYPE
      ? CHATBOT_SLOTS_SUCCESS
      : `${entityTypeMap[entityType]} Import ${statusMap[status]}`;

  return {
    title,
    description: toastDescription,
    type: status === COMPLETED_STATUS ? SUCCESS : ERROR,
  };
};
