import { REGEX } from "src/constants/regex";
import * as Yup from "yup";

export const editProfileValidation = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .matches(REGEX.LETTERS_WITH_SPACES, "Only letters are allowed")
    .max(50),

  lastName: Yup.string()
    .required("Last name is required")
    .matches(REGEX.LETTERS_WITH_SPACES, "Only letters are allowed")
    .max(50),

  email: Yup.string().nullable().email(),
  phoneNumber: Yup.string()
    .nullable()
    .matches(REGEX.DIGITS, "Invalid phone number"),
  countryCode: Yup.string().nullable(),
  profilePicture: Yup.string().nullable(),
  address: Yup.string().nullable(),
  contactNumber: Yup.string().nullable(),
  attachmentId: Yup.string().nullable(),
  emailId: Yup.string().nullable(),
  id: Yup.string().nullable(),
});
