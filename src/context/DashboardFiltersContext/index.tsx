import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useCallback,
} from "react";

import { getCurrentUserId } from "src/shared/utils/helpers";
import {
  saveFilters,
  clearFilters,
  initialFilters,
} from "src/utils/dashboardFilters";
import {
  ChartConfig,
  ChartFilterData,
  DashboardFiltersContextType,
  DateRange,
} from "src/shared/types/dashboard.type";

const DashboardFiltersContext = createContext<
  DashboardFiltersContextType | undefined
>(undefined);

export const DashboardFiltersProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const userId = getCurrentUserId();

  const [chartFilters, setChartFilters] = useState<
    Record<string, ChartFilterData>
  >(initialFilters(userId));
  const [activeFilterChart, setActiveFilterChart] =
    useState<ChartConfig | null>(null);

  const setChartDateRange = useCallback(
    (chartId: string, dateRange: DateRange | null) => {
      if (!chartId) return;

      const [start, end] = dateRange ?? [];
      if (start && end && new Date(start) > new Date(end)) return;

      setChartFilters((prev) => ({
        ...prev,
        [chartId]: {
          ...prev[chartId],
          dateRange: dateRange ?? undefined,
        },
      }));
    },
    [],
  );

  const getChartDateRange = (chartId?: string) => {
    if (!chartId) return undefined;
    return chartFilters[chartId]?.dateRange;
  };

  const setChartFilter = (chartId: string, values: string[]) => {
    if (!chartId) return;

    if (!Array.isArray(values)) return;

    setChartFilters((prev) => ({
      ...prev,
      [chartId]: {
        ...prev[chartId],
        selectedValues: values,
      },
    }));
  };

  const getChartFilter = (chartId?: string) => {
    if (!chartId) return [];
    return chartFilters[chartId]?.selectedValues || [];
  };

  const clearChartFilters = (chartId: string) => {
    if (!chartId) return;

    setChartFilters((prev) => {
      const { [chartId]: _, ...rest } = prev;
      return rest;
    });
  };

  const clearAllFilters = () => {
    setChartFilters({});
    clearFilters(userId);
  };

  const hasActiveFilters = (chartId: string): boolean => {
    if (!chartId) return false;

    const filters = chartFilters[chartId];
    if (!filters) return false;

    const hasDate = filters?.dateRange?.[0] && filters?.dateRange?.[1];
    const hasValues = filters?.selectedValues?.length;

    return !!(hasDate || hasValues);
  };

  const openFilterDrawer = ({
    chartId,
    type,
    chartName,
    chartValues,
  }: ChartConfig) =>
    setActiveFilterChart({ chartId, type, chartName, chartValues });

  const closeFilterDrawer = () => setActiveFilterChart(null);

  const getChartParams = useCallback(
    (chartId: string) => {
      const { selectedValues = [], dateRange } = chartFilters[chartId] ?? {};
      const [fromDate, toDate] = dateRange ?? [];

      return {
        ...(selectedValues.length && { values: selectedValues }),
        ...(fromDate && toDate && { fromDate, toDate }),
      };
    },
    [chartFilters],
  );

  const getFilterDetails = (chartId?: string) => {
    const filters = chartId ? chartFilters[chartId] : undefined;

    return {
      hasDate: !!(filters?.dateRange?.[0] && filters?.dateRange?.[1]),
      hasValues: !!filters?.selectedValues?.length,
      dateRange: filters?.dateRange,
      selectedValues: filters?.selectedValues,
    };
  };

  const contextValue = useMemo(
    () => ({
      chartFilters,
      setChartDateRange,
      getChartDateRange,
      setChartFilter,
      getChartFilter,
      clearChartFilters,
      clearAllFilters,
      hasActiveFilters,
      activeFilterChart,
      openFilterDrawer,
      closeFilterDrawer,
      getChartParams,
      getFilterDetails,
    }),
    [
      chartFilters,
      activeFilterChart,
      setChartDateRange,
      setChartFilter,
      clearChartFilters,
      clearAllFilters,
      hasActiveFilters,
      openFilterDrawer,
      closeFilterDrawer,
      getChartParams,
      getFilterDetails,
    ],
  );

  useEffect(() => {
    if (userId) saveFilters(userId, chartFilters);
  }, [chartFilters, userId]);

  return (
    <DashboardFiltersContext.Provider value={contextValue}>
      {children}
    </DashboardFiltersContext.Provider>
  );
};

export const useDashboardFilters = () => {
  const context = useContext(DashboardFiltersContext);

  if (!context) {
    throw new Error(
      "useDashboardFilters must be used within DashboardFiltersProvider",
    );
  }

  return context;
};
