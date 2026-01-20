import { io, Socket } from "socket.io-client";

import { AUTH_KEYS } from "src/enums/authKeys.enum";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { SOCKET_ERRORS, SOCKET_EVENTS } from "src/enums/socket.enum";
import { SocketAuthPayload, SocketError } from "src/shared/types/socket.type";
import {
  LEAVE_ROOM_PREFIX,
  SOCKET_TRANSPORTS,
  TIMEOUT,
  TIMEOUT_ERROR_MSG,
} from "src/constants/socket.constants";

const SOCKET_URL = import.meta.env.VITE_WS_BASE_URL || "";

const { TOKEN } = AUTH_KEYS;
const { CONNECT, RECONNECT, ERROR } = SOCKET_EVENTS;
const { USER_NOT_FOUND } = SOCKET_ERRORS;

let globalSocket: Socket | null = null;
let inflightConnect: Promise<Socket> | null = null;
let activeRoom: string | null = null;

const getRoomInfo = () => {
  const id = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;
  return { id };
};

export const connectSocket = async (onNotFound?: () => void) => {
  if (globalSocket) return globalSocket;
  if (inflightConnect) return inflightConnect;

  inflightConnect = (async () => {
    const token = localStorage.getItem(TOKEN) ?? "";

    const socketInstance = io(SOCKET_URL, {
      auth: { token } as SocketAuthPayload,
      transports: SOCKET_TRANSPORTS,
    });

    globalSocket = socketInstance;

    socketInstance.on(CONNECT, () => {
      if (activeRoom) {
        socketInstance.emit(SOCKET_EVENTS.JOIN_ROOM, activeRoom);
      }
    });

    socketInstance.on(RECONNECT, () => {
      if (activeRoom) {
        socketInstance.emit(SOCKET_EVENTS.JOIN_ROOM, activeRoom);
      }
    });

    socketInstance.on(ERROR, async (err: unknown) => {
      const reason = (err as SocketError)?.data?.reason;

      if ([USER_NOT_FOUND].includes(reason)) {
        onNotFound?.();
      }
    });

    await new Promise((resolve, reject) => {
      socketInstance.once(CONNECT, () => resolve(true));
      setTimeout(() => reject(new Error(TIMEOUT_ERROR_MSG)), TIMEOUT);
    });

    return socketInstance;
  })();

  return inflightConnect;
};

export const joinRoom = (room: string) => {
  if (activeRoom === room) return;

  activeRoom = room;

  if (globalSocket?.connected) globalSocket.emit(SOCKET_EVENTS.JOIN_ROOM, room);
  else
    globalSocket?.once(SOCKET_EVENTS.CONNECT, () => {
      globalSocket?.emit(SOCKET_EVENTS.JOIN_ROOM, room);
    });
};

export const leaveRoom = (room: string) => {
  const info = getRoomInfo();
  globalSocket?.emit(`${LEAVE_ROOM_PREFIX}${room}`, info);

  if (activeRoom === room) {
    activeRoom = null;
  }
};

export const disconnectSocket = () => {
  if (globalSocket) {
    globalSocket.disconnect();
    globalSocket = null;
    inflightConnect = null;
  }
};

export const getSocket = () => globalSocket;
