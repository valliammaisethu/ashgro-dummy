import { ViewProspect } from "src/models/viewProspect.model";

export interface ProspectHeaderProps {
  onEdit: () => void;
}

export interface AddProspectProps {
  visible: boolean;
  onClose: () => void;
  isEdit?: boolean;
  prospectData?: ViewProspect;
}
