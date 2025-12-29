import { REGEX } from "src/constants/regex";
import * as Yup from "yup";

const MAX_LENGTH = 50;

const validationMsgs = {
  FIRST_NAME: "First name is required",
  LAST_NAME: "Last name is required",
  PHONE_NUMBER: "Invalid phone number",
  FIRST_NAME_MAX_LENGTH: "First name cannot exceed 50 characters",
  LAST_NAME_MAX_LENGTH: "Last name cannot exceed 50 characters",
  ONLY_LETTERS_ALLOWED: "Only letters are allowed",
};

const {
  FIRST_NAME,
  LAST_NAME,
  PHONE_NUMBER,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  ONLY_LETTERS_ALLOWED,
} = validationMsgs;

export const editProfileValidation = Yup.object({
  firstName: Yup.string()
    .required(FIRST_NAME)
    .matches(REGEX.LETTERS_WITH_SPACES, ONLY_LETTERS_ALLOWED)
    .max(MAX_LENGTH, FIRST_NAME_MAX_LENGTH),

  lastName: Yup.string()
    .required(LAST_NAME)
    .matches(REGEX.LETTERS_WITH_SPACES, ONLY_LETTERS_ALLOWED)
    .max(MAX_LENGTH, LAST_NAME_MAX_LENGTH),

  email: Yup.string().nullable().email(),
  phoneNumber: Yup.string().nullable().matches(REGEX.DIGITS, PHONE_NUMBER),
  countryCode: Yup.string().nullable(),
  profilePicture: Yup.string().nullable(),
  address: Yup.string().nullable(),
  contactNumber: Yup.string()
    .nullable()
    .matches(REGEX.PHONE_NUMBER, PHONE_NUMBER),
  attachmentId: Yup.string().nullable(),
  emailId: Yup.string().nullable(),
  id: Yup.string().nullable(),
});
