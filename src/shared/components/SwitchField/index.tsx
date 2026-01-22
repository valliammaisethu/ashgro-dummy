import React, { Fragment } from "react";
import { Switch } from "antd";
import { useController, useFormContext, FieldValues } from "react-hook-form";

import { SwitchFieldProps } from "src/shared/types/sharedComponents.type";
import Error from "../Error";

const SwitchField = ({ name, ...props }: SwitchFieldProps) => {
  const { control, setValue } = useFormContext<FieldValues>();
  const {
    field: { value },
    fieldState: { error },
  } = useController({ name, control });

  const handleOnChange = (checked: boolean) => {
    setValue(name, checked, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <Fragment>
      <Switch {...props} checked={value} onChange={handleOnChange} />
      {error && <Error message={error.message} />}
    </Fragment>
  );
};

export default SwitchField;
