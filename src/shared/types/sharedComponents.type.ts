import { CheckboxProps, InputProps } from "antd";

export interface PhoneNumberFieldProps extends InputProps {
  name: string;
  phoneCodeName: string;
  label?: string;
}

export interface CheckboxFieldProps extends CheckboxProps {
  name: string;
  label?: string;
}
