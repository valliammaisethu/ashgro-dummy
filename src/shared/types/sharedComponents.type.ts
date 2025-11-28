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
  ModalProps as AntdModalProps,
  DrawerProps as AntdDrawerProps,
  ButtonProps as AntdButtonProps,
} from "antd";
import { BaseOptionType } from "antd/es/select";
import { DefaultOptionType } from "antd/es/cascader";
import { ButtonSize } from "antd/es/button";

import { ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { NotificationTypes } from "src/enums/notificationTypes";
import { Placement } from "src/enums/placement.enum";
import { tooltipPosition } from "src/enums/tooltipPosition";
import { Trigger } from "src/enums/trigger.enum";
import { INPUT_TYPE } from "src/enums/inputType";
import { DrawerPlacement } from "src/enums/drawerPlacement.enum";
import { AttachmentTypes } from "src/enums/attachmentTypes.enum";

export interface PhoneNumberFieldProps extends InputProps {
  name: string;
  phoneCodeName?: string;
  label?: string;
  required?: boolean;
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

export interface ButtonProps
  extends Omit<AntdButtonProps, "type" | "htmlType"> {
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
  debounceTime?: number;
  filtersActive?: boolean;
}

export interface InputFieldProps extends InputProps {
  name: string;
  label?: string;
  type?: INPUT_TYPE;
  suffix?: ReactNode;
  required?: boolean;
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
  required?: boolean;
  showClear?: boolean;
  onClear?: () => void;
  showSelectedCount?: boolean;
}

export interface PasswordFieldProps extends InputProps {
  name: string;
  label?: string;
}

export interface PasswordState {
  showPassword: boolean;
  realValue: string;
  maskedValue: string;
}
export interface HandlePasswordChangeParams {
  e: ChangeEvent<HTMLInputElement>;
  passwordState: PasswordState;
  setPasswordState: React.Dispatch<React.SetStateAction<PasswordState>>;
  onChange: (value: string) => void;
}

export interface StatusTagProps {
  label: string;
  color?: string;
}

export interface ModalProps extends AntdModalProps {
  children?: React.ReactNode;
  closeModal?: () => void;
  handleOk?: () => void;
  visible: boolean;
  width?: number;
  title?: string;
  footer?: JSX.Element[];
  confirmLoading?: boolean;
  okText?: string;
  cancelText?: string;
  onCancel?: () => void;
  okButtonHtmlType?: HtmlButtonType;
  okButtonType?: ButtonTypes;
  renderHeader?: boolean;
  closeIcon?: ReactNode;
}

export interface ProfilePictureInputProps {
  name: string;
  label?: string;
  required?: boolean;
  isClubUpload?: boolean;
}

export interface AvatarWithFallbackProps {
  src?: string;
  name: string;
  size?: number;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface DrawerProps extends AntdDrawerProps {
  title: ReactNode;
  width?: number;
  onClose: () => void;
  open: boolean;
  closeIcon?: ReactNode;
  footer?: ReactNode;
  size?: AntdDrawerProps["size"];
  zIndex?: number;
  children: JSX.Element;
  placement?: DrawerPlacement;
  subHeading?: string;
  cancelText?: string;
  okText?: string;
  cancelButtonProps?: Omit<ButtonProps, "loading"> & { loading?: boolean };
  okButtonProps?: Omit<ButtonProps, "loading"> & { loading?: boolean };
  okButtonType?: ButtonTypes;
  okButtonHtmlType?: HtmlButtonType;
  confirmLoading?: boolean;
  handleOk?: () => void;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  isInitial?: boolean;
}

export interface FileUploadProps {
  name: string;
  maxFileSize?: number;
  maxTotalSize?: number;
  maxFileSizeText?: string;
  buttonText?: string;
  attachmentType?: AttachmentTypes;
  accept?: string;
  buttonClassName?: string;
  containerClassName?: string;
  maxFileSizeClassName?: string;
  attachmentClassName?: string;
  initialFiles?: UploadedFile[];
  deleteOnRemove?: boolean;
}

export interface StatusOption {
  id?: string;
  statusName?: string;
  color?: string;
}

export interface StatusDropdownProps<T = StatusOption> {
  value?: string;
  options: T[];
  onChange: (value: string) => void;
  loading?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}
export type QueryKeyType = readonly unknown[];

export interface UploadAreaProps {
  onFileUploaded?: (fileId: string, fileName: string) => void;
  attachmentType?: string;
  maxSizeMB?: number;
  mainText?: string;
  subText?: string;
}

export interface UploadAreaState {
  isUploading: boolean;
  uploadingFileName: string;
  isUploaded: boolean;
  isError?: boolean;
  errorText?: string;
  fileId: string;
}
export interface BulkImportButtonProps {
  onClick: () => void;
  tooltip: string;
  loading?: boolean;
}

export interface BulkMailButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface ClearSelectionButtonProps {
  onClick: () => void;
}

export interface AddUserButtonProps {
  onClick?: () => void;
  label: string;
}
