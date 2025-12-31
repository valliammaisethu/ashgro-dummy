import { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { AuthService } from "src/services/AuthService/auth.service";
import {
  connectSocket,
  getSocket,
  joinRoom,
  leaveRoom,
} from "src/services/SocketService/socket.service";
import { localStorageHelper } from "../utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { SocketResponse } from "../types/socket.type";
import { SOCKET_EVENTS } from "src/enums/socket.enum";

export const useSocketBroadcast = () => {
  const [data, setData] = useState<SocketResponse | null>(null);

  const { logout } = AuthService();
  const { mutate: handleLogout } = useMutation(logout());

  const socketRef = useRef<Socket | null>(null);

  const clubId =
    localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId ?? "";
  const listener = `club-${clubId}`;

  useEffect(() => {
    let isMounted = true;
    let onAnyHandler: ((eventName: string, ...args: unknown[]) => void) | null =
      null;

    const init = async () => {
      const handleListener = () => {
        const getGlobalSocket = getSocket();

        if (!getGlobalSocket) return;

        onAnyHandler = (eventName: string, ...args: unknown[]) => {
          if (eventName === SOCKET_EVENTS.JOIN_ROOM) return;

          if (isMounted) {
            setData({ type: eventName, response: args[0] });
          }
        };

        getGlobalSocket.onAny(onAnyHandler);
      };

      try {
        const socket = await connectSocket(() => handleLogout());

        if (!socket.connected) {
          await new Promise((resolve) =>
            socket.once(SOCKET_EVENTS.CONNECT, () => resolve(true)),
          );
        }

        if (!isMounted) return;

        socketRef.current = socket;
        joinRoom(listener);
        handleListener();
      } catch (err) {
        joinRoom(listener);
        handleListener();
      }
    };

    init();

    return () => {
      isMounted = false;
      leaveRoom(listener);
      if (socketRef.current && onAnyHandler) {
        socketRef.current.offAny(onAnyHandler);
      }
    };
  }, [clubId]);

  return data;
};
