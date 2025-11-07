import React from "react";
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";

import { MobileCode } from "src/models/meta.model";
import { REGEX } from "src/constants/regex";

import styles from "src/shared/components/PhoneNumberInput/phoneNumberInput.module.scss";

export const countryOptions = getCountries()?.map((code) => ({
  label: `+${getCountryCallingCode(code)} (${code})`,
  value: code,
}));

export const getPhoneCodeOptions = (options: MobileCode[]) =>
  options.map((country) => {
    const phoneCode = country?.phoneCode?.startsWith("+")
      ? country?.phoneCode
      : `+${country?.phoneCode}`;

    return {
      key: country?.isoCode,
      value: country?.phoneCode,
      label: (
        <p className={styles.phoneCode} key={country.isoCode}>
          <span className={styles.flag}>{country?.flag}</span>
          {phoneCode}
        </p>
      ),
    };
  });

export const getDigitsOnly = (val: string) => val.replace(REGEX.DIGITS, "");

export const formatAndSetPhoneNumber = (input: string) => {
  const raw = getDigitsOnly(input);
  const formatted = new AsYouType("US").input(raw);
  return `+${formatted}`;
};
