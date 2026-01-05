import { SOCKET_ERRORS } from "src/enums/socket.enum";

export type SocketResponse = {
  type?: string;
  response?: ClubSettings | ImportStatusResponse;
};

export type SocketAuthPayload = {
  token: string;
};

export type SocketError = {
  data: {
    reason: SOCKET_ERRORS;
  };
};

export interface ImportStatusResponse {
  importJobId: string;
  entityType: string;
  status: string;
  totalRows: number;
  successCount: number;
  failedCount: number;
}

export interface ClubSettings {
  isLeadForms?: boolean;
  isBulkEmail?: boolean;
  chatbotEnabled?: boolean;
  noOfCustomChartsAllowed?: number;
  noOfEmailTemplatesAllowed?: number;
  type?: string;
}

export interface ClubContextType {
  clubSettings: ClubSettings;
  setClubSettings: (settings: Partial<ClubSettings> | SocketResponse) => void;
}
