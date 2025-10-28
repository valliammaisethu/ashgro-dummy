export const ADD_PROSPECT_CONSTANTS = {
  MODAL_TITLE: "New Prospect",
  EDIT_TITLE: "Edit Prospect",
  MODAL_WIDTH: 664,

  SECTION_TITLES: {
    LEAD_DETAILS: "Lead Details",
    FEES_AND_DUES: "Fees & Dues",
    ACTIVITY_DETAILS: "Activity Details",
  },

  LABELS: {
    PROFILE_PICTURE: "Profile Picture",
    FIRST_NAME: "First Name",
    LAST_NAME: "Last Name",
    LEAD_STATUS: "Lead Status",
    FOLLOW_UP_DATE: "Follow-up Date",
    EMAIL_ADDRESS: "Email Address",
    PHONE_NUMBER: "Phone Number",
    INQUIRY_DATE: "Inquiry Date",
    LEAD_SOURCE: "Lead Source",
    MEMBERSHIP_CATEGORY: "Membership Category",
    MONTHLY_DUES: "Monthly Dues",
    INITIATION_FEE: "Initiation Fee",
    ACTIVITY_DATE_TIME: "Activity Date & Time",
    ACTIVITY_TYPE: "Activity Type",
    ACTIVITY_DESCRIPTION: "Activity Description",
  },

  PLACEHOLDERS: {
    FIRST_NAME: "Enter first name",
    LAST_NAME: "Enter last name",
    LEAD_STATUS: "Select lead status",
    FOLLOW_UP_DATE: "Select follow-up date",
    EMAIL_ADDRESS: "Enter email address",
    PHONE_NUMBER: "Phone number",
    INQUIRY_DATE: "Select Date",
    LEAD_SOURCE: "Select lead source",
    MEMBERSHIP_CATEGORY: "Select membership category",
    MONTHLY_DUES: "Enter monthly dues",
    INITIATION_FEE: "Enter initiation fee",
    ACTIVITY_DATE_TIME: "Enter activity date & time",
    ACTIVITY_TYPE: "Select activity type",
    ACTIVITY_DESCRIPTION: "Add activity description",
  },

  FIELD_NAMES: {
    PROFILE_PICTURE: "prospect.attachmentId",
    FIRST_NAME: "prospect.firstName",
    LAST_NAME: "prospect.lastName",
    LEAD_STATUS: "prospect.leadStatusId",
    FOLLOW_UP_DATE: "prospect.followUpDate",
    EMAIL_ADDRESS: "prospect.email",
    PHONE_NUMBER: "prospect.contactNumber",
    PHONE_CODE: "phoneCode",
    INQUIRY_DATE: "prospect.inquiryDate",
    LEAD_SOURCE: "prospect.leadSourceId",
    MEMBERSHIP_CATEGORY: "prospect.membershipCategoryId",
    MONTHLY_DUES: "prospect.monthlyDues",
    INITIATION_FEE: "prospect.initiationFee",
    ACTIVITY_DATE_TIME: "activityDetails.createdAt",
    ACTIVITY_TYPE: "activityDetails.activityTypeId",
    ACTIVITY_DESCRIPTION: "activityDetails.description",
  } as const,
};

export const validationMessages = {
  firstName: "First name is a required field!",
  lastName: "Last name is a required field!",
  leadStatus: "Lead status is required!",
  followUpDate: "Follow-up date is required!",
  emailAddress: "Email address is required!",
  phone: "Phone number must be 10 digits!",
  inquiryDate: "Inquiry date is required!",
  leadSource: "Lead source is required!",
  membershipCategory: "Membership category is required!",
  monthlyDues: "Monthly dues should have atmost of 2 decimal digits!",
  initiationFee: "Initiation Fees should have atmost of 2 decimal digits!",
  activityDateTime: "Activity date & time is required!",
  activityType: "Activity type is required!",
  activityDescription: "Activity description is required!",
  negativeNumber: "Value cannot be negative",
};

export const activityFields = [
  ADD_PROSPECT_CONSTANTS.FIELD_NAMES.ACTIVITY_DATE_TIME,
  ADD_PROSPECT_CONSTANTS.FIELD_NAMES.ACTIVITY_TYPE,
  ADD_PROSPECT_CONSTANTS.FIELD_NAMES.ACTIVITY_DESCRIPTION,
];

export const submitButtonKey = "submitButton";
