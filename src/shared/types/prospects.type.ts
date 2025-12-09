import { FieldValues } from "react-hook-form";

export interface ProspectHeaderProps {
  onEdit: () => void;
}

export interface ProspectListingHeaderProps {
  onAddProspect: () => void;
  onSearch: (searchTerm: string) => void;
  onFilter: () => void;
  onClear: () => void;
  onBulkMail: () => void;
  onBulkImport: () => void;
  selectedEmails: number;
  filtersActive: boolean;
  isCheckingImportStatus?: boolean;
}

export interface ProspectFormProps {
  visible: boolean;
  onClose: () => void;
  isEdit?: boolean;
  prospectId?: string;
}

export interface IndividualProspectHeaderProps {
  onConvert: () => void;
  onEmail: () => void;
  onBookMeeting: () => void;
  isFetchingProfile: boolean;
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
