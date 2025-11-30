import React from "react";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import clsx from "clsx";
import { IconAdd, IconSubtract } from "obra-icons-react";

import { NumberIncrementerProps } from "../../types/sharedComponents.type";
import Button from "../Button";

import styles from "./numberIncrementer.module.scss";

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
      <Button
        className={styles.decrementer}
        onClick={handleDecrement}
        disabled={disabled || value <= min}
      >
        <IconSubtract />
      </Button>

      <div className={styles.value}>{value}</div>

      <Button
        className={styles.incrementer}
        onClick={handleIncrement}
        disabled={disabled || value >= max}
      >
        <IconAdd />
      </Button>

      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};

export default NumberIncrementer;
