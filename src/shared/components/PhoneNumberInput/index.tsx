import React, { useEffect, useState } from "react";
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

import styles from "./phoneNumberInput.module.scss";
import Label from "../Label";

const PhoneNumberField = ({
  phoneCodeName,
  name,
  label,
  required = false,
  ...props
}: PhoneNumberFieldProps) => {
  const { watch, setValue } = useFormContext();

  const { [phoneCodeName]: selectedIsoCode, [name]: phoneValue } = watch();

  const formatAndSetPhoneNumber = (input: string, selectedIsoCode?: string) => {
    if (!selectedIsoCode) return;

    const raw = getDigitsOnly(input);
    const formatted = new AsYouType(selectedIsoCode as CountryCode).input(raw);
    setValue(name, formatted, { shouldValidate: true });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formatAndSetPhoneNumber(e.target.value, selectedIsoCode);
  };

  const [, setSearchText] = useState<string>("");

  const handleOnSearch = (value: string) => setSearchText(value);

  useEffect(() => {
    formatAndSetPhoneNumber(phoneValue, selectedIsoCode);
  }, [selectedIsoCode]);

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
            onSearch={handleOnSearch}
          />
        </div>
        <InputField
          name={name}
          {...props}
          type={INPUT_TYPE.TEL}
          value={phoneValue || ""}
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
