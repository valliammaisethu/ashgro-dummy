import * as Yup from "yup";

import {
  confirmPasswordValidation,
  currentPasswordValidation,
  matchingPasswordValidation,
  newPasswordValidation,
  samePasswordValidation,
} from "./constants";

export const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required(currentPasswordValidation),
  newPassword: Yup.string()
    .max(25, newPasswordValidation)
    .notOneOf([Yup.ref("currentPassword")], samePasswordValidation),
  confirmPassword: Yup.string()
    .required(confirmPasswordValidation)
    .oneOf([Yup.ref("newPassword")], matchingPasswordValidation),
});
