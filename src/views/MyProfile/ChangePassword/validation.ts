import * as Yup from "yup";

import {
  confirmPasswordValidation,
  currentPasswordValidation,
  matchingPasswordValidation,
  newPasswordValidation,
} from "./constants";

export const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required(currentPasswordValidation),
  newPassword: Yup.string().max(25, newPasswordValidation),
  confirmPassword: Yup.string()
    .required(confirmPasswordValidation)
    .oneOf([Yup.ref("newPassword")], matchingPasswordValidation),
});
