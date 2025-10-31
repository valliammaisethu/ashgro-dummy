import { FieldValues } from "react-hook-form";
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

export interface IndividualProspectHeaderProps {
  onConvert: () => void;
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
