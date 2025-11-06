import React from "react";
import { useFormContext } from "react-hook-form";
import { AsYouType } from "libphonenumber-js";

import { INPUT_TYPE } from "src/enums/inputType";
import { getDigitsOnly } from "src/shared/utils/parser";
import { PhoneNumberFieldProps } from "src/shared/types/sharedComponents.type";

import InputField from "../InputField";
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

  const phoneValue = watch(name) || "";

  const formatAndSetPhoneNumber = (input: string) => {
    const raw = getDigitsOnly(input);
    const formatted = new AsYouType("US").input(raw);
    setValue(name, formatted, { shouldValidate: true });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    formatAndSetPhoneNumber(e.target.value);

  return (
    <div className={styles.wrapper}>
      {label && (
        <Label className={styles.label} htmlFor={name} required={required}>
          {label}
        </Label>
      )}
      <div className={styles.inputWrapper}>
        <div className={styles.countryCodePrefix}>
          <span className={styles.flag}>🇺🇸</span>
          <span>+1</span>
        </div>
        <InputField
          name={name}
          {...props}
          type={INPUT_TYPE.TEL}
          value={phoneValue}
          onChange={handlePhoneChange}
          inputMode={INPUT_TYPE.TEL}
          className={styles.phoneInput}
        />
      </div>
    </div>
  );
};

export default PhoneNumberField;
