import React, { useCallback, useEffect } from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import queryString from "query-string";

import { useTopBar } from "../../shared/contexts/TopBarContext";
import { NavigationRoutes } from "../../routes/routeConstants/appRoutes";
import { useAppActiveTimeTracker } from "src/shared/hooks/useAppActiveTimeTracker";
import { ClubService } from "src/services/ClubService/club.service";
import { useSocketBroadcast } from "src/shared/hooks/useSocket";
import { useClubData } from "src/context/ClubContext";
import { ImportStatusResponse } from "src/shared/types/socket.type";
import { SOCKET_EVENTS } from "src/enums/socket.enum";
import { renderNotification } from "src/shared/utils/renderNotification";
import { importToastMsg } from "src/constants/socket.constants";
import { invalidateSocketQueries } from "src/shared/utils/socket";

const {
  INDIVIDUAL_PROSPECT,
  STAFF_MEMBER_DETAILS,
  MEMBER_DETAILS,
  INDIVIDUAL_CLUB,
} = NavigationRoutes;

const { SETTINGS_UPDATED, IMPORT_STATUS } = SOCKET_EVENTS;

const Home = () => {
  useAppActiveTimeTracker();

  const location = useLocation();
  const { setHideTopBar } = useTopBar();
  const { setClubSettings } = useClubData();
  const queryClient = useQueryClient();

  const { getClubMinimalDetails } = ClubService();

  getClubMinimalDetails();
  useQuery(getClubMinimalDetails());

  const socketData = useSocketBroadcast();

  const handleUpdateClubData = useCallback(() => {
    if (!socketData?.response || !socketData?.type) return;
    if (socketData?.type === SETTINGS_UPDATED) {
      setClubSettings(socketData);
    } else if (socketData?.type === IMPORT_STATUS) {
      const calenderMonth = queryString.parse(location.search)?.month as string;
      const response = socketData.response as ImportStatusResponse;

      invalidateSocketQueries({
        queryClient,
        entityType: response?.entityType,
        month: calenderMonth,
      });

      renderNotification(...Object.values(importToastMsg(response)));
    }
  }, [socketData, setClubSettings, queryClient]);

  useEffect(() => {
    handleUpdateClubData();
  }, [socketData, handleUpdateClubData]);

  useEffect(() => {
    const hideTopBarRoutes = [
      INDIVIDUAL_PROSPECT,
      STAFF_MEMBER_DETAILS,
      MEMBER_DETAILS,
      INDIVIDUAL_CLUB,
    ];

    const shouldHideTopBar = hideTopBarRoutes.some((route) =>
      matchPath(route, location.pathname),
    );

    setHideTopBar(shouldHideTopBar);
  }, [location.pathname, setHideTopBar]);

  return <Outlet />;
};

export default Home;
