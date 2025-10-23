import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { localStorageHelper } from "./localStorageHelper";

export const clearAuthData = () => {
  localStorageHelper.removeItem(LocalStorageKeys.USER);
  localStorageHelper.removeItem(LocalStorageKeys.TOKEN);
};

export const fillEmptyData = (val?: string | number) => val || "N/A";

export const getFullName = (firstName = "", lastName = ""): string =>
  `${firstName} ${lastName}`.trim();

export const formatCurrency = (
  amount: number | string = 0,
  currencySymbol: string = "$",
  showDecimals: boolean = false,
): string => {
  const numAmount = Number(amount);
  const formattedAmount = showDecimals
    ? numAmount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : numAmount.toLocaleString("en-US");

  return `${currencySymbol}${formattedAmount}`;
};
