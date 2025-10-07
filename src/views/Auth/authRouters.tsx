import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "../../views/Auth/LoginForm";
import { RouterProps } from "../../shared/types/route.type";
import {
  AppRoutes,
  NavigationRoutes,
} from "../../routes/routeConstants/appRoutes";

const authRouter = () => {
  const routes: RouterProps[] = [
    { path: AppRoutes.LOGIN, component: <LoginForm /> },
  ];

  return (
    <Routes>
      {routes?.map((route, index) => {
        return (
          <Route key={index} path={route?.path} element={route?.component}>
            {route.children &&
              route.children.map((childRoute) => (
                <Route
                  key={childRoute.path}
                  path={childRoute.path}
                  element={childRoute.component}
                />
              ))}
          </Route>
        );
      })}
      <Route path="*" element={<Navigate to={NavigationRoutes.LOGIN} />} />
    </Routes>
  );
};

export default authRouter;
