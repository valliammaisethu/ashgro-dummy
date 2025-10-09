import { REGEX } from "../../constants/regex";

export const parseNumber = (val: unknown, defaultValue = 0) => {
  const num = Number(val);

  return isNaN(num) ? defaultValue : num;
};

export const getDigitsOnly = (val?: string) => {
  if (!val) return;
  return val.replace(REGEX.DIGITS, "");
};
