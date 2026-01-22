import * as Yup from "yup";
import {
  confirmPasswordValidation,
  matchingPasswordValidation,
  newPasswordValidation,
} from "./constants";

export const validationSchema = Yup.object().shape({
  newPassword: Yup.string().max(25, newPasswordValidation),
  confirmPassword: Yup.string()
    .required(confirmPasswordValidation)
    .oneOf([Yup.ref("newPassword")], matchingPasswordValidation),
});
