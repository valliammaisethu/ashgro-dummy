import React from "react";
import { useUserRole } from "src/shared/hooks/useUserRole";
import ClubAdminDashboard from "./Admin";
import SuperAdminDashboard from "./SuperAdmin";

const DashboardWrapper = () => {
  const { isSuperAdmin, isClubAdmin } = useUserRole();

  if (isSuperAdmin) return <SuperAdminDashboard />;
  if (isClubAdmin) return <ClubAdminDashboard />;
  return null;
};

export default DashboardWrapper;
