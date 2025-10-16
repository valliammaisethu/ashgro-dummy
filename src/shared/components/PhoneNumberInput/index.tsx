import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AsYouType } from "libphonenumber-js";
import InputField from "../InputField";
import DropdownField from "../DropdownField";
import styles from "./phoneNumberInput.module.scss";
import { PhoneNumberFieldProps } from "../../types/sharedComponents.type";
import { getPhoneCodeOptions } from "../../utils/phoneNumberUtils";
import { INPUT_TYPE } from "../../../enums/inputType";
import { getDigitsOnly } from "../../utils/parser";
import { phoneNumberData } from "../../../constants/phoneNumberData";
import { USPhoneCode } from "src/constants/sharedComponents";

const PhoneNumberField = ({
  phoneCodeName,
  name,
  label,
  ...props
}: PhoneNumberFieldProps) => {
  const { watch, setValue } = useFormContext();

  const selectedIsoCode = watch(phoneCodeName);
  const phoneValue = watch(name);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedIsoCode) return;

    const raw = getDigitsOnly(e.target.value);

    const formatted = new AsYouType(selectedIsoCode).input(raw ?? "");
    setValue(name, formatted, { shouldValidate: true });
  };
  /// TODO: Search has to be implemented after BE API
  const [, setSearchText] = useState<string>("");

  const handleOnSearch = (value: string) => setSearchText(value);

  useEffect(() => {
    if (!selectedIsoCode || !phoneValue) return;

    const raw = getDigitsOnly(phoneValue);
    const formatted = new AsYouType(selectedIsoCode).input(raw ?? "");
    setValue(name, formatted);
  }, [selectedIsoCode]);

  return (
    <div className={styles.wrapper}>
      <label>{label}</label>
      <div className={styles.inputWrapper}>
        <div className={styles.dropDownWrapper}>
          <DropdownField.RHF
            name={phoneCodeName}
            options={getPhoneCodeOptions(
              phoneNumberData.data.mobileCodes,
              styles.phoneCode,
            )}
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
        />
      </div>
    </div>
  );
};

export default PhoneNumberField;
