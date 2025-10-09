import React, { FC } from "react";
import { Button as AntButton } from "antd";
import clsx from "clsx";

import {
  ButtonSizes,
  ButtonTypes,
  HtmlButtonType,
} from "src/enums/buttons.enum";
import { mapToAntdType } from "src/shared/utils/mapButtonType";
import { ButtonProps } from "src/shared/types/sharedComponents.type";

import styles from "./button.module.scss";

const Button: FC<ButtonProps> = ({
  children,
  className,
  moduleClassName,
  type = ButtonTypes.PRIMARY,
  size = ButtonSizes.MEDIUM,
  htmlType = HtmlButtonType.BUTTON,
  ...restProps
}) => {
  const antType = mapToAntdType(type);

  const buttonClassName = clsx(
    styles.button,
    styles[type],
    styles[size],
    moduleClassName && styles[moduleClassName],
    className,
  );

  return (
    <AntButton
      {...restProps}
      htmlType={htmlType}
      type={antType}
      className={buttonClassName}
    >
      {children}
    </AntButton>
  );
};

export default Button;
