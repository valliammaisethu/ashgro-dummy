import {
  ERROR_MESSAGES,
  MAX_LENGTHS,
  VALIDATION_REGEX,
} from "src/views/Clubs/constants";
import * as yup from "yup";

export const clubFormValidationSchema = yup.object().shape({
  clubName: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED.CLUB_NAME)
    .max(MAX_LENGTHS.CLUB_NAME, ERROR_MESSAGES.MAX_LENGTH.CLUB_NAME)
    .trim(),

  clubEmail: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED.CLUB_EMAIL)
    .email(ERROR_MESSAGES.INVALID.EMAIL_FORMAT)
    .matches(VALIDATION_REGEX.EMAIL, ERROR_MESSAGES.INVALID.EMAIL_CHARACTERS)
    .max(MAX_LENGTHS.EMAIL, ERROR_MESSAGES.MAX_LENGTH.EMAIL)
    .trim(),

  clubPhoneNumber: yup
    .string()
    .optional()
    .matches(
      VALIDATION_REGEX.PHONE_NUMBER,
      ERROR_MESSAGES.INVALID.PHONE_NUMBER,
    ),

  clubAddress: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED.CLUB_ADDRESS)
    .max(MAX_LENGTHS.ADDRESS, ERROR_MESSAGES.MAX_LENGTH.ADDRESS)
    .trim(),

  firstName: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED.FIRST_NAME)
    .matches(
      VALIDATION_REGEX.ALPHABETS_ONLY,
      `First name ${ERROR_MESSAGES.INVALID.ALPHABETS_ONLY}`,
    )
    .max(MAX_LENGTHS.NAME, ERROR_MESSAGES.MAX_LENGTH.NAME("First name"))
    .trim(),

  lastName: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED.LAST_NAME)
    .matches(
      VALIDATION_REGEX.ALPHABETS_ONLY,
      `Last name ${ERROR_MESSAGES.INVALID.ALPHABETS_ONLY}`,
    )
    .max(MAX_LENGTHS.NAME, ERROR_MESSAGES.MAX_LENGTH.NAME("Last name"))
    .trim(),

  email: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED.PRIMARY_EMAIL)
    .email(ERROR_MESSAGES.INVALID.EMAIL_FORMAT)
    .matches(VALIDATION_REGEX.EMAIL, ERROR_MESSAGES.INVALID.EMAIL_CHARACTERS)
    .max(MAX_LENGTHS.EMAIL, ERROR_MESSAGES.MAX_LENGTH.EMAIL)
    .trim(),

  phoneNumber: yup
    .string()
    .optional()
    .matches(
      VALIDATION_REGEX.PHONE_NUMBER,
      ERROR_MESSAGES.INVALID.PHONE_NUMBER,
    ),

  onboardingDate: yup.string().nullable(),

  profilePicture: yup.string().nullable(),

  chatbotSwitch: yup.boolean().nullable(),

  clubCountryCode: yup.string().nullable(),

  countryCode: yup.string().nullable(),

  description: yup
    .string()
    .max(MAX_LENGTHS.NOTES, ERROR_MESSAGES.MAX_LENGTH.NOTES)
    .nullable(),
});
