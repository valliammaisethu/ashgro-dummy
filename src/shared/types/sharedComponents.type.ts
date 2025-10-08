import { CheckboxProps, InputProps, Radio } from "antd";
import { ComponentProps } from "react";

export interface PhoneNumberFieldProps extends InputProps {
  name: string;
  phoneCodeName: string;
  label?: string;
}

export interface CheckboxFieldProps extends CheckboxProps {
  name: string;
  label?: string;
}

export interface NumberIncrementerProps {
  name: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export interface RadioButtonProps {
  label?: string;
}

export interface RadioExtendedProps
  extends RadioButtonProps,
    ComponentProps<typeof Radio.Group> {}
