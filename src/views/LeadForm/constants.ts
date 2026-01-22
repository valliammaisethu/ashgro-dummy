export const LEAD_FORM_CONSTANTS = {
  TITLE: "Lead Form",
  SUBMIT_BTN_TEXT: "Submit",
  LINK_NOT_WORKING: "Link Not Working",
  FORM_DISABLED_MESSAGE: "This lead form is currently not available.",
  INVALID_LINK: "This link is invalid.",
  ACCESS_DENIED: "Access Denied",
  OOPS: "Oops!",

  LABELS: {
    FIRST_NAME: "First Name",
    LAST_NAME: "Last Name",
    EMAIL_ADDRESS: "Email Address",
    PHONE_NUMBER: "Phone Number",
    MEMBERSHIP_INTEREST: "Membership Interest",
    ADDITIONAL_COMMENTS: "Additional Comments",
  },

  PLACEHOLDERS: {
    FIRST_NAME: "Enter first name",
    LAST_NAME: "Enter last name",
    EMAIL_ADDRESS: "Enter email address",
    PHONE_NUMBER: "Phone number",
    MEMBERSHIP_INTEREST: "Select membership category",
    ADDITIONAL_COMMENTS: "Add notes description",
  },

  FIELD_NAMES: {
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    EMAIL_ADDRESS: "emailId",
    PHONE_NUMBER: "phoneNumber",
    PHONE_CODE: "phoneCode",
    MEMBERSHIP_INTEREST: "memberInterestId",
    ADDITIONAL_COMMENTS: "additionalComments",
  } as const,
};
