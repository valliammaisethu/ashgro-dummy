import React, { FC, useState, useRef, useEffect } from "react";
import { Input, InputRef } from "antd";
import { useFormContext, useController, FieldValues } from "react-hook-form";
import clsx from "clsx";

import { InputStatus } from "src/enums/inputStatus.enum";
import { INPUT_TYPE } from "src/enums/inputType";
import { AutoComplete } from "src/enums/autoComplete.enum";
import {
  PasswordFieldProps,
  PasswordState,
} from "src/shared/types/sharedComponents.type";
import { passwordSuffix } from "./atoms";
import Error from "../Error";
import Label from "../Label";

import styles from "src/shared/components/InputField/inputField.module.scss";
import { handlePasswordChange } from "./utils";

const PasswordField: FC<PasswordFieldProps> = ({ name, label, ...rest }) => {
  const { control } = useFormContext<FieldValues>();
  const {
    field: { onChange, onBlur },
    fieldState,
  } = useController({ name, control });

  const [passwordState, setPasswordState] = useState<PasswordState>({
    showPassword: false,
    realValue: "",
    maskedValue: "",
  });

  const inputRef = useRef<InputRef>(null);
  const cursorPosRef = useRef<number | null>(null);

  const restoreCursorPosition = () => {
    if (!inputRef.current || cursorPosRef.current === null) return;

    const input = inputRef.current.input;
    if (input)
      input.setSelectionRange(cursorPosRef.current, cursorPosRef.current);
    cursorPosRef.current = null;
  };

  const togglePasswordVisibility = () =>
    setPasswordState((prev) => ({ ...prev, showPassword: !prev.showPassword }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    cursorPosRef.current = e.target.selectionStart;
    handlePasswordChange({
      e,
      passwordState,
      setPasswordState,
      onChange,
    });
  };

  useEffect(() => {
    restoreCursorPosition();
  }, [passwordState.maskedValue, passwordState.realValue]);

  return (
    <div className={clsx(styles.inputWrapper, styles.passwordInput)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        ref={inputRef}
        id={name}
        value={
          passwordState.showPassword
            ? passwordState.realValue
            : passwordState.maskedValue
        }
        onChange={handleChange}
        onBlur={onBlur}
        {...rest}
        type={INPUT_TYPE.TEXT}
        status={fieldState.error ? InputStatus.ERROR : undefined}
        suffix={passwordSuffix(
          passwordState.showPassword,
          togglePasswordVisibility,
        )}
        autoComplete={AutoComplete.OFF}
        autoCorrect={AutoComplete.OFF}
        spellCheck={false}
      />

      {fieldState.error && <Error message={fieldState.error.message} />}
    </div>
  );
};

export default PasswordField;
