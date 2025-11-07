import { AxiosRequestConfig } from "axios";

export type MessageResponse = {
  message: string;
};

export type FailedQueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig;
};
