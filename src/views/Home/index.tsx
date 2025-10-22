import React, { useEffect } from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import { useTopBar } from "../../shared/contexts/TopBarContext";
import { NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const Home = () => {
  const location = useLocation();
  const { setHideTopBar } = useTopBar();

  useEffect(() => {
    const hideTopBarRoutes = [NavigationRoutes.INDIVIDUAL_PROSPECT];

    const shouldHideTopBar = hideTopBarRoutes.some((route) =>
      matchPath(route, location.pathname),
    );

    setHideTopBar(shouldHideTopBar);
  }, [location.pathname, setHideTopBar]);

  return <Outlet />;
};

export default Home;
