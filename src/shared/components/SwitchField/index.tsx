import React from "react";
import { Switch } from "antd";
import { useController, useFormContext, FieldValues } from "react-hook-form";

import { SwitchFieldProps } from "src/shared/types/sharedComponents.type";
import Error from "../Error";

const SwitchField = ({ name, ...props }: SwitchFieldProps) => {
  const { control } = useFormContext<FieldValues>();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div>
      <Switch {...props} checked={value} onChange={onChange} />
      {error && <Error message={error.message} />}
    </div>
  );
};

export default SwitchField;
