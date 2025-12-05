import queryString from "query-string";
import dayjs from "dayjs";

import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { localStorageHelper } from "./localStorageHelper";
import { RcFile } from "antd/es/upload";
import { CONTENT_TYPES } from "src/enums/contentTypes.enum";
import { DateFormats } from "src/enums/dateFormats.enum";

export const clearAuthData = () => {
  localStorageHelper.removeItem(LocalStorageKeys.USER);
  localStorageHelper.removeItem(LocalStorageKeys.TOKEN);
};

export const fillEmptyData = (val?: string) => val || "-";

export const getFullName = (firstName = "", lastName = ""): string =>
  `${firstName} ${lastName}`.trim();

export const getInitials = (firstName = "", lastName = ""): string =>
  (firstName[0] ?? "").toUpperCase() + (lastName[0] ?? "").toUpperCase();

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
export const getStatusTagBackgroundColor = (color?: string) => {
  if (!color) return "#ffffff";

  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, 0.3)`;
};

export const getCalendarMonthFromQuery = (search: string) => {
  const query = queryString.parse(search);
  return (query?.month as string) || dayjs().format(DateFormats.YYYY_MM);
};
