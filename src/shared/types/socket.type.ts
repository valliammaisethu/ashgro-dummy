import { SOCKET_ERRORS } from "src/enums/socket.enum";

export type SocketResponse = {
  type?: string;
  response?: unknown;
};

export type SocketAuthPayload = {
  token: string;
};

export type SocketError = {
  data: {
    reason: SOCKET_ERRORS;
  };
};
