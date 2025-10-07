import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthWrapper from "../views/Auth/AuthWrapper";
import AppComponents from "../views/AppComponents";
import { AppRoutes } from "./routeConstants/appRoutes";
import { RouterProps } from "../shared/types/route.type";
import NotFound from "../shared/components/FallbackPage";

const AppRouter = () => {
  const routes: RouterProps[] = [
    { path: AppRoutes.AUTH, component: <AuthWrapper /> },
    { path: AppRoutes.APP_COMPONENTS, component: <AppComponents /> },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={AppRoutes.APP_COMPONENTS} replace />}
        />

        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component}>
            {route.children &&
              route.children.map((childRoute) => (
                <Route
                  key={childRoute.path}
                  path={childRoute.path}
                  element={childRoute.component}
                />
              ))}
          </Route>
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
