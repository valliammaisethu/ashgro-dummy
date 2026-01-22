export const ApiRoutes = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,

  USER_LOGIN: "/auth/login",
  USER_LOGOUT: "/auth/logout",

  REFRESH: "/auth/refresh",

  FORGOT_PASSWORD: "/auth/forgotPassword",
  RESET_PASSWORD: "/auth/resetPassword",
  CHANGE_PASSWORD: "auth/:id/password",
  VALIDATE_PASSWORD: "auth/:id/password/validate",

  ATTACHMENTS: "/attachments",
  ATTACHMENTS_SPECIFIC: "/attachments/:id",

  PROSPECTS: "/prospects",
  GET_PROSPECT: "/prospects/:id",
  CONVERT_TO_MEMBER: "/prospects/:id/convertToMember",

  GET_ACTIVITY_TYPES: "/clubs/:id/activityTypes",
  GET_MEMBERSHIP_CATEGORIES: "/clubs/:id/membershipCategories",
  GET_MEMBERSHIP_STATUSES: "/clubs/:id/membershipStatuses",
  GET_LEAD_SOURCES: "/clubs/:id/leadSources",
  GET_LEAD_STATUSES: "/clubs/:id/leadStatuses",
  GET_EMAIL_TEMPLATES: "/clubs/:id/emailTemplates",
  Add_ACTIVITY: "/prospects/:id/activity",
  GET_STAFF_DEPARTMENTS: "/settings/:id/staffDepartments",

  MEMBERSHIP_STATUS: "settings/:id/membershipStatuses",
  MEMBERSHIP_TYPE_STATUS: "settings/:id/membershipCategories",

  STAFF_MEMBER_DETAILS: "/staffs/:id",

  MEMBERS_LIST: "/members",
  MEMBER_DETAILS: "/members/:id",

  SEND_EMAIL: "/email",
  VERIFY_EMAIL: "/clubs/validation/email",
  PROSPECT_EMAIL_RECIPIENTS: "/prospects/recipients",
  MEMBER_EMAIL_RECIPIENTS: "/members/recipients",
  // TODO: Check with BE and avoid redundancy in api endpoint
  LEAD_SOURCES_SETTINGS_LIST: "settings/:id/leadSources",
  LEAD_STATUS_SETTINGS_LIST: "settings/:id/leadStatuses",
  LEAD_SOURCES_SETTINGS: "settings/:clubId/leadSource",
  LEAD_STATUS_SETTINGS: "settings/:clubId/leadStatus",
  UPDATE_LEAD_SOURCES_SETTINGS: "settings/:clubId/leadSource/:id",
  UPDATE_LEAD_STATUS_SETTINGS: "/settings/:clubId/leadStatus/:id",

  MEMBERSHIP_STATUS_SETTINGS: "settings/:clubId/membershipStatus",
  MEMBERSHIP_TYPE_STATUS_SETTINGS: "settings/:clubId/membershipCategory",
  UPDATE_MEMBERSHIP_STATUS_SETTINGS: "/settings/:clubId/membershipStatus/:id",
  UPDATE_MEMBERSHIP_MEMBERSHIP_TYPE_SETTINGS:
    "/settings/:clubId/membershipCategory/:id",

  STAFF_MEMBERS_SETTINGS_LISTING: "/settings/:clubId/staffDepartments",
  STAFF_MEMBERS_SETTINGS: "/settings/:clubId/staffDepartment",
  UPDATE_STAFF_MEMBERS_SETTINGS: "settings/:clubId/staffDepartment/:id",

  EMAIL_TEMPLATES_SETTINGS_LIST: "/settings/:id/emailTemplates",
  EMAIL_TEMPLATE_DETAIL: "/settings/:id/emailTemplate/:emailTemplateId",
  EMAIL_TEMPLATES_SETTINGS: "/settings/:clubId/emailTemplate",
  UPDATE_EMAIL_TEMPLATE_SETTINGS: "/settings/:clubId/emailTemplate/:id",

  STAFF_MEMBERS: "/staffs",

  GET_CLUBS: "/clubs",
  GET_CLUB_PROFILE: "/clubs/:id",
  GET_CLUB_MINIMAL_DATA: "/clubs/:id/minimal",
  UPDATE_CLUB_PROFILE: "/clubs/:id/update",
  UNLOCK_CLUB: "/clubs/:id/unlock",
  UPDATE_CLUB_GENERAL_SETTINGS: "/clubs/:id/settings",

  UPLOAD_CHATBOT_KNOWLEDGE_BASE: "/clubs/:id/upload",

  // Calender
  CALENDER_EVENTS_AND_SLOTS: "/calendar",
  CANCEL_MEETING: "calendar/:slotId",
  MEMBERS_META_LIST: "/members/minimal",
  PROSPECTS_META_LIST: "/prospects/minimal",

  BULK_IMPORT: "/:entity/import",
  DOWNLOAD_TEMPLATE: "/clubs/:id/downloadTemplate",
  CHECK_BULK_IMPORT_STATUS_PROSPECTS: "/prospects/import/status",
  CHECK_BULK_IMPORT_STATUS_MEMBERS: "/members/import/status",

  CHAT_BOT_SLOTS: "calendar/chatbotSlots",

  // Lead Form
  LEAD_FORM: "/clubs/:id/leadforms",
  GET_TRANSCRIPTS: "/clubs/:clubId/users/:id/transcripts",
  MEETING: "/calendar/meetings",
  RESCHEDULE_MEETING: "/calendar/:id/reschedule",

  // Dashboard
  GET_DASHBOARD_CHARTS: "/dashboard/clubs/:clubId/charts",
  GET_CHART_DETAIL: "/dashboard/clubs/:clubId/charts/:chartId",
  ADMIN_DASHBOARD_CHART: "dashboard/:type",
  GET_DASHBOARD_STATS: "/dashboard/stats",
  CAN_CREATE_CUSTOM_CHART: "/dashboard/clubs/:id/charts/available",
  UPDATE_CHART_ORDER: "/dashboard/clubs/:clubId/charts",
  GET_CHART_VALUES: "/dashboard/clubs/:clubId/values",

  ADMIN_PROFILE_UPDATE: "admin/:id/profile",
};
