import { RoleNames } from "src/enums/roleNames.enum";
import {
  getCurrentUserRole,
  isSuperAdmin as checkIsSuperAdmin,
  isClubAdmin as checkIsClubAdmin,
  hasRole as checkHasRole,
  hasAnyRole as checkHasAnyRole,
} from "../utils/roleUtils";

export const useUserRole = () => {
  const role = getCurrentUserRole();

  return {
    role,
    isSuperAdmin: checkIsSuperAdmin(),
    isClubAdmin: checkIsClubAdmin(),
    hasRole: (roleName: RoleNames) => checkHasRole(roleName),
    hasAnyRole: (roleNames: RoleNames[]) => checkHasAnyRole(roleNames),
  };
};
