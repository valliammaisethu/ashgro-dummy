import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "../shared/components/AppLayout";
import RouteWrapper from "../shared/components/RouteWrapper";
import { TopBarProvider } from "../shared/contexts/TopBarContext";
import isAuthenticated from "../shared/components/HOC/requireAuth";
import NotFound from "../shared/components/FallbackPage";
import { AppRoutes } from "./routeConstants/appRoutes";
import { RouterProps } from "../shared/types/route.type";
import AuthWrapper from "../views/Auth/AuthWrapper";
import AppComponents from "../views/AppComponents";
import ProspectsListing from "../views/Prospects/Listing";
import IndividualProspect from "src/views/Prospects/IndividualProspect";

const AppRouter = () => {
  const routes: RouterProps[] = [
    { path: AppRoutes.AUTH, component: <AuthWrapper /> },
    { path: AppRoutes.APP_COMPONENTS, component: <AppComponents /> },
    {
      path: AppRoutes.HOME,
      component: isAuthenticated(<AppLayout />),
      children: [
        {
          path: AppRoutes.PROSPECTS_LISTING,
          component: <ProspectsListing />,
        },
        {
          path: AppRoutes.DASHBOARD,
          component: <ProspectsListing />,
        },
        {
          path: AppRoutes.CALENDAR,
          component: <ProspectsListing />,
        },
        {
          path: AppRoutes.MEMBERS,
          component: <ProspectsListing />,
        },
        {
          path: AppRoutes.CLUB_STAFF,
          component: <ProspectsListing />,
        },
        {
          path: AppRoutes.SETTINGS,
          component: <ProspectsListing />,
        },
        {
          path: AppRoutes.INDIVIDUAL_PROSPECT,
          component: <IndividualProspect />,
          hideTopBar: true,
        },
      ],
    },
  ];

  return (
    <BrowserRouter>
      <TopBarProvider>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={AppRoutes.PROSPECTS_LISTING} replace />}
          />

          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component}>
              {route.children &&
                route.children.map((childRoute) => (
                  <Route
                    key={childRoute.path}
                    path={childRoute.path}
                    element={
                      <RouteWrapper hideTopBar={childRoute.hideTopBar}>
                        {childRoute.component}
                      </RouteWrapper>
                    }
                  />
                ))}
            </Route>
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TopBarProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
