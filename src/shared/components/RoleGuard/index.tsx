import React, { ReactNode } from "react";
import { RoleNames } from "src/enums/roleNames.enum";
import { useUserRole } from "src/shared/hooks/useUserRole";

interface RoleGuardProps {
  allowedRoles: RoleNames[];
  children: ReactNode;
  fallback?: ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  children,
  fallback = null,
}) => {
  const { hasAnyRole } = useUserRole();

  if (hasAnyRole(allowedRoles)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};

export default RoleGuard;
