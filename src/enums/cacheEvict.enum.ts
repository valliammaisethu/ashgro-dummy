export enum MutationKeys {
  LOGIN = "login",
  FORGOT_PASSWORD = "forgotPassword",
  RESET_PASSWORD = "resetPassword",
  LOGOUT = "logout",
  ATTACHMENT_UPLOAD = "attachmentUpload",
  ATTACHMENT_DELETE = "attachmentDelete",
  ADD_PROSPECT = "addProspect",
  EDIT_PROSPECT = "editProspect",
  DELETE_PROSPECT = "deleteProspect",
  CONVERT_TO_MEMBER = "convertToMember",
  ADD_ACTIVITY = "addActivity",

  DELETE_STAFF_MEMBER = "deleteStaffMemeber",
}

export enum QueryKeys {
  GET_PROSPECTS = "getProspects",
  GET_SINGLE_PROSPECT = "getSingleProspect",
  GET_ATTACHMENT_PREVIEW = "getAttachmentPreview",
  GET_ACTIVITY_TYPES = "getActivityTypes",
  GET_MEMBERSHIP_CATEGORIES = "getMembershipCategories",
  GET_LEAD_SOURCES = "getLeadSources",
  GET_LEAD_STATUS = "getLeadStatuses",
  GET_EMAIL_TEMPLATES = "getEmailTemplates",
  GET_STAFF_MEMBER_DETAILS = "staffMemberDetails",
  GET_STAFF_DEPARTMENTS = "getStaffMembers",
}
