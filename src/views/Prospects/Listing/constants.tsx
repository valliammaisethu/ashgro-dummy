export interface LeadStatusOption {
  label: string;
  value: string;
}

export const TABLE_HEADERS = {
  PROSPECTS: "Prospects",
  FOLLOW_UP_DATE: "Follow-up Date",
  LEAD_SOURCE: "Lead Source",
  LEAD_STATUS: "Lead Status",
} as const;

export const deleteProspectDescription =
  "Are you sure you want to delete this Prospect?";

export const deleteProspectTitle = "Delete Prospect?";

export enum PageListingDirections {
  PREV = "prev",
  NEXT = "next",
}
