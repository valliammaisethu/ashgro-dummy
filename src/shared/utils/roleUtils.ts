import { RoleNames } from "src/enums/roleNames.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { localStorageHelper } from "./localStorageHelper";
import { UserData } from "src/models/user.model";

export const getCurrentUserRole = (): string | undefined => {
  const user = localStorageHelper.getItem(
    LocalStorageKeys.USER,
  ) as UserData | null;
  return user?.role;
};

export const isSuperAdmin = (): boolean => {
  const role = getCurrentUserRole();
  return role === RoleNames.SUPER_ADMIN;
};

export const isClubAdmin = (): boolean => {
  const role = getCurrentUserRole();
  return role === RoleNames.CLUB_ADMIN;
};

export const hasRole = (roleName: RoleNames): boolean => {
  const role = getCurrentUserRole();
  return role === roleName;
};

export const hasAnyRole = (roleNames: RoleNames[]): boolean => {
  const role = getCurrentUserRole();
  return role ? roleNames.includes(role as RoleNames) : false;
};
