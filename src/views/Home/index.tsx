import React, { useEffect } from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";

import { useTopBar } from "../../shared/contexts/TopBarContext";
import { NavigationRoutes } from "../../routes/routeConstants/appRoutes";
import { useAppActiveTimeTracker } from "src/shared/hooks/useAppActiveTimeTracker";

const {
  INDIVIDUAL_PROSPECT,
  STAFF_MEMBER_DETAILS,
  MEMBER_DETAILS,
  INDIVIDUAL_CLUB,
} = NavigationRoutes;

const Home = () => {
  useAppActiveTimeTracker();

  const location = useLocation();
  const { setHideTopBar } = useTopBar();

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
