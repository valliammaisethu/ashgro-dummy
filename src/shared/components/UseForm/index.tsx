import {
  useForm as useRHKForm,
  UseFormProps,
  FieldValues,
  UseFormReturn,
  Resolver,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormModes } from "src/enums/formModes.enum";

export interface useFormProps<T extends FieldValues> extends UseFormProps<T> {
  validationSchema?: Yup.ObjectSchema<T>;
}

const useForm = <T extends FieldValues>({
  validationSchema,
  ...rest
}: useFormProps<T>): UseFormReturn<T> => {
  return useRHKForm<T>({
    mode: FormModes.ON_CHANGE,
    resolver: validationSchema
      ? (yupResolver<T, object, T>(validationSchema) as Resolver<T>)
      : undefined,
    ...rest,
  });
};

export default useForm;
