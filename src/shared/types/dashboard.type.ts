import { XAxisTypes } from "src/enums/charts.enum";

export interface DashboardHeaderProps {
  onAddChart: () => void;
}

export interface ChartFormProps {
  open: boolean;
  onClose: () => void;
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
