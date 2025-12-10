import { XAxisTypes } from "src/enums/charts.enum";
import { CustomChart } from "src/models/chart.model";

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
  chartDeleteOpen: boolean;
  chartFiltersOpen: boolean;
  activeFilter: string;
}

export interface ChartFilterProps {
  open: boolean;
  onClose: () => void;
  title: string;
  selectedType: XAxisTypes;
}
