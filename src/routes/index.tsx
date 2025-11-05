import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "../shared/components/AppLayout";
import Home from "../views/Home";
import { TopBarProvider } from "../shared/contexts/TopBarContext";
import NotFound from "../shared/components/FallbackPage";
import { AppRoutes } from "./routeConstants/appRoutes";
import { RouterProps } from "../shared/types/route.type";
import AuthWrapper from "../views/Auth/AuthWrapper";
import AppComponents from "../views/AppComponents";
import ProspectsListing from "../views/Prospects/Listing";
import IndividualProspect from "src/views/Prospects/IndividualProspect";
import Members from "src/views/Members/Listing";
import StaffMemberDetails from "src/views/StaffMembers/Details";
import StaffMembersListing from "src/views/StaffMembers/Listing";
import MemberDetails from "src/views/Members/Details";
import Settings from "src/views/Settings";

const AppRouter = () => {
  const routes: RouterProps[] = [
    { path: AppRoutes.AUTH, component: <AuthWrapper /> },
    { path: AppRoutes.APP_COMPONENTS, component: <AppComponents /> },
    {
      path: AppRoutes.HOME,
      component: <AppLayout />,
      children: [
        {
          path: AppRoutes.PROSPECTS_LISTING,
          component: <ProspectsListing />,
        },
        {
          path: AppRoutes.DASHBOARD,
          component: <></>,
        },
        {
          path: AppRoutes.CALENDAR,
          component: <></>,
        },
        {
          path: AppRoutes.MEMBERS,
          component: <Members />,
        },
        {
          path: AppRoutes.CLUB_STAFF,
          component: <StaffMembersListing />,
        },
        {
          path: AppRoutes.SETTINGS,
          component: <Settings />,
        },
        {
          path: AppRoutes.INDIVIDUAL_PROSPECT,
          component: <IndividualProspect />,
        },
        {
          path: AppRoutes.STAFF_MEMBER_DETAILS,
          component: <StaffMemberDetails />,
        },
        {
          path: AppRoutes.MEMBER_DETAILS,
          component: <MemberDetails />,
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
              {route.children && (
                <Route element={<Home />}>
                  {route.children.map((childRoute) => (
                    <Route
                      key={childRoute.path}
                      path={childRoute.path}
                      element={childRoute.component}
                    />
                  ))}
                </Route>
              )}
            </Route>
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TopBarProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
