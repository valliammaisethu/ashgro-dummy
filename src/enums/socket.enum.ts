export enum SOCKET_EVENTS {
  CONNECT = "connect",
  RECONNECT = "reconnect",
  ERROR = "connect_error",
  JOIN_ROOM = "join-room",
  CLUB_SETTINGS_UPDATED = "club-settings-updated",
  IMPORT_STATUS = "import-status",
  SETTINGS_UPDATED = "settings-updated",
}

export enum SOCKET_ERRORS {
  UNAUTHORIZED = "unauthorized",
  USER_NOT_FOUND = "user-not-found",
}
