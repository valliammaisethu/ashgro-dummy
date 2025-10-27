import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { AsYouType, CountryCode } from "libphonenumber-js";

import { INPUT_TYPE } from "src/enums/inputType";
import { phoneNumberData } from "src/constants/phoneNumberData";
import { USPhoneCode } from "src/constants/sharedComponents";
import { getDigitsOnly } from "src/shared/utils/parser";
import { getPhoneCodeOptions } from "src/shared/utils/phoneNumberUtils";
import { PhoneNumberFieldProps } from "src/shared/types/sharedComponents.type";

import InputField from "../InputField";
import DropdownField from "../Dropdown";
import Label from "../Label";

import styles from "./phoneNumberInput.module.scss";

const PhoneNumberField = ({
  phoneCodeName,
  name,
  label,
  required = false,
  ...props
}: PhoneNumberFieldProps) => {
  const { watch, setValue } = useFormContext<{
    [key: string]: string;
  }>();

  const selectedIsoCode = watch(phoneCodeName) || USPhoneCode;
  const phoneValue = watch(name) || "";

  useEffect(() => {
    if (!watch(phoneCodeName))
      setValue(phoneCodeName, USPhoneCode, { shouldValidate: true });
  }, [phoneCodeName, setValue]);

  const formatAndSetPhoneNumber = (input: string, countryCode?: string) => {
    if (!countryCode) return;

    const raw = getDigitsOnly(input);
    const formatted = new AsYouType(countryCode as CountryCode).input(raw);
    setValue(name, formatted, { shouldValidate: true });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formatAndSetPhoneNumber(e.target.value, selectedIsoCode);
  };

  const handleOnChange = (value: string) => {
    setValue(phoneCodeName, value, { shouldValidate: true });
    formatAndSetPhoneNumber(phoneValue, value);
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <Label className={styles.label} htmlFor={name} required={required}>
          {label}
        </Label>
      )}
      <div className={styles.inputWrapper}>
        <div className={styles.dropDownWrapper}>
          <DropdownField.RHF
            name={phoneCodeName}
            options={getPhoneCodeOptions(phoneNumberData.data.mobileCodes)}
            className={styles.dropDown}
            showSearch
            defaultValue={USPhoneCode}
            filterOption={false}
            onChange={handleOnChange}
          />
        </div>
        <InputField
          name={name}
          {...props}
          type={INPUT_TYPE.TEL}
          value={phoneValue}
          onChange={handlePhoneChange}
          disabled={!selectedIsoCode}
          inputMode={INPUT_TYPE.TEL}
          className={styles.phoneInput}
        />
      </div>
    </div>
  );
};

export default PhoneNumberField;
