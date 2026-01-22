import * as Yup from "yup";

import { validationMessages } from "../LoginForm/constants";

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(validationMessages.email)
    .required(validationMessages.requiredEmail),
});
