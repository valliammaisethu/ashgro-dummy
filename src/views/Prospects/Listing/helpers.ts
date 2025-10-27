import { LeadStatusOption } from "./constants";
import { ProspectsList } from "src/models/prospects.model";

export const getAllProspectIds = (prospects: ProspectsList[]): string[] =>
  prospects?.map((p) => p.id!);

export const toggleAllSelections = (
  checked: boolean,
  prospects: ProspectsList[] = [],
): string[] => (checked ? getAllProspectIds(prospects) : []);

export const toggleSingleSelection = (
  prospectId: string,
  checked: boolean,
  currentSelections: string[],
): string[] => {
  if (checked) return [...currentSelections, prospectId];
  return currentSelections?.filter((id) => id !== prospectId);
};

export const getStatusValue = (
  statusLabel: string,
  statusOptions: LeadStatusOption[],
): string | undefined =>
  statusOptions?.find((opt) => opt.label === statusLabel)?.value;

export const areAllProspectsSelected = (
  prospects: ProspectsList[] = [],
  selectedIds: string[],
): boolean => prospects.length > 0 && selectedIds.length === prospects.length;

export const areSomeProspectsSelected = (
  prospects: ProspectsList[] = [],
  selectedIds: string[],
): boolean =>
  selectedIds.length > 0 && !areAllProspectsSelected(prospects, selectedIds);
