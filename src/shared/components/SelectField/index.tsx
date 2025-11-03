import React, { MouseEvent, useMemo } from "react";
import { Select, Checkbox } from "antd";
import { SelectProps } from "antd/lib";
import { useController } from "react-hook-form";
import { IconChevronDown, IconCircleClose } from "obra-icons-react";

import { DropDownProps } from "src/shared/types/sharedComponents.type";
import { SelectModes } from "src/enums/selectModes.enum";
import Error from "../Error";
import Label from "../Label";

import styles from "./selectField.module.scss";
import { InputStatus } from "src/enums/inputStatus.enum";
import clsx from "clsx";
import { Colors } from "src/enums/colors.enum";

const { Option } = Select;

const SelectField = ({
  name,
  stopPropagation,
  onClick,
  onChange: customOnChange,
  label,
  placeholder,
  showCheckboxes = false,
  options,
  allowClear,
  showSelectedCount = false,
  className,
  ...props
}: DropDownProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
  });

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (stopPropagation) e.stopPropagation();
    if (onClick) onClick(e);
  };

  const handleOnChange: NonNullable<SelectProps["onChange"]> = (
    value,
    option,
  ) => {
    const filteredValue = Array.isArray(value)
      ? value.filter((v) => v !== "clear-selection")
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
    if (!showCheckboxes || !options) return options;

    return [...options].sort((a, b) => {
      const aSelected =
        Array.isArray(field.value) && field.value?.includes(a.value);
      const bSelected =
        Array.isArray(field.value) && field.value?.includes(b.value);
      if (aSelected === bSelected) return 0;
      return aSelected ? -1 : 1;
    });
  }, [showCheckboxes, options, field.value]);

  const getValue = () => {
    if (!field.value) return undefined;
    if (Array.isArray(field.value)) {
      return field.value.length > 0 ? field.value : undefined;
    }
    return field.value;
  };

  const selectProps: SelectProps = {
    ...field,
    value: getValue(),
    onClick: handleClick,
    onChange: handleOnChange,
    placeholder,
    ...(!showCheckboxes && { options }),
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
        <Label
          className={styles.label}
          htmlFor={name}
          required={props.required}
        >
          {label}
        </Label>
      )}
      <div className={clsx(styles.selectFieldWrapper, className)}>
        <Select
          {...selectProps}
          placeholder={placeholder}
          status={error ? InputStatus.ERROR : undefined}
          allowClear
          suffixIcon={<IconChevronDown size={20} strokeWidth={1.25} />}
        >
          {showCheckboxes && sortedOptions ? (
            <>
              {Array.isArray(field.value) && field.value.length > 0 && (
                <Option
                  key="clear-selection"
                  value="clear-selection"
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
                    <span>Clear Selection</span>
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
