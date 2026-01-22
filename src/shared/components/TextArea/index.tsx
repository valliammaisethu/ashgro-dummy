import React, { forwardRef } from "react";
import { useFormContext, useController } from "react-hook-form";
import clsx from "clsx";

import Label from "../Label";
import Error from "../Error";

import styles from "./textArea.module.scss";

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  rootClassName?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    { name, label, required = false, className, rootClassName, ...rest },
    ref,
  ) => {
    const { control } = useFormContext();
    const {
      field: { value, onChange, onBlur },
      fieldState,
    } = useController({ name, control });

    const hasError = !!fieldState.error;

    return (
      <div
        className={clsx(
          styles.textAreaWrapper,
          className,
          hasError && styles.errorWrapper,
        )}
      >
        <Label htmlFor={name} required={required}>
          {label}
        </Label>

        <textarea
          id={name}
          ref={ref}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          className={clsx(rootClassName, styles.textArea, {
            [styles.error]: hasError,
          })}
          {...rest}
        />

        <Error message={fieldState?.error?.message} />
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
