import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";

export interface ChartFilterData {
  dateRange?: [string, string];
  selectedValues?: string[];
}

export const getStorageKey = (clubId: string) =>
  `${LocalStorageKeys.DASHBOARD_FILTERS}_${clubId}`;

const isValidFilterData = (data: ChartFilterData) =>
  !!data && typeof data === "object" && !Array.isArray(data);

export const getFilters = (clubId: string): Record<string, ChartFilterData> => {
  if (!clubId) return {};
  // TODO : To fix the issue in localstoragehelper and use here
  try {
    const stored = localStorage.getItem(getStorageKey(clubId));
    if (!stored) return {};

    const parsed = JSON.parse(stored);
    return isValidFilterData(parsed) ? parsed : {};
  } catch {
    return {};
  }
};

export const saveFilters = (
  clubId: string,
  filters: Record<string, ChartFilterData>,
): boolean => {
  if (!clubId) return false;

  const filtered = Object.fromEntries(
    Object.entries(filters).filter(([, { dateRange, selectedValues }]) => {
      const hasDate = dateRange?.[0] && dateRange?.[1];
      const hasValues = selectedValues?.length;
      return hasDate || hasValues;
    }),
  );
  // TODO : To fix the issue in localstoragehelper and use here
  try {
    localStorage.setItem(getStorageKey(clubId), JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
};

export const clearFilters = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER);
  if (!clubId) return false;
  // TODO : To fix the issue in localstoragehelper and use here
  try {
    localStorage.removeItem(getStorageKey(clubId));
    return true;
  } catch {
    return false;
  }
};

export const initialFilters = (clubId: string) =>
  clubId ? getFilters(clubId) : {};
