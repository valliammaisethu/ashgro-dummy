import { FieldValues } from "react-hook-form";
import { ViewProspect } from "src/models/viewProspect.model";

export interface ProspectHeaderProps {
  onEdit: () => void;
}

export interface ProspectListingHeaderProps {
  onAddProspect: () => void;
  onSearch: (searchTerm: string) => void;
  onFilter: () => void;
  filtersActive: boolean;
  onBulkMail: () => void;
  selectedEmails: number;
}

export interface AddProspectProps {
  visible: boolean;
  onClose: () => void;
  isEdit?: boolean;
  prospectData?: ViewProspect;
}

export interface IndividualProspectHeaderProps {
  onConvert: () => void;
  onEmail: () => void;
}

export interface MemberConversionModalProps {
  visible: boolean;
  onClose: () => void;
  memberName: string;
}
export interface ProspectFilterProps {
  visible: boolean;
  toggleVisibility: () => void;
  onSubmit: (values: FieldValues) => void;
  defaultValues: FieldValues;
}

export interface SelectedProspect {
  id: string;
  email: string;
  name: string;
}
