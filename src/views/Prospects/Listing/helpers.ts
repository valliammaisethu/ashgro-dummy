import { LeadStatusOption } from "./constants";
import {
  ProspectsList,
  ProspectsListingParams,
} from "src/models/prospects.model";

export type SelectedProspect = {
  id: string;
  email: string;
  name: string;
};

export const getAllProspects = (
  prospects: ProspectsList[] = [],
): SelectedProspect[] =>
  prospects.map((p) => ({ id: p.id!, email: p.email!, name: p.firstName! }));

export const toggleAllSelections = (
  checked: boolean,
  prospects: ProspectsList[] = [],
): SelectedProspect[] => (checked ? getAllProspects(prospects) : []);

export const toggleSingleSelection = (
  prospectId: string,
  email: string,
  name: string,
  checked: boolean,
  currentSelections: SelectedProspect[],
): SelectedProspect[] => {
  if (checked) {
    if (!currentSelections.some((p) => p.id === prospectId)) {
      return [...currentSelections, { id: prospectId, email, name }];
    }
    return currentSelections;
  }
  return currentSelections.filter((p) => p.id !== prospectId);
};

export const getStatusValue = (
  statusLabel: string,
  statusOptions: LeadStatusOption[],
): string | undefined =>
  statusOptions?.find((opt) => opt.label === statusLabel)?.value;

export const areAllProspectsSelected = (
  prospects: ProspectsList[] = [],
  selectedProspects: SelectedProspect[],
): boolean =>
  prospects.length > 0 && selectedProspects.length === prospects.length;

export const areSomeProspectsSelected = (
  prospects: ProspectsList[] = [],
  selectedProspects: SelectedProspect[],
): boolean =>
  selectedProspects.length > 0 &&
  !areAllProspectsSelected(prospects, selectedProspects);

export const areFiltersActive = (
  queryParams: ProspectsListingParams,
): boolean => {
  if (!queryParams) return false;

  const hasDateRange =
    !!queryParams.followUpStartDate || !!queryParams.followUpEndDate;

  const hasLeadStatus =
    Array.isArray(queryParams.leadStatusIds) &&
    queryParams.leadStatusIds.length > 0;

  const hasLeadSource =
    Array.isArray(queryParams.leadSourcesIds) &&
    queryParams.leadSourcesIds.length > 0;

  return hasDateRange || hasLeadStatus || hasLeadSource;
};
