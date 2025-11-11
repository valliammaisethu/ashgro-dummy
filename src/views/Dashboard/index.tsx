import React from "react";
import { useUserRole } from "src/shared/hooks/useUserRole";

const DashboardWrapper = () => {
  const SuperAdminDashboard = () => {
    return <div>SuperAdminDashboard</div>;
  };

  const ClubAdminDashboard = () => {
    return <div>ClubAdmin</div>;
  };
  const { isSuperAdmin, isClubAdmin } = useUserRole();

  if (isSuperAdmin) return <SuperAdminDashboard />;
  if (isClubAdmin) return <ClubAdminDashboard />;
  return null;
};

export default DashboardWrapper;
