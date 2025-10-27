import React from "react";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import clsx from "clsx";

import { NumberIncrementerProps } from "../../types/sharedComponents.type";

import styles from "./numberIncrementer.module.scss";
import { ButtonHtmlTypes } from "src/enums/buttonTypes.enum";
import Add from "node_modules/obra-icons-react/dist/icons/Add";
import Subtract from "node_modules/obra-icons-react/dist/icons/Subtract";

const NumberIncrementer = (props: NumberIncrementerProps) => {
  // TODO: change max steps after confirming with BA
  const { name, min = 0, max = Infinity, step = 1, disabled = false } = props;

  const { control } = useFormContext<FieldValues>();
  const {
    field: { value = 0, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleDecrement = () => {
    if (!disabled && value > min) {
      onChange(Number(value) - step);
    }
  };

  const handleIncrement = () => {
    if (!disabled && value < max) {
      onChange(Number(value) + step);
    }
  };

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.disabled]: disabled,
      })}
    >
      <button
        type={ButtonHtmlTypes.BUTTON}
        className={styles.decrementer}
        onClick={handleDecrement}
        disabled={disabled || value <= min}
      >
        <Subtract />
      </button>

      <div className={styles.value}>{value}</div>

      <button
        type={ButtonHtmlTypes.BUTTON}
        className={styles.incrementer}
        onClick={handleIncrement}
        disabled={disabled || value >= max}
      >
        <Add />
      </button>

      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};

export default NumberIncrementer;
