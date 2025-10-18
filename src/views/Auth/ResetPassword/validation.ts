import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  newPassword: Yup.string(),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
