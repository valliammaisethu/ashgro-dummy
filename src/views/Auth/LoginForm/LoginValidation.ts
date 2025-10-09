import * as Yup from "yup";
import { validationMessages } from "./constants";

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(validationMessages.email)
    .required(validationMessages.requiredEmail),
  password: Yup.string().required(validationMessages.password),
});
