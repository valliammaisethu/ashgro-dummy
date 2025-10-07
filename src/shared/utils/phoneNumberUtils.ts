import { getCountries, getCountryCallingCode } from "libphonenumber-js";

export const countryOptions = getCountries().map((code) => ({
  label: `+${getCountryCallingCode(code)} (${code})`,
  value: code,
}));
