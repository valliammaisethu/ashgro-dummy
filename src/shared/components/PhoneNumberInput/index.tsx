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
  name,
  label,
  required = false,
  ...props
}: PhoneNumberFieldProps) => {
  const { watch, setValue } = useFormContext<{
    [key: string]: string | undefined;
  }>();

  const phoneValue = watch(name);

  const formatAndSetPhoneNumber = (
    input: string,
    previousValue: string | undefined,
  ) => {
    const raw = getDigitsOnly(input);
    const prevRaw = getDigitsOnly(previousValue ?? "");

    // If user deleted a formatting char, remove last digit instead
    if (raw && prevRaw && raw === prevRaw) {
      const trimmed = raw.slice(0, -1);
      if (!trimmed) {
        setValue(name, undefined);
        return;
      }
      const formatted = new AsYouType("US").input(trimmed);
      setValue(name, formatted, { shouldValidate: true });
      return;
    }

    if (!raw) {
      setValue(name, undefined);
      return;
    }
    const formatted = new AsYouType("US").input(raw);
    setValue(name, formatted, { shouldValidate: true });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    formatAndSetPhoneNumber(e.target.value, phoneValue);

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
