import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";

export interface ChartFilterData {
  dateRange?: [string, string];
  selectedValues?: string[];
}

export const getStorageKey = (userId: string) =>
  `${LocalStorageKeys.DASHBOARD_FILTERS}_${userId}`;

const isValidFilterData = (data: ChartFilterData) =>
  !!data && typeof data === "object" && !Array.isArray(data);

export const getFilters = (userId: string): Record<string, ChartFilterData> => {
  if (!userId) return {};
  // TODO : To fix the issue in localstoragehelper and use here
  try {
    const stored = localStorage.getItem(getStorageKey(userId));
    if (!stored) return {};

    const parsed = JSON.parse(stored);
    return isValidFilterData(parsed) ? parsed : {};
  } catch {
    return {};
  }
};

export const saveFilters = (
  userId: string,
  filters: Record<string, ChartFilterData>,
): boolean => {
  if (!userId) return false;

  const filtered = Object.fromEntries(
    Object.entries(filters).filter(([, { dateRange, selectedValues }]) => {
      const hasDate = dateRange?.[0] && dateRange?.[1];
      const hasValues = selectedValues?.length;
      return hasDate || hasValues;
    }),
  );
  // TODO : To fix the issue in localstoragehelper and use here
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
};

export const clearFilters = (userId: string) => {
  if (!userId) return false;
  // TODO : To fix the issue in localstoragehelper and use here
  try {
    localStorage.removeItem(getStorageKey(userId));
    return true;
  } catch {
    return false;
  }
};

export const initialFilters = (clubId: string) =>
  clubId ? getFilters(clubId) : {};
