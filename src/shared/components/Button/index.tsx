import React, { FC } from "react";
import { Button as AntButton, Tooltip } from "antd";
import clsx from "clsx";

import {
  ButtonSizes,
  ButtonTypes,
  HtmlButtonType,
} from "src/enums/buttons.enum";
import { mapToAntdType } from "src/shared/utils/mapButtonType";
import { ButtonProps } from "src/shared/types/sharedComponents.type";

import styles from "./button.module.scss";
import { tooltipPosition } from "src/enums/tooltipPosition";
import { Colors } from "src/enums/colors.enum";

const Button: FC<ButtonProps> = ({
  children,
  className,
  type = ButtonTypes.DEFAULT,
  size = ButtonSizes.MEDIUM,
  htmlType = HtmlButtonType.BUTTON,
  tooltip,
  ...restProps
}) => {
  const antType = mapToAntdType(type);

  const buttonClassName = clsx(
    styles.button,
    styles[type],
    styles[size],
    className,
  );

  const buttonElement = (
    <AntButton
      {...restProps}
      htmlType={htmlType}
      type={antType}
      className={buttonClassName}
    >
      {children}
    </AntButton>
  );

  if (!tooltip) {
    return buttonElement;
  }

  const tooltipProps =
    typeof tooltip === "string" ? { title: tooltip } : tooltip;

  return (
    <Tooltip
      {...tooltipProps}
      color={Colors.ASHGRO_BLACK}
      placement={tooltipPosition.BOTTOM}
    >
      {buttonElement}
    </Tooltip>
  );
};

export default Button;
