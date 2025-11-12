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

export const deleteProspectDescription = (prospectName: string) =>
  `Are you sure you want to permanently delete ${prospectName} to a member? This action is not reversible.`;

export const deleteProspectTitle = "Delete Prospect?";

export enum PageListingDirections {
  PREV = "prev",
  NEXT = "next",
}

export const bulkImportProspects = "Bulk Import Prospects";
