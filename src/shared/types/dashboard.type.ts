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
}
