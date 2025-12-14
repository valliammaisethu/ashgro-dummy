import React from "react";

import { DashboardFiltersProvider } from "src/context/DashboardFiltersContext";
import Dashboard from ".";

// TODO: Move to index.tsx when we move all the components to proper folder structure in dashboard
const DashboardWrapper = () => {
  return (
    <DashboardFiltersProvider>
      <Dashboard />
    </DashboardFiltersProvider>
  );
};

export default DashboardWrapper;
