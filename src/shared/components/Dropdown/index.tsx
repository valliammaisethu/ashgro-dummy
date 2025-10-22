import React from "react";
import { Select } from "antd";
import { useController, useFormContext } from "react-hook-form";
import { BaseOptionType, DefaultOptionType } from "rc-select/lib/Select";
import { IconChevronDown } from "obra-icons-react";

import { DropdownProps } from "src/shared/types/sharedComponents.type";
import Error from "../Error";

const Dropdown = <
  ValueType,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>({
  title,
  ...props
}: DropdownProps<ValueType, OptionType>) => (
  <div>
    {title && <div>{title}</div>}
    <Select {...props} />
  </div>
);

const DropdownWithRHF = <
  ValueType,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  props: DropdownProps<ValueType, OptionType>,
) => {
  const { name, onChange: customOnChange, ...restProps } = props;
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleOnChange = (
    value: ValueType,
    option?: OptionType | OptionType[],
  ) => {
    field.onChange(value, option);
    if (customOnChange) customOnChange(value, option);
  };

  return (
    <>
      <Dropdown<ValueType, OptionType>
        {...restProps}
        name={name}
        value={field.value}
        onChange={handleOnChange}
        suffixIcon={<IconChevronDown size={20} strokeWidth={1.25} />}
      />
      {error && <Error message={error.message} />}
    </>
  );
};

Dropdown.RHF = DropdownWithRHF;

export default Dropdown;
