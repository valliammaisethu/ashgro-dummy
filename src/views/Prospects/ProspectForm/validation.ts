import * as yup from "yup";
import { ADD_PROSPECT_CONSTANTS, validationMessages } from "./constants";
import { REGEX } from "src/constants/regex";

const { LABELS } = ADD_PROSPECT_CONSTANTS;
const {
  firstName,
  lastName,
  monthlyDues,
  initiationFee,
  validEmail,
  phone,
  negativeNumber,
  activityType,
  activityDescription,
  firstNameLetters,
  lastNameLetters,
} = validationMessages;

const prospectSchema = yup.object({
  firstName: yup
    .string()
    .label(LABELS.FIRST_NAME)
    .required(firstName)
    .max(50)
    .matches(REGEX.LETTERS, firstNameLetters),
  lastName: yup
    .string()
    .label(LABELS.LAST_NAME)
    .required(lastName)
    .max(50)
    .matches(REGEX.LETTERS, lastNameLetters),
  email: yup
    .string()
    .label(LABELS.EMAIL_ADDRESS)
    .email(validEmail)
    .required()
    .max(100),
  contactNumber: yup
    .string()
    .matches(/^(\(\d{3}\)\s?\d{3}-?\d{4}|\d{10})?$/, phone),
  phoneCode: yup.string(),
  monthlyDues: yup
    .string()
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .test("non-negative", negativeNumber, (value) => {
      if (!value) return true;
      return parseFloat(value) >= 0;
    })
    .matches(REGEX.TWO_DECIMALS, {
      message: monthlyDues,
      excludeEmptyString: true,
    }),

  initiationFee: yup
    .string()
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .test("non-negative", negativeNumber, (value) => {
      if (!value) return true;
      return parseFloat(value) >= 0;
    })
    .matches(REGEX.TWO_DECIMALS, {
      message: initiationFee,
      excludeEmptyString: true,
    }),

  leadStatusId: yup.string(),
  followUpDate: yup.string(),
  inquiryDate: yup.string(),
  leadSourceId: yup.string(),
  membershipCategoryId: yup.string(),
  attachmentId: yup.string().nullable(),
  additionalComments: yup.string().max(300),
});

const activityDetailsSchema = yup
  .object({
    createdAt: yup.string(),
    activityTypeId: yup.string(),
    description: yup.string().max(300),
  })
  .test("activity-required-if-other-filled", function (value) {
    const { path, createError } = this;
    const { activityTypeId, description } = value || {};

    if (activityTypeId && !description) {
      return createError({
        path: `${path}.description`,
        message: activityDescription,
      });
    }

    if (!activityTypeId && description) {
      return createError({
        path: `${path}.activityTypeId`,
        message: activityType,
      });
    }

    return true;
  });

export const getValidationSchema = (isEdit: boolean) =>
  yup.object({
    prospect: prospectSchema,
    activityDetails: isEdit ? yup.mixed().optional() : activityDetailsSchema,
  });

export const validationSchema = getValidationSchema(false);
