import { ProspectData } from "src/shared/types/sharedComponents.type";
import { LeadStatusOption } from "./constants";

export const getAllProspectIds = (prospects: ProspectData[]): string[] =>
  prospects?.map((p) => p.id);

export const toggleAllSelections = (
  checked: boolean,
  prospects: ProspectData[],
): string[] => (checked ? getAllProspectIds(prospects) : []);

export const toggleSingleSelection = (
  prospectId: string,
  checked: boolean,
  currentSelections: string[],
): string[] => {
  if (checked) return [...currentSelections, prospectId];
  return currentSelections?.filter((id) => id !== prospectId);
};

export const updateProspectStatus = (
  prospects: ProspectData[],
  prospectId: string,
  newStatusValue: string,
  statusOptions: LeadStatusOption[],
): ProspectData[] => {
  return prospects?.map((prospect) => {
    if (prospect.id === prospectId) {
      const statusOption = statusOptions.find(
        (opt) => opt.value === newStatusValue,
      );
      return {
        ...prospect,
        leadStatus: {
          label: statusOption?.label || "",
          color: statusOption?.color || "default",
        },
      };
    }
    return prospect;
  });
};

export const getStatusValue = (
  statusLabel: string,
  statusOptions: LeadStatusOption[],
): string | undefined =>
  statusOptions?.find((opt) => opt.label === statusLabel)?.value;

export const areAllProspectsSelected = (
  prospects: ProspectData[],
  selectedIds: string[],
): boolean => prospects.length > 0 && selectedIds.length === prospects.length;

export const areSomeProspectsSelected = (
  prospects: ProspectData[],
  selectedIds: string[],
): boolean =>
  selectedIds.length > 0 && !areAllProspectsSelected(prospects, selectedIds);
