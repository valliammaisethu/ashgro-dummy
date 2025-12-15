import {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { CustomChart } from "src/models/chart.model";
import { ChartItem, ChartLabel } from "src/models/dashboard.model";
import { XAxisTypes } from "src/enums/charts.enum";

export type DateRange = [string, string];

export interface DashboardHeaderProps {
  onAddChart: () => void;
  loading: boolean;
}

export interface CustomChartProps {
  open: boolean;
  onClose: () => void;
  formValues?: CustomChart;
}

export interface ChartState {
  chartFormOpen: boolean;
}

export interface ChartFilterProps {
  open: boolean;
  onClose: () => void;
  title: string;
  selectedType: XAxisTypes;
  chartId?: string;
}

export interface ChartCanvasProps {
  title: string;
  labels: ChartLabel[];
  height?: number;
}

export interface ChartOrderUpdate {
  id: string;
  order: number;
}

export interface ReorderChartsPayload {
  charts: ChartOrderUpdate[];
}

export interface DragChartProps {
  isDragging?: boolean;
  isOver?: boolean;
  dragHandleProps?: DraggableAttributes & DraggableSyntheticListeners;
}
export interface BarChartCardProps {
  chart?: ChartItem;
  dragChartProps?: DragChartProps;
  onEdit?: (chartData?: CustomChart) => void;
}

export interface ChartFilterData {
  dateRange?: [string, string];
  selectedValues?: string[];
}

export interface DraggableChartCardProps {
  chart: ChartItem;
  onEdit?: (chartData?: CustomChart) => void;
}

export interface ChartConfig {
  chartId: string;
  type: XAxisTypes;
  chartName: string;
}

export interface DashboardFiltersContextType {
  chartFilters: Record<string, ChartFilterData>;

  setChartDateRange: (
    chartId: string,
    dateRange: [string, string] | null,
  ) => void;
  getChartDateRange: (chartId: string) => DateRange | undefined;

  setChartFilter: (chartId: string, values: string[]) => void;
  getChartFilter: (chartId?: string) => string[];

  clearChartFilters: (chartId: string) => void;
  clearAllFilters: () => void;

  hasActiveFilters: (chartId: string) => boolean;

  activeFilterChart: {
    chartId: string;
    type: XAxisTypes;
    chartName: string;
  } | null;
  openFilterDrawer: (chartConfig: ChartConfig) => void;
  closeFilterDrawer: () => void;
  getChartParams: (chartId: string) => Record<string, any>;
}

export interface ChartFilters {
  selectedValues?: string[];
  dateRange?: DateRange;
}

export interface ChartParams {
  values?: string[];
  fromDate?: string;
  toDate?: string;
}
