import React from "react";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ClubProvider } from "./context/ClubContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/_main.scss";
import RequireNetwork from "./shared/components/HOC/requireNetwork";

const App = () => {
  return (
    <RequireNetwork>
      <ThemeProvider>
        <AuthProvider>
          <ClubProvider>
            <AppRoutes />
          </ClubProvider>
        </AuthProvider>
      </ThemeProvider>
    </RequireNetwork>
  );
};

export default App;
