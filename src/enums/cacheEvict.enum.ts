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
}

export enum QueryKeys {
  GET_PROSPECTS = "getProspects",
  GET_SINGLE_PROSPECT = "getSingleProspect",
  GET_ATTACHMENT_PREVIEW = "getAttachmentPreview",
  GET_ACTIVITY_TYPES = "getActivityTypes",
  GET_MEMBERSHIP_CATEGORIES = "getMembershipCategories",
  GET_LEAD_SOURCES = "getLeadSources",
  GET_LEAD_STATUS = "getLeadStatuses",
}
