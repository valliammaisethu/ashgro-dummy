import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";

export interface OperationParams {
  type: payloadType;
  name?: string;
  id?: string;
  data?: {
    title?: string;
    subject?: string;
    body?: string;
    attachments?: string[];
  };
}

export type payloadType =
  | "source"
  | "status"
  | "memberShipType"
  | "memberShipStatus"
  | "staffDepartment"
  | "emailTemplate";

const {
  LEAD_SOURCES_SETTINGS,
  LEAD_STATUS_SETTINGS,
  UPDATE_LEAD_SOURCES_SETTINGS,
  UPDATE_LEAD_STATUS_SETTINGS,
  UPDATE_MEMBERSHIP_STATUS_SETTINGS,
  UPDATE_MEMBERSHIP_MEMBERSHIP_TYPE_SETTINGS,
  MEMBERSHIP_STATUS_SETTINGS,
  MEMBERSHIP_TYPE_STATUS_SETTINGS,
  STAFF_MEMBERS_SETTINGS,
  UPDATE_STAFF_MEMBERS_SETTINGS,
  EMAIL_TEMPLATES_SETTINGS,
  UPDATE_EMAIL_TEMPLATE_SETTINGS,
} = ApiRoutes;

export const LeadEndpoints = {
  source: LEAD_SOURCES_SETTINGS,
  status: LEAD_STATUS_SETTINGS,
};

export const LeadUpdateEndpoints = {
  source: UPDATE_LEAD_SOURCES_SETTINGS,
  status: UPDATE_LEAD_STATUS_SETTINGS,
};

export const getLeadPayload = (type: payloadType, name: string = "") => {
  const payloads = {
    source: { sourceName: name },
    status: { statusName: name },
    memberShipType: { categoryName: name },
    memberShipStatus: { statusName: name },
    staffDepartment: { name },
    emailTemplate: { name },
  };

  return payloads[type];
};

export const getEmailTemplatePayload = (
  type: payloadType,
  data?: {
    title?: string;
    subject?: string;
    body?: string;
    attachments?: string[];
  },
) => {
  if (type === "emailTemplate" && data) {
    return {
      title: data.title,
      subject: data.subject,
      body: data.body,
      attachments: data.attachments,
    };
  }
  return {};
};

export const Endpoints = {
  source: LEAD_SOURCES_SETTINGS,
  status: LEAD_STATUS_SETTINGS,
  memberShipType: MEMBERSHIP_TYPE_STATUS_SETTINGS,
  memberShipStatus: MEMBERSHIP_STATUS_SETTINGS,
  staffDepartment: STAFF_MEMBERS_SETTINGS,
  emailTemplate: EMAIL_TEMPLATES_SETTINGS,
};

export const UpdateEndpoints = {
  source: UPDATE_LEAD_SOURCES_SETTINGS,
  status: UPDATE_LEAD_STATUS_SETTINGS,
  memberShipType: UPDATE_MEMBERSHIP_MEMBERSHIP_TYPE_SETTINGS,
  memberShipStatus: UPDATE_MEMBERSHIP_STATUS_SETTINGS,
  staffDepartment: UPDATE_STAFF_MEMBERS_SETTINGS,
  emailTemplate: UPDATE_EMAIL_TEMPLATE_SETTINGS,
};

export const getRequestConfig = (
  type: payloadType,
  hasId: boolean,
): { endpoint: string; method: "post" | "put" } => {
  const endpoint = hasId ? UpdateEndpoints[type] : Endpoints[type];
  const method = hasId ? "put" : "post";

  return { endpoint, method };
};
