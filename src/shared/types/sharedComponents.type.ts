import { ComponentProps, CSSProperties, MouseEvent, ReactNode } from "react";
import {
  CheckboxChangeEvent,
  CheckboxOptionType,
  CheckboxProps,
  InputProps,
  Radio,
  SwitchProps,
} from "antd";

import { ButtonSize } from "antd/es/button";
import { ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
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

export interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
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
}

export interface INotification {
  message: string;
  description: string;
  type: NotificationTypes;
  showProgress?: boolean;
  duration?: number;
}

export interface ProgressBarProps {
  duration: number;
  type: NotificationTypes;
}
