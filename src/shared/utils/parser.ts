import { REGEX } from "../../constants/regex";

export const parseNumber = (val: unknown, defaultValue = 0) => {
  const num = Number(val);

  return isNaN(num) ? defaultValue : num;
};

export const getDigitsOnly = (val?: string) => {
  if (!val) return;
  return val.replace(REGEX.DIGITS, "");
};

export const toTitleCase = (str: string = "") =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
