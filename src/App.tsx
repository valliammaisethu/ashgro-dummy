import React from "react";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ClubProvider } from "./context/ClubContext";
import "./styles/_main.scss";
import RequireNetwork from "./shared/components/HOC/requireNetwork";

const App = () => {
  return (
    <RequireNetwork>
      <AuthProvider>
        <ClubProvider>
          <AppRoutes />
        </ClubProvider>
      </AuthProvider>
    </RequireNetwork>
  );
};

export default App;
