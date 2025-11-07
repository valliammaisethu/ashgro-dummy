import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { localStorageHelper } from "./localStorageHelper";
import { RcFile } from "antd/es/upload";
import { CONTENT_TYPES } from "src/enums/contentTypes.enum";

export const clearAuthData = () => {
  localStorageHelper.removeItem(LocalStorageKeys.USER);
  localStorageHelper.removeItem(LocalStorageKeys.TOKEN);
};

export const fillEmptyData = (val?: string) => val || "-";

export const getFullName = (firstName = "", lastName = ""): string =>
  `${firstName} ${lastName}`.trim();

export const formatCurrency = (
  amount: number | string,
  currencySymbol: string = "$",
  showDecimals: boolean = false,
): string => {
  if (!amount) return "N/A";
  const numAmount = Number(amount);
  const formattedAmount = showDecimals
    ? numAmount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : numAmount.toLocaleString("en-US");

  return `${currencySymbol} ${formattedAmount}`;
};

export const uploadHeaders = (file?: RcFile) => ({
  "Content-Type": file?.type || CONTENT_TYPES.OCTET_STREAM,
});

export const mapToSelectOptionsDynamic = <T extends { id?: string }>(
  items?: T[],
) => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item.id)
    .map((item) => {
      const labelKey = (Object.keys(item) as Array<keyof T>).find(
        (key) => key !== "id",
      );

      return {
        value: item.id!,
        label: labelKey ? String(item[labelKey]) : "",
      };
    });
};

export const cleanObject = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj
      .map(cleanObject)
      .filter(
        (v) =>
          v != null &&
          v !== "" &&
          !(typeof v === "object" && Object.keys(v).length === 0),
      );
  }

  if (obj && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleaned = cleanObject(value);
      if (
        cleaned != null &&
        cleaned !== "" &&
        !(typeof cleaned === "object" && Object.keys(cleaned).length === 0)
      ) {
        acc[key] = cleaned;
      }
      return acc;
    }, {} as any);
  }

  return obj;
};

export const ValidateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
