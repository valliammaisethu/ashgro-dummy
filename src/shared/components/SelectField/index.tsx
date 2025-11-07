import React, { MouseEvent, useMemo, useState, useEffect } from "react";
import { Select, Checkbox } from "antd";
import { SelectProps } from "antd/lib";
import { useController } from "react-hook-form";
import { IconChevronDown, IconCircleClose } from "obra-icons-react";
import clsx from "clsx";

import { DropDownProps } from "src/shared/types/sharedComponents.type";
import { SelectModes } from "src/enums/selectModes.enum";
import { Colors } from "src/enums/colors.enum";
import { Buttons } from "src/enums/buttons.enum";
import { InputStatus } from "src/enums/inputStatus.enum";
import Error from "../Error";
import Label from "../Label";
import {
  clearSelectionKey,
  clearSelectionLabel,
} from "src/constants/sharedComponents";

import styles from "./selectField.module.scss";
import { renderNotification } from "src/shared/utils/renderNotification";
import { invalidEmailMessages } from "src/constants/notificationMessages";
import { NotificationTypes } from "src/enums/notificationTypes";

const { Option } = Select;

const { title, description } = invalidEmailMessages;

const SelectField = ({
  name,
  stopPropagation,
  onClick,
  onChange: customOnChange,
  label,
  placeholder,
  showCheckboxes = false,
  loading,
  options = [],
  allowClear,
  showSelectedCount = false,
  className,
  showClear = false,
  onClear,
  allowCustomOption = false,
  validateCustomInput,
  notFoundContent,
  ...props
}: DropDownProps & {
  allowCustomOption?: boolean;
  validateCustomInput?: (value: string) => boolean;
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  const [customOptions, setCustomOptions] = useState(options);
  const [searchValue, setSearchValue] = useState("");

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
    const filteredValue = Array.isArray(value)
      ? value.filter((v) => v !== clearSelectionKey)
      : value;

    field.onChange(filteredValue);
    field.onBlur();
    customOnChange?.(filteredValue, option);
  };

  const handleClearSelection = () => {
    field.onChange([]);
    field.onBlur();
    customOnChange?.([], undefined);
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

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!allowCustomOption) return;
    const inputValue = e.currentTarget.value.trim();

    if (e.key === "Enter" && inputValue) {
      if (validateCustomInput && !validateCustomInput(inputValue)) {
        e.preventDefault();
        renderNotification(title, description, NotificationTypes.ERROR);
        return;
      }

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

      setSearchValue("");
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
    notFoundContent,
    ...(allowCustomOption && {
      searchValue,
      onSearch: handleSearch,
    }),
    ...(!showCheckboxes && { options: sortedOptions }),
    ...(showCheckboxes && {
      mode: SelectModes.MULTIPLE,
      optionLabelProp: "label",
      filterOption: false,
    }),
    ...(showSelectedCount &&
      showCheckboxes && {
        maxTagCount: 0,
        maxTagPlaceholder: (omittedValues) => (
          <div className={styles.countBadgeDiv}>
            <div className={styles.placeholderText}>{placeholder}</div>
            <div className={styles.countBadge}>+{omittedValues.length}</div>
          </div>
        ),
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
      <div className={clsx(styles.selectFieldWrapper, className)}>
        <Select
          {...selectProps}
          loading={loading}
          placeholder={placeholder}
          status={error ? InputStatus.ERROR : undefined}
          allowClear={allowClear}
          suffixIcon={<IconChevronDown size={20} strokeWidth={1.25} />}
        >
          {showCheckboxes && sortedOptions ? (
            <>
              {Array.isArray(field.value) && field.value.length > 0 && (
                <Option
                  key={clearSelectionKey}
                  value={clearSelectionKey}
                  className={styles.clearSelectionOption}
                  disabled
                >
                  <div
                    className={styles.clearSelectionText}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearSelection();
                    }}
                  >
                    <span>{clearSelectionLabel}</span>
                    <IconCircleClose
                      strokeWidth={1.25}
                      color={Colors.MODAL_CLOSE_ICON}
                      size={24}
                    />
                  </div>
                </Option>
              )}
              {sortedOptions?.map((opt) => (
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
              ))}
            </>
          ) : null}
        </Select>
      </div>

      {<Error className={styles.selectFieldError} message={error?.message} />}
    </div>
  );
};

export default SelectField;
