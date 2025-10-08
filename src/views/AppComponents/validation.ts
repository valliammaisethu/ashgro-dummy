import * as Yup from "yup";

export const appComponentsValidation = Yup.object().shape({
  input: Yup.string().required(),
  checkbox: Yup.boolean().required().isTrue(),
  radioButton: Yup.string().required(),
});
