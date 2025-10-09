import React from "react";
import { useController, useFormContext, FieldValues } from "react-hook-form";

import RadioButton from "../Radio";
import { RadioExtendedProps } from "src/shared/types/sharedComponents.type";
import ErrorMessage from "../Error";

const RadioField = ({ name, ...props }: RadioExtendedProps) => {
  const { control } = useFormContext<FieldValues>();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name: name ?? "", control });

  return (
    <div>
      <RadioButton {...props} value={value} onChange={onChange} />
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
};

export default RadioField;
