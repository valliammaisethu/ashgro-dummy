import React, { ReactNode } from "react";
import {
  FieldValues,
  UseFormReturn,
  UseFormProps,
  FormProvider,
} from "react-hook-form";
import * as Yup from "yup";

import useForm from "src/shared/components/UseForm";

export interface FormProps<T extends FieldValues> extends UseFormProps<T> {
  children:
    | ReactNode
    | ((methods: UseFormReturn<T>) => ReactNode | React.JSX.Element);
  onSubmit?: (data: T, methods: UseFormReturn<T>) => void;
  validationSchema?: Yup.ObjectSchema<T>;
  methods?: UseFormReturn<T>;
}

function Form<T extends FieldValues>({
  onSubmit,
  children,
  methods,
  ...rest
}: FormProps<T>) {
  const hookMethods = useForm(rest);

  const formMethods = methods || hookMethods;

  const handleSubmit = (data: T) => onSubmit?.(data, formMethods);

  const content =
    typeof children === "function" ? children(formMethods) : children;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(handleSubmit)}>{content}</form>
    </FormProvider>
  );
}

export default Form;
