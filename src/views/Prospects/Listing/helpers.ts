import { LeadStatusOption } from "./constants";
import {
  ProspectsList,
  ProspectsListingParams,
} from "src/models/prospects.model";
import {
  toggleAllSelections as toggleAll,
  toggleSingleSelection as toggleSingle,
  areAllItemsSelected,
  areSomeItemsSelected,
  getAllItems,
  SelectedItem,
} from "src/shared/utils/selectionHelpers";

export type SelectedProspect = SelectedItem;

export const getAllProspects = getAllItems<ProspectsList>;

export const toggleAllSelections = (
  checked: boolean,
  prospects: ProspectsList[] = [],
  currentSelections: SelectedProspect[] = [],
): SelectedProspect[] => toggleAll(checked, prospects, currentSelections);

export const toggleSingleSelection = toggleSingle;

export const getStatusValue = (
  statusLabel: string,
  statusOptions: LeadStatusOption[],
): string | undefined =>
  statusOptions?.find((opt) => opt.label === statusLabel)?.value;

export const areAllProspectsSelected = areAllItemsSelected<ProspectsList>;
export const areSomeProspectsSelected = areSomeItemsSelected<ProspectsList>;

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
    Array.isArray(queryParams.leadSourceIds) &&
    queryParams.leadSourceIds.length > 0;

  return hasDateRange || hasLeadStatus || hasLeadSource;
};
