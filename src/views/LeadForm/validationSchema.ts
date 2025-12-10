import * as yup from "yup";

const VALIDATION_REGEX = {
  ALPHABETS_ONLY: /^[A-Za-z\s]+$/,
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_NUMBER: /^(\(\d{3}\)\s?\d{3}-?\d{4}|\d{10})?$/,
};

const MAX_LENGTHS = {
  NAME: 50,
  EMAIL: 100,
  PHONE: 15,
  COMMENTS: 500,
};

const ERROR_MESSAGES = {
  REQUIRED: {
    FIRST_NAME: "First name is required",
    LAST_NAME: "Last name is required",
    EMAIL: "Email address is required",
    PHONE: "Phone number is required",
    MEMBERSHIP_INTEREST: "Membership interest is required",
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
    PHONE: `Phone number must not exceed ${MAX_LENGTHS.PHONE} characters`,
    COMMENTS: `Additional comments must not exceed ${MAX_LENGTHS.COMMENTS} characters`,
  },
};

export const leadFormValidationSchema = yup.object().shape({
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
    .required(ERROR_MESSAGES.REQUIRED.EMAIL)
    .email(ERROR_MESSAGES.INVALID.EMAIL_FORMAT)
    .matches(VALIDATION_REGEX.EMAIL, ERROR_MESSAGES.INVALID.EMAIL_CHARACTERS)
    .max(MAX_LENGTHS.EMAIL, ERROR_MESSAGES.MAX_LENGTH.EMAIL)
    .trim(),

  phoneNumber: yup
    .string()
    .matches(VALIDATION_REGEX.PHONE_NUMBER, ERROR_MESSAGES.INVALID.PHONE_NUMBER)
    .max(MAX_LENGTHS.PHONE, ERROR_MESSAGES.MAX_LENGTH.PHONE),

  categoryName: yup.string(),

  additionalComments: yup
    .string()
    .max(MAX_LENGTHS.COMMENTS, ERROR_MESSAGES.MAX_LENGTH.COMMENTS)
    .nullable(),
});
