export enum MutationKeys {
  LOGIN = "login",
  FORGOT_PASSWORD = "forgotPassword",
  RESET_PASSWORD = "resetPassword",
  CHANGE_PASSWORD = "changePassword",
  LOGOUT = "logout",

  ATTACHMENT_UPLOAD = "attachmentUpload",
  ATTACHMENT_DELETE = "attachmentDelete",
  ADD_PROSPECT = "addProspect",
  EDIT_PROSPECT = "editProspect",
  DELETE_PROSPECT = "deleteProspect",
  CONVERT_TO_MEMBER = "convertToMember",
  ADD_ACTIVITY = "addActivity",

  ADD_MEMBER = "addMember",
  UPDATE_MEMBER_STATUS = "updateMemberStatus",
  DELETE_RESOURCE = "deleteResource",

  SEND_EMAIL = "sendEmail",
  VERIFY_EMAIL = "verifyEmail",

  ADD_LEAD_SOURCE_OR_STATUS = "addLeadOrStatus",
  EDIT_LEAD_SOURCE_OR_STATUS = "editLeadOrStatus",
  DELETE_LEAD = "deleteLead",
  MEMBERSHIP_OPERATIONS = "membershipOperation",
  DELETE_MEMBERS = "deleteMembers",
  DELETE_STAFF_DEPARTMENTS = "departmentStaffDepartment",
  DELETE_STAFF_MEMBER = "deleteStaffMemeber",
  ADD_STAFF_MEMBER = "addStaffMember",
  EDIT_STAFF_MEMBER = "editStaffMember",

  ADD_CLUB = "addClub",
  EDIT_CLUB = "editClub",
  UPDATE_CLUB_PROFILE = "updateClubProfile",
  UNLOCK_CLUB = "unlockClub",
  UPDATE_CLUB_GENERAL_SETTINGS = "updateClubGeneralSettings",

  EDIT_CHATBOT = "editChatbot",
  UPLOAD_CHATBOT_KNOWLEDGE_BASE = "uploadChatbotKnowledgeBase",
  CHATBOT = "chatbotResponse",
  CHATBOT_PROFILE = "chatbotProfileResponse",

  BULK_UPLOAD = "bulkUpload",
  CHECK_BULK_IMPORT_STATUS = "checkBulkImportStatus",

  LEAD_FORM = "leadForm",

  BOOK_MEETING = "bookMeeting",
  RESCHEDULE_MEETING_KEY = "rescheduleMeeting",

  CAN_CREATE_CUSTOM_CHART = "canCreateCustomChart",
  ADD_CUSTOM_CHART = "addCustomChart",
  REORDER_CHARTS = "reorderCharts",
}

export enum QueryKeys {
  GET_PROSPECTS = "getProspects",
  GET_SINGLE_PROSPECT = "getSingleProspect",
  GET_ATTACHMENT_PREVIEW = "getAttachmentPreview",
  GET_ACTIVITY_TYPES = "getActivityTypes",
  GET_MEMBERSHIP_CATEGORIES = "getMembershipCategories",
  GET_MEMBERSHIP_STATUSES = "getMembershipStatuses",
  GET_LEAD_SOURCES = "getLeadSources",
  GET_LEAD_STATUS = "getLeadStatuses",
  GET_EMAIL_TEMPLATES = "getEmailTemplates",

  GET_MEMBERSHIP_STATUS = "getMemberShipStatus",
  GET_MEMBERSHIP_TYPE_STATUS = "getMemberShipTypeStatus",
  GET_STAFF_MEMBER_DETAILS = "staffMemberDetails",
  GET_STAFF_DEPARTMENTS = "getStaffMembers",
  GET_MEMBER_DETAILS = "memberDetails",
  GET_PROSPECT_EMAIL_RECIPIENTS = "getProspectEmailRecipients",
  GET_MEMBER_EMAIL_RECIPIENTS = "getMemberEmailRecipients",
  GET_LEAD_SOURCES_LIST = "getLeadSourcesList",
  GET_LEAD_STATUS_LIST = "getLeadStatusesList",
  GET_STAFF_MEMBERS_LIST = "getStaffMembersList",
  GET_EMAIL_TEMPLATES_LIST = "getEmailTemplatesList",
  GET_EMAIL_TEMPLATE_DETAIL = "getEmailTemplateDetail",
  GET_MEMBERS = "getMembers",
  GET_STAFF_MEMBER_LIST = "getStaffMemberList",
  DOWNLOAD_TEMPLATE = "downloadTemplate",

  GET_CLUBS = "getClubs",
  GET_CLUB_PROFILE = "getClubProfile",

  GET_CALENDER_SLOTS_AND_EVENTS = "getCanderSlotsAndEvents",
  GET_MEMBERS_META_LIST = "getMembersMetaList",
  GET_PROSPECTS_META_LIST = "getProspectsMetaList",

  GET_LEAD_FORM_STATUS = "getLeadFormStatus",
  GET_TRANSCRIPTS = "getTranscripts",

  GET_DASHBOARD_CHARTS_KEY = "getDashboardCharts",
  GET_CHART_DETAIL_KEY = "getChartDetails",
}
