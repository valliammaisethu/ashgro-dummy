import React from "react";
import { useUserRole } from "src/shared/hooks/useUserRole";
import ClubAdminSettings from "./ClubAdminSettings";
import SuperAdminSettings from "./SuperAdminSettings";

const SettingsWrapper = () => {
  const { isSuperAdmin, isClubAdmin } = useUserRole();

  if (isSuperAdmin) return <SuperAdminSettings />;
  if (isClubAdmin) return <ClubAdminSettings />;
  return null;
};

export default SettingsWrapper;
