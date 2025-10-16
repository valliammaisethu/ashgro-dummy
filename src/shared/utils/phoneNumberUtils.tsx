import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { MobileCode } from "../../models/meta.model";
import React from "react";
import { REGEX } from "../../constants/regex";

export const countryOptions = getCountries()?.map((code) => ({
  label: `+${getCountryCallingCode(code)} (${code})`,
  value: code,
}));

export const getPhoneCodeOptions = (
  options: MobileCode[],
  className?: string,
) =>
  options.map((country) => {
    const phoneCode = country?.phoneCode?.startsWith("+")
      ? country?.phoneCode
      : `+${country?.phoneCode}`;

    return {
      key: country?.isoCode,
      value: country?.phoneCode,
      label: (
        <p className={className} key={country.isoCode}>
          <span>{country?.flag}</span>
          {phoneCode}
        </p>
      ),
    };
  });

export const getDigitsOnly = (val: string) => val.replace(REGEX.DIGITS, "");
