import { REGEX } from "../../constants/regex";

export const parseNumber = (val: unknown, defaultValue = 0) => {
  const num = Number(val);

  return isNaN(num) ? defaultValue : num;
};

export const getDigitsOnly = (val?: string) => {
  if (!val) return undefined;
  return val.replace(REGEX.DIGITS, "");
};

export const toTitleCase = (str: string = "") =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const getInitials = (name?: string): string => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
