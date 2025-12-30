import React from "react";
import Lead from "./Lead";
import MembersShip from "./Membership";
import StaffDepartment from "./StaffDepartment";
import EmailTemplates from "./EmailTemplates";

export type MembershipSection = "memberShipType" | "memberShipStatus";
export type LeadSection = "source" | "status";
export type SettingFormModalModel = "add" | "edit" | null;

export interface SettingItem {
  id?: string;
  label?: string;
  value?: string;
  name?: string;
  color?: string;
}

export interface ModalState {
  open: boolean;
  mode: SettingFormModalModel;
  item?: SettingItem;
}

export const settingsTabs = [
  {
    key: "lead",
    label: "Lead",
    children: <Lead />,
  },
  {
    key: "membership",
    label: "Membership",
    children: <MembersShip />,
  },
  {
    key: "emailTemplates",
    label: "Email Templates",
    children: <EmailTemplates />,
  },
  {
    key: "staffDepartment",
    label: "Staff Department",
    children: <StaffDepartment />,
  },
];

export const leadTabs = [
  { key: "source", label: "Lead Source" },
  { key: "status", label: "Lead Status" },
];

export const memberShipTabs = [
  { key: "memberShipType", label: "Membership Type" },
  { key: "memberShipStatus", label: "Membership Status" },
];

export const LEAD_CONSTANTS = {
  SOURCE: "Lead Source",
  STATUS: "Lead Status",
  LEAD_TYPE: "source",
  FIELD_LABELS: {
    source: "Name",
    status: "Status",
  },

  PLACEHOLDER: {
    source: "Enter Lead Name",
    status: "Enter Lead Status",
  },

  MODAL_TITLE: {
    add: {
      source: "New Lead Source",
      status: "New Lead Status",
    },
    edit: {
      source: "Edit Lead Source",
      status: "Edit Lead Status",
    },
  },

  BUTTON_TEXT: {
    add: "Add",
    edit: "Update",
  },
  FIEL_NAME: "name",
};

export const MEMBERSHIP_CONSTANTS = {
  TYPE: "Membership Type",
  STATUS: "Membership Status",
  MEMBERSHIP_TYPE: "memberShipStatus",
  FIELD_LABELS: {
    memberShipType: "Type",
    memberShipStatus: "Status",
  },

  PLACEHOLDER: {
    memberShipType: "Enter Membership Type",
    memberShipStatus: "Enter Membership Status",
  },

  MODAL_TITLE: {
    add: {
      memberShipType: "New Lead Source",
      memberShipStatus: "New Lead Status",
    },
    edit: {
      memberShipType: "Edit Lead Source",
      memberShipStatus: "Edit Lead Status",
    },
  },

  BUTTON_TEXT: {
    add: "Add",
    edit: "Update",
  },
  FIEL_NAME: "name",
};

export const STAFF_MEMBERS_CONSTANTS = {
  TITLE: "Staff Department",
  TYPE: "staffDepartment",
  PLACE_HOLDER: "Enter Staff Department",
  EDIT_TITLE: "Edit Staff Department",
  ADD_TITLE: "Add Staff Department",
  BUTTON_TEXT: {
    add: "Add",
    edit: "Update",
  },
  FIEL_NAME: "name",
};

export const EMAIL_TEMPLATE_CONSTANTS = {
  TITLE: "New Email Template",
  TYPE: "emailTemplate",
  PLACE_HOLDER: "Select a template",
  EDIT_TITLE: "Edit Email Template",
  ADD_TITLE: "Add Email Template",
  LABELS: {
    TITLE: "Title",
    SUBJECT: "Subject",
    EMAIL_BODY: "Email Body",
  },
  PLACEHOLDERS: {
    TITLE: "Enter Title",
    SUBJECT: "Enter Subject",
    EMAIL_BODY: "Enter Email Body",
  },
  FIELDS: {
    TITLE: "title",
    SUBJECT: "subject",
    EMAIL_BODY: "body",
    ATTACHMENTS: "attachments",
    ATTACHMENT_IDS: "attachmentIds",
  },
  BUTTON_TEXT: {
    ADD: "Add Template",
    EDIT: "Update",
  },
  FIELD_NAME: "name",
};

export const CHATBOT_CONSTANTS = {
  SCRIPT_URL: import.meta.env.VITE_CHATBOT_SCRIPT_URL,
  LABEL: "Chatbot Link",
  MESSAGES: {
    SUCCESS: "Chatbot link copied to clipboard!",
    ERROR: "Failed to copy link",
    WARNING: "Club ID not found",
    LEAD_FORM_COPY: "Lead Form Link copied to clipboard!",
  },
  APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL,
};
