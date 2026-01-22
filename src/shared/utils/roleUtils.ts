import { RoleNames } from "src/enums/roleNames.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { localStorageHelper } from "./localStorageHelper";

export const getCurrentUserRole = () =>
  localStorageHelper.getItem(LocalStorageKeys.USER)?.role;

export const isSuperAdmin = () =>
  getCurrentUserRole() === RoleNames.SUPER_ADMIN;

export const isClubAdmin = () => getCurrentUserRole() === RoleNames.CLUB_ADMIN;

export const hasRole = (roleName: RoleNames) =>
  getCurrentUserRole() === roleName;

export const hasAnyRole = (roleNames: RoleNames[]) => {
  const role = getCurrentUserRole();
  return role ? roleNames.includes(role as RoleNames) : false;
};

export const getCurrentUserIds = () => {
  const user = localStorageHelper.getItem(LocalStorageKeys.USER);
  return { userId: user?.id, clubId: user?.clubId };
};
