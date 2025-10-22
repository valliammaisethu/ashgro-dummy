import {
  ChangeEvent,
  ComponentProps,
  CSSProperties,
  MouseEvent,
  ReactNode,
} from "react";
import {
  CheckboxChangeEvent,
  CheckboxOptionType,
  CheckboxProps,
  InputProps,
  Radio,
  SelectProps,
  SwitchProps,
} from "antd";

import { ButtonSize } from "antd/es/button";
import { ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import { Placement } from "src/enums/placement.enum";
import { tooltipPosition } from "src/enums/tooltipPosition";
import { BaseOptionType } from "antd/es/select";
import { DefaultOptionType } from "antd/es/cascader";
import { Trigger } from "src/enums/trigger.enum";
export interface PhoneNumberFieldProps extends InputProps {
  name: string;
  phoneCodeName: string;
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

export interface tabItems {
  closeIcon?: ReactNode;
  disabled?: boolean;
  forceRender?: boolean;
  key: string;
  label: ReactNode;
  children: ReactNode;
}

export interface TabsProps {
  activeKey?: string;
  addIcon?: ReactNode;
  centered?: boolean;
  defaultActiveKey?: string;
  hideAdd?: boolean;
  items: tabItems[];
  moreIcon?: ReactNode;
  tabBarGutter?: number;
  tabBarStyle?: CSSProperties;
  tabPosition?: "top" | "bottom" | "right" | "left";
  type?: "line" | "card" | "editable-card";
  onEdit?: () => void;
}

export interface SwitchFieldProps extends SwitchProps {
  name: string;
}

export interface CustomCheckboxProps {
  children?: React.ReactNode;
  disabled?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
  group?: boolean;
  onChange: (
    singleHandler?: CheckboxChangeEvent,
    groupHandler?: Array<string | number>,
  ) => void;
  options?: Array<CheckboxOptionType | string | number>;
  checked?: boolean;
}

export interface CheckboxFieldProps extends CheckboxProps {
  name: string;
  label?: string;
}

export interface ButtonTooltipProps {
  title: string;
  placement?: tooltipPosition;
  trigger?: Trigger;
  color?: string;
  arrowPointAtCenter?: boolean;
}

export interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  htmlType?: HtmlButtonType;
  type?: ButtonTypes;
  className?: string;
  moduleClassName?: string;
  icon?: ReactNode;
  disabled?: boolean;
  size?: ButtonSize;
  loading?: boolean;
  name?: string;
  target?: string;
  href?: string;
  tooltip?: string | ButtonTooltipProps;
}

export interface INotification {
  title?: string;
  description?: string;
  type?: NotificationTypes;
  duration?: number;
  placement?: Placement;
  className?: string;
}

export interface ProgressBarProps {
  duration: number;
  type: NotificationTypes;
}

export interface SearchFieldProps {
  onSearch: (value: string) => void;
  onFilter?: () => void;
  placeholder?: string;
  className?: string;
}

export interface ProspectData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  followUpDate: string;
  leadSource: string;
  leadStatus: {
    label: string;
    color: string;
  };
}

export class CardProps {
  children: ReactNode;
  className?: string;
}
export interface DropdownProps<
  ValueType,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends SelectProps<ValueType, OptionType> {
  name: string;
  title?: string;
}

export interface DropDownProps extends SelectProps {
  name: string;
  stopPropagation?: boolean;
  enableResponsiveTags?: boolean;
  label?: string;
  showCheckboxes?: boolean;
}
export interface HandlePasswordChangeParams {
  e: ChangeEvent<HTMLInputElement>;
  realValue: string;
  setRealValue: (value: string) => void;
  setMaskedValue: (value: string) => void;
  onChange: (value: string) => void;
}

export interface StatusTagProps {
  label: string;
  color: string;
}
