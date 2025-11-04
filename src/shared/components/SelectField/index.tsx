import React, { MouseEvent, useMemo, useState, useEffect } from "react";
import { Select, Checkbox } from "antd";
import { SelectProps } from "antd/lib";
import { useController } from "react-hook-form";
import { IconChevronDown } from "obra-icons-react";

import { DropDownProps } from "src/shared/types/sharedComponents.type";
import { SelectModes } from "src/enums/selectModes.enum";
import Error from "../Error";
import Label from "../Label";

import styles from "./selectField.module.scss";
import { InputStatus } from "src/enums/inputStatus.enum";
import { Buttons } from "src/enums/buttons.enum";

const { Option } = Select;

const SelectField = ({
  name,
  stopPropagation,
  onClick,
  onChange: customOnChange,
  label,
  placeholder,
  showCheckboxes = false,
  options = [],
  allowClear,
  showClear = false,
  onClear,
  allowCustomOption = false,
  ...props
}: DropDownProps & { allowCustomOption?: boolean }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  const [customOptions, setCustomOptions] = useState(options);

  useEffect(() => {
    setCustomOptions((prev) => {
      const merged = [
        ...options,
        ...prev.filter(
          (opt) => !options.some((def) => def.value === opt.value),
        ),
      ];
      return merged;
    });
  }, [options]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (stopPropagation) e.stopPropagation();
    if (onClick) onClick(e);
  };

  const handleOnChange: NonNullable<SelectProps["onChange"]> = (
    value,
    option,
  ) => {
    field.onChange(value);
    field.onBlur();
    customOnChange?.(value, option);
  };

  const sortedOptions = useMemo(() => {
    if (!showCheckboxes || !customOptions) return customOptions;
    return [...customOptions].sort((a, b) => {
      const aSelected =
        Array.isArray(field.value) && field.value?.includes(a.value);
      const bSelected =
        Array.isArray(field.value) && field.value?.includes(b.value);
      if (aSelected === bSelected) return 0;
      return aSelected ? -1 : 1;
    });
  }, [showCheckboxes, customOptions, field.value]);

  const getValue = () => {
    if (!field.value) return undefined;
    if (Array.isArray(field.value)) {
      return field.value.length > 0 ? field.value : undefined;
    }
    return field.value;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!allowCustomOption) return;
    const inputValue = e.currentTarget.value.trim();

    if (e.key === "Enter" && inputValue) {
      const exists = customOptions.some(
        (opt) => String(opt.value).toLowerCase() === inputValue.toLowerCase(),
      );

      if (!exists) {
        const newOption = { label: inputValue, value: inputValue };
        setCustomOptions((prev) => [...prev, newOption]);

        if (Array.isArray(field.value)) {
          handleOnChange([...field.value, inputValue], newOption);
        } else {
          handleOnChange(inputValue, newOption);
        }
      }

      e.preventDefault();
    }
  };

  const selectProps: SelectProps = {
    ...field,
    value: getValue(),
    onClick: handleClick,
    onChange: handleOnChange,
    placeholder,
    onInputKeyDown: handleKeyDown,
    ...(!showCheckboxes && { options: sortedOptions }),
    ...(showCheckboxes && {
      mode: SelectModes.MULTIPLE,
      optionLabelProp: "label",
      filterOption: false,
    }),
    ...props,
  };

  return (
    <div className={styles.selectField}>
      {label && (
        <div className={styles.labelContainer}>
          <Label
            className={styles.label}
            htmlFor={name}
            required={props.required}
          >
            {label}
          </Label>
          {showClear && onClear && (
            <span onClick={onClear} className={styles.clearButton}>
              {Buttons.CLEAR}
            </span>
          )}
        </div>
      )}

      <div className={styles.selectFieldWrapper}>
        <Select
          {...selectProps}
          placeholder={placeholder}
          status={error ? InputStatus.ERROR : undefined}
          allowClear={allowClear}
          suffixIcon={<IconChevronDown size={20} strokeWidth={1.25} />}
        >
          {showCheckboxes && sortedOptions
            ? sortedOptions.map((opt) => (
                <Option key={opt.value} value={opt.value} label={opt.label}>
                  <span>{opt.label}</span>
                  <Checkbox
                    className={styles.optionCheckbox}
                    checked={
                      Array.isArray(field.value) &&
                      field.value?.map(String)?.includes(String(opt.value))
                    }
                  />
                </Option>
              ))
            : null}
        </Select>
      </div>

      {<Error className={styles.selectFieldError} message={error?.message} />}
    </div>
  );
};

export default SelectField;
