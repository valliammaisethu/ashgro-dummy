import React from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  useLocation,
} from "react-router-dom";

import AppLayout from "../shared/components/AppLayout";
import Home from "../views/Home";
import { TopBarProvider } from "../shared/contexts/TopBarContext";
import NotFound from "../shared/components/FallbackPage";
import { AppRoutes, NavigationRoutes } from "./routeConstants/appRoutes";
import { RouterProps } from "../shared/types/route.type";
import AuthWrapper from "../views/Auth/AuthWrapper";
import AppComponents from "../views/AppComponents";
import ProspectsListing from "../views/Prospects/Listing";
import IndividualProspect from "src/views/Prospects/IndividualProspect";
import Members from "src/views/Members/Listing";
import StaffMemberDetails from "src/views/StaffMembers/Details";
import StaffMembersListing from "src/views/StaffMembers/Listing";
import MemberDetails from "src/views/Members/Details";
import RoleGuard from "src/shared/components/RoleGuard";
import { RoleNames } from "src/enums/roleNames.enum";
import Clubs from "src/views/Clubs";
import IndividualClub from "src/views/Clubs/IndividualClub";
import SettingsWrapper from "src/views/Settings";
import DashboardWrapper from "src/views/Dashboard";
import Calender from "src/views/Calender";
import { AuthContext } from "src/context/AuthContext";
import Chatbot from "src/views/Chatbot";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authenticated } = AuthContext();
  const location = useLocation();

  if (!authenticated) {
    return (
      <Navigate
        to={NavigationRoutes.LOGIN}
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  return children;
};

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { authenticated } = AuthContext();

  if (authenticated) {
    return <Navigate to={NavigationRoutes.DASHBOARD} replace />;
  }

  return children;
};

const RootRedirect = () => {
  const { authenticated } = AuthContext();

  if (!authenticated) {
    return <Navigate to={NavigationRoutes.LOGIN} replace />;
  }

  return <Navigate to={AppRoutes.DASHBOARD} replace />;
};

const AppRouter = () => {
  const children: RouterProps[] = [
    { path: AppRoutes.PROSPECTS_LISTING, component: <ProspectsListing /> },
    { path: AppRoutes.CALENDAR, component: <Calender /> },
    { path: AppRoutes.MEMBERS, component: <Members /> },
    { path: AppRoutes.CLUB_STAFF, component: <StaffMembersListing /> },
    { path: AppRoutes.INDIVIDUAL_PROSPECT, component: <IndividualProspect /> },
    { path: AppRoutes.STAFF_MEMBER_DETAILS, component: <StaffMemberDetails /> },
    { path: AppRoutes.MEMBER_DETAILS, component: <MemberDetails /> },
    { path: AppRoutes.SETTINGS, component: <SettingsWrapper /> },
    { path: AppRoutes.DASHBOARD, component: <DashboardWrapper /> },

    {
      path: AppRoutes.CLUBS,
      component: (
        <RoleGuard allowedRoles={[RoleNames.SUPER_ADMIN]}>
          <Clubs />
        </RoleGuard>
      ),
    },
    {
      path: AppRoutes.INDIVIDUAL_CLUB,
      component: (
        <RoleGuard allowedRoles={[RoleNames.SUPER_ADMIN]}>
          <IndividualClub />
        </RoleGuard>
      ),
    },
  ];

  return (
    <BrowserRouter>
      <TopBarProvider>
        <Routes>
          <Route path="/" element={<RootRedirect />} />

          <Route
            path={AppRoutes.AUTH}
            element={
              <AuthRoute>
                <AuthWrapper />
              </AuthRoute>
            }
          />

          <Route path={AppRoutes.CHATBOT} element={<Chatbot />} />

          <Route
            path={AppRoutes.APP_COMPONENTS}
            element={
              <ProtectedRoute>
                <AppComponents />
              </ProtectedRoute>
            }
          />

          <Route
            path={AppRoutes.HOME}
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route element={<Home />}>
              {children.map((child) => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={child.component}
                />
              ))}
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TopBarProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
