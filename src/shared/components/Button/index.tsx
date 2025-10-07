import { Button as AntButton } from "antd";
import { ButtonType } from "antd/lib/button";
import React, { FC, MouseEvent, ReactNode } from "react";
import { styledClassnames } from "../../utils/styledClassnames";
import styles from "./button.module.scss";

interface ButtonProps {
  clickHandler?: (event: MouseEvent) => void;
  children: ReactNode;
  htmlType?: "reset" | "submit" | "button";
  type?: ButtonType;
  className?: string;
  moduleClassName?: string;
  icon?: any;
  disabled?: boolean;
  size?: "small" | "medium";
  loading?: boolean;
  name?: string;
  target?: string;
  href?: string;
}

const Button: FC<ButtonProps> = (props) => {
  const {
    clickHandler,
    children,
    htmlType = "button",
    className,
    moduleClassName,
    icon,
    disabled,
    size,
    loading,
    name,
    target,
    href,
    type,
  } = props;

  const globalClassnames = className && [className].join(" ");
  const moduleClassnames =
    moduleClassName && styledClassnames(moduleClassName, styles);

  return (
    <div className={`button ${moduleClassnames} ${globalClassnames}`}>
      <AntButton
        loading={!!loading}
        disabled={disabled}
        icon={icon}
        className={`${type} ${size}`}
        htmlType={htmlType}
        onClick={clickHandler}
        name={name}
        target={target}
        href={href}
        type={type}
      >
        {children}
      </AntButton>
    </div>
  );
};

export default Button;
