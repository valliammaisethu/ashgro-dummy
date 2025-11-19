import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";

import { REGEX } from "src/constants/regex";

export const countryOptions = getCountries()?.map((code) => ({
  label: `+${getCountryCallingCode(code)} (${code})`,
  value: code,
}));

export const getDigitsOnly = (val: string) => val.replace(REGEX.DIGITS, "");

export const formatAndSetPhoneNumber = (input?: string) => {
  if (!input) return "-";

  const raw = getDigitsOnly(input);
  const formatted = new AsYouType("US").input(raw);
  return `+${formatted}`;
};
