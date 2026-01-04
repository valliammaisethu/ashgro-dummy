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
  };

export const statusMap: Record<ImportStatusResponse["status"], string> = {
  COMPLETED: "Completed",
  FAILED: "Failed",
};

export const COMPLETED_STATUS = "COMPLETED";

export const importToastMsg = (data: ImportStatusResponse) => {
  const { entityType, status, successCount = 0 } = data;
  return {
    title: `${entityTypeMap[entityType]} Import ${statusMap[status] ?? ""}`,
    description: `${successCount} ${entityTypeMap[entityType]} have been imported successfully.`,
    type: status === COMPLETED_STATUS ? SUCCESS : ERROR,
  };
};
