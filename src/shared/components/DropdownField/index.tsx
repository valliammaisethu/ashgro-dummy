import React, { ComponentProps } from "react";
import { Select, SelectProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { BaseOptionType, DefaultOptionType } from "rc-select/lib/Select";

import Error from "../Error";

interface DropdownProps<
  ValueType,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends SelectProps<ValueType, OptionType> {
  name: string;
  title?: string;
}

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

const DropdownWithRHF = (props: ComponentProps<typeof Dropdown>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <Dropdown
            {...props}
            {...field}
            onChange={(value, option) => {
              field.onChange(value);
              if (props.onChange) props.onChange(value, option);
            }}
            value={field.value}
          />
          {fieldState.error && (
            <Error message={fieldState.error.message ?? ""} />
          )}
        </>
      )}
    />
  );
};

Dropdown.RHF = DropdownWithRHF;

export default Dropdown;
