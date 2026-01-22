import * as yup from "yup";

import { FORM_CONSTANTS } from "../constants";

const { FIELD_NAMES } = FORM_CONSTANTS;

const VALIDATION_REGEX = {
  ALPHABETS_ONLY: /^[A-Za-z\s]+$/,
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_NUMBER: /^(\(\d{3}\)\s?\d{3}-?\d{4}|\d{10})?$/,
};

const MAX_LENGTHS = {
  NAME: 50,
  EMAIL: 100,
  RESIDENTIAL_ADDRESS: 250,
};

const ERROR_MESSAGES = {
  REQUIRED: {
    FIRST_NAME: "First name is required",
    LAST_NAME: "Last name is required",
    EMAIL: "Email address is required",
  },
  INVALID: {
    ALPHABETS_ONLY: "must contain only alphabets",
    EMAIL_FORMAT: "Invalid email format",
    EMAIL_CHARACTERS:
      "Email can only contain alphanumeric characters and (., -, _, @)",
    PHONE_NUMBER: "Invalid phone number format",
  },
  MAX_LENGTH: {
    NAME: (field: string) =>
      `${field} must not exceed ${MAX_LENGTHS.NAME} characters`,
    EMAIL: `Email address must not exceed ${MAX_LENGTHS.EMAIL} characters`,
  },
};

export const validationSchema = yup.object().shape({
  [FIELD_NAMES.FIRST_NAME]: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED.FIRST_NAME)
    .matches(
      VALIDATION_REGEX.ALPHABETS_ONLY,
      `First name ${ERROR_MESSAGES.INVALID.ALPHABETS_ONLY}`,
    )
    .max(MAX_LENGTHS.NAME, ERROR_MESSAGES.MAX_LENGTH.NAME("First name"))
    .trim(),

  [FIELD_NAMES.LAST_NAME]: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED.LAST_NAME)
    .matches(
      VALIDATION_REGEX.ALPHABETS_ONLY,
      `Last name ${ERROR_MESSAGES.INVALID.ALPHABETS_ONLY}`,
    )
    .max(MAX_LENGTHS.NAME, ERROR_MESSAGES.MAX_LENGTH.NAME("Last name"))
    .trim(),

  [FIELD_NAMES.EMAIL_ADDRESS]: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED.EMAIL)
    .email(ERROR_MESSAGES.INVALID.EMAIL_FORMAT)
    .matches(VALIDATION_REGEX.EMAIL, ERROR_MESSAGES.INVALID.EMAIL_CHARACTERS)
    .max(MAX_LENGTHS.EMAIL, ERROR_MESSAGES.MAX_LENGTH.EMAIL)
    .trim(),

  [FIELD_NAMES.PHONE_NUMBER]: yup
    .string()
    .optional()
    .matches(
      VALIDATION_REGEX.PHONE_NUMBER,
      ERROR_MESSAGES.INVALID.PHONE_NUMBER,
    ),
});
