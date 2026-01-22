import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

import {
  ClubContextType,
  ClubSettings,
  SocketResponse,
} from "src/shared/types/socket.type";

const defaultSettings: ClubSettings = {
  isLeadForms: false,
  isBulkEmail: false,
  chatbotEnabled: false,
  noOfCustomChartsAllowed: 0,
  noOfEmailTemplatesAllowed: 0,
};

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export const ClubProvider = ({ children }: { children: ReactNode }) => {
  const [clubSettings, setClubSettingsState] =
    useState<ClubSettings>(defaultSettings);

  const setClubSettings = useCallback((settings: SocketResponse) => {
    if (!settings) return;

    const { response = {}, type = "" } = settings || {};

    setClubSettingsState((prev) => ({
      ...prev,
      ...(response as Partial<ClubSettings>),
      type,
    }));
  }, []);

  const value = useMemo(
    () => ({ clubSettings, setClubSettings }),
    [clubSettings],
  );

  return <ClubContext.Provider value={value}>{children}</ClubContext.Provider>;
};

export const useClubData = () => {
  const context = useContext(ClubContext);
  if (context === undefined) {
    throw new Error("useClubData must be used within a ClubProvider");
  }
  return context;
};
