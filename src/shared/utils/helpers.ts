import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { localStorageHelper } from "./localStorageHelper";

export const clearAuthData = () => {
  localStorageHelper.removeItem(LocalStorageKeys.USER);
  localStorageHelper.removeItem(LocalStorageKeys.TOKEN);
};
